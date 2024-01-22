const TaskModel = require("../Models/taskModel")
const { hash: stringToHash, compare: verifyHash } = require("bcrypt");





module.exports.saveTask = async (req, res) => {
    let body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        res.status(400).send(
            `required fields missing, request example: 
            {
                "firstName": "John",
                "lastName": "Doe",
                "email": "abc@abc.com",
                "password": "12345"
            }`
        );
        return;
    }

    TaskModel.findOne({ email: body.email }, (err, data) => {
        if (!err) {
            console.log("data: ", data);

            if (data) { 
                console.log("user already exists: ", data);
                res.status(400).send({ message: "user already exists, please try a different email" });
                return;
            } else { 

                stringToHash(body.password, 10).then(hashString => {

                    TaskModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email.toLowerCase(),
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
};


module.exports.getTask =  async (req, res) => {

    try {
        let allUser = await TaskModel.find({}).exec();
        res.send(allUser);

    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
}







module.exports.loginTask = async (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    let isFound = false; // https://stackoverflow.com/a/17402180/4378475

    for (let i = 0; i < userBase.length; i++) {
        if (userBase[i].email === body.email) {

            isFound = true;
            if (userBase[i].password === body.password) { // correct password

                res.status(200).send({
                    firstName: userBase[i].firstName,
                    lastName: userBase[i].lastName,
                    email: userBase[i].email,
                    message: "login successful",
                    token: "some unique token"
                })
                return;

            } else { // password incorrect

                res.status(401).send({
                    message: "incorrect password"
                })
                return;
            }
        }
    }

    if (!isFound) {
        res.status(404).send({
            message: "user not found"
        })
        return;
    }
}