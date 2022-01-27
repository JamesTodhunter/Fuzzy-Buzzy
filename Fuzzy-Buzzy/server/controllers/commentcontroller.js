const Express = require('express');
const router = Express.Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

// Create Comment //
router.post('/create', validateJWT, async (req, res) => {
    const { title, date, entry, dndId } = req.body.comment;
    const commentEntry = {
        title,
        date,
        entry,
        dndId: dndId,
        userId: req.user.id
    }
    console.log(commentEntry)
    try {
        const newComment = await models.CommentModel.create(commentEntry);
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

router.get("/", async (req, res) => {
    try {
        const entries = await models.CommentModel.findAll();
        res.status(200).json(entries)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err });
    }
});


// Get entries //
router.get("/entry/:dndId", validateJWT, async (req, res) => {

    try {
        const userComments = await models.CommentModel.findAll({
            where: {
                dndId: req.params.dndId,
                userId: req.user.id
            }
        });
        res.status(200).json(userComments);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

// // Get Comment by title //
// router.get("/:title", validateJWT, async (req, res) => {
//     let { title, dndId } = req.body.comment;
//     try {
//         const results = await models.CommentModel.findAll({
//             where: {
//                 title: title,
//                 dndId: dndId,
//                 userId: req.user.id

//             }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: err });
//     }
// });

// Update dnd item //
router.put("/update/:commentId", validateJWT, async (req, res) => {
    const { title, date, entry } = req.body.comment;
    const commentId = req.params.commentId;

    const query = {
        where: {
            id: commentId,
            userId: req.user.id
        }
    };

    const updatedComment = {
        title: title,
        date: date,
        entry: entry
    };

    try {
        const update = await models.CommentModel.update(updatedComment, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
});

// Delete a dnd item //

router.delete("/:commentId", validateJWT, async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const query = {
            where: {
                id: commentId,
                dndId: dndId,
                userId: req.user.id
            }
        };

        await models.CommentModel.destroy(query);
        res.status(200).json({ message: "Comment Entry Deleted" });
    } catch (err) {
        console.log(object)
        res.status(500).json({ error: err })
    }
});


module.exports = router;