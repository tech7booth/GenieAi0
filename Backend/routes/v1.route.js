const { Router } = require("express");
const { login, signup } = require("../controllers/user.controller");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/', (req, res)=>{res.send('Hello World')})


module.exports = router;

