const { Router } = require("express");
const { saveTask, getTask, loginTask } = require("../Controllers/taskController");
const router = Router();

router.get("/users", getTask);
router.post("/sign", saveTask);
router.post("/login", loginTask);

module.exports = router;

