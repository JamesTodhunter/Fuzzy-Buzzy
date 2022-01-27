const router = require("express").Router();
const { models } = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post("/register", async (req, res) => {

    let { email, password } = req.body.user;
    try {
        let User = await models.UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        res.status(201).json({
            message: "User Successfully hooked",
            user: User,
            sessionToken: `Bearer ${token}`
        });
    } catch (err) {
        console.log(err)
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Class is used by another character",
            });
        } else {
            res.status(500).json({
                message: "You rolled a NAT 1, you loser!"
            })
        }
    }
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body.user;
    try {
        await models.UserModel.create({
            email: email
            , password: bcrypt.hashSync(password, 10)
        }).then(user => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.status(201).json({
                user: user,
                message: 'user created',
                sessionToken: `Bearer ${token}`
            });
        })
    } catch (err) {
        console.log(err)
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        let loginUser = await models.UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, "i_am_secret", { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: loginUser,
                    message: "Welcome back Sweetie <3",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Really you can't remember your info huh."
                })
            }
        } else {
            res.status(401).json({
                message: 'Declined, that is embarasing'
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Access Denied scrub"
        })
    }
});



module.exports = router;

