require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");


const controllers = require("./controllers");
const middleware = require("./middleware");
app.use(middleware.CORS);
app.use(Express.json());

app.use("/user", controllers.userController);

app.use(require("./middleware/validate-jwt"));
app.use("/fuzzy", controllers.dndController);
app.use("/comment", controllers.commentController);



// app.use('/test', (req, res) => {
//     res.send('This is message from the test endpoint on the server!')
// });

dbConnection.authenticate()
    .then(() => dbConnection.sync({ /*force: true*/ }))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });


