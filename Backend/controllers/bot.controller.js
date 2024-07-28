const asyncHandler = require('express-async-handler');
const {
    playAiApiHeader
} = require('../configs/play.ai.config');
const {
    ApiError,
    ApiResponse
} = require('../utils/api.utils');
const Agent = require('../utils/models/bot.model');
const User = require('../utils/models/user.model');
const axios = require('axios');

// Get agents of user(user's agent) and admin(all agents)
const getAgents = asyncHandler(async (req, res) => {
    const {
        userId,
        role
    } = req.data;
    const {
        page,
        size,
        all
    } = req.query;

    if (!userId) {
        return res.status(404).json(new ApiResponse(404, "Error! Invalid token or userId missing"));
    }

    let agents;
    if (role === "Admin" && all) {
        agents = await Agent.find({}).skip((size || 20) * (page || 0)).limit(size || 20);
    } else {
        agents = await Agent.find({
            user: userId
        });
    }

    res.status(200).json(new ApiResponse(200, "Successfully fetched agents!", agents));
});

// detail of specific agent by id
const getAgentInfo = asyncHandler(async (req, res) => {
    const agentId = params?.id;
    const {
        data
    } = await axios.get(`https://api.play.ai/api/v1/agents/${agentId}`, {
        headers: playAiApiHeader
    });

    return res.json(new ApiResponse(200, "Agent fetched.", data))
})

// Create agent
const createAgent = asyncHandler(async (req, res) => {
    const {
        userId
    } = req.data;
    const {
        voice,
        name,
        greeting,
        description,
        feededData,
        visibility,
        onlyCriticalKnowledge,
        feededFiles,
        prompt
    } = req.body;

    const playBody = {
        voice: voice || "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
        displayName: name,
        description: description,
        greeting: greeting,
        prompt: prompt,
        criticalKnowledge: feededData,
        visibility: visibility,
        answerOnlyFromCriticalKnowledge: onlyCriticalKnowledge
    };

    const {
        data
    } = await axios.post('https://api.play.ai/api/v1/agents', playBody, {
        headers: playAiApiHeader
    });

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(new ApiResponse(404, "Invalid attempt! You are not authorized"));
    }

    const agent = await Agent.create({
        name,
        voice,
        greeting,
        prompt,
        visibility,
        onlyCriticalKnowledge,
        description,
        feededData,
        feededFiles,
        user: userId
    });

    res.status(200).json(new ApiResponse(200, "Agent created successfully!", agent));
});

// Update agent
const updateAgent = asyncHandler(async (req, res) => {
    const {
        userId
    } = req.data;

    const {
        agentId,
        modifiedData
    } = req.body;

    if (!agentId || modifiedData) {
        return res.status(400).json(new ApiError(400, "Missing agendId or modified data"));
    }

    const agent = await Agent.findOneAndUpdate({
            _id: agentId,
            user: userId
        },
        modifiedData, {
            new: true
        }
    );

    if (!agent) {
        return res.status(404).json(new ApiError(404, "It seems, this agent doesn't belong to you"));
    }

    res.status(200).json(new ApiResponse(200, "Agent updated successfully!", agent));
});

// Delete agent user(only theirs) and admin(any bot)
const deleteAgent = asyncHandler(async (req, res) => {
    const {
        userId,
        role
    } = req.data;
    const {
        agentId
    } = req.body;

    if (!userId || !agentId) {
        return res.status(401).json(new ApiError(401, "Invalid token or missing agentId"));
    }

    const agent = await Agent.findById(agentId);
    if (role == "Admin" || (agent && agent.user.equals(userId))) {
        await agent.deleteOne();
        res.status(200).json(new ApiResponse(200, "Agent deleted successfully!"));
    } else {
        res.status(400).json(new ApiResponse(400, "Invalid attempt! This is not your agent."));
    }
});

const botController = {
    createAgent,
    getAgents,
    updateAgent,
    deleteAgent,
    getAgentInfo
}

module.exports = botController