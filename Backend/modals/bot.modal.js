const { connectDb } = require('../configs/db.config');
const { Schema, model, models } = require('mongoose');


const agentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    greeting:String,
    visibility:{
        type:String,
        enum:["Public", "Private"],
        default:"Public"
    },
    onlyCriticalKnowledge:Boolean,
    prompt:String,
    feededData: String,
    feededFiles: [{
        name: String,
        path: String
    }],
    agentId: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

const Agent = models.Agent || model("Agent", agentSchema);

module.exports = Agent;
