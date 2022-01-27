const Express = require('express');
const router = Express.Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

// Test Works
// router.get("/prac", (req, res) => {
//     res.send("Fuzzy Buzzy was a catbee!")
// });

// Save DND Item works
router.post('/save', validateJWT, async (req, res) => {
    const { index, name, description } = req.body.dnd;
    const dndEntry = {
        index,
        name,
        description,
        userId: req.user.id
    }
    try {
        const newDnd = await models.DndModel.create(dndEntry);
        res.status(200).json(newDnd);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});


// Get dnd Item
router.get("/read", validateJWT, async (req, res) => {
    try {
        const dndItem = await models.DndModel.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(dndItem);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});


// Update dnd item
router.put("/update/:itemId", validateJWT, async (req, res) => {
    const { index, name, description } = req.body.dnd;
    const dndId = req.params.itemId;

    const query = {
        where: {
            id: dndId,
            userId: req.user.id
        }
    };
    console.log(query)

    const updatedDnd = {
        index: index,
        name: name,
        description: description
    };

    try {
        const update = await models.DndModel.update(updatedDnd, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
});

// Delete DND Item
router.delete("/:userId", validateJWT, async (req, res) => {
    const dndId = req.params.userId;

    try {
        const query = {
            where: {
                id: dndId,
                userId: req.user.id
            }
        };

        await models.DndModel.destroy(query);
        res.status(200).json({ message: "Saved Item Deleted!" });
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

module.exports = router;