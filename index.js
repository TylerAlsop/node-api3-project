//////// Require ////////
const express = require("express");
const cors = require("cors");
const logger =  require("./middleware/logger");

//////// Routers ////////
const welcomeRouter = require("./welcome/welcomeRouter");
const usersRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

//////// Server / Port ////////
const server = express();
const port = process.env.PORT || 3333

//////// Servers / Middlewares ////////
server.use(express.json());
server.use(cors());
server.use(logger({ format: "medium" }));

server.use("/", welcomeRouter);
server.use("/users", usersRouter);
server.use("/users/:id/posts", postsRouter);

server.use((req, res) => {
    res
        .status(404)
        .json({
            message: "Route was not found."
        })
});

server.use((err, req, res, next) => {
    console.log(err);
    res
        .status(500)
        .json({
            message: "Oops! Something went wrong!"
        })
});

server.listen(port, () => {
    console.log(`Server running on at http://localhost:${port}`);
});
