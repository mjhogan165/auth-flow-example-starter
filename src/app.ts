import express from "express";
import { dogController } from "./router/dog.router";
import { userController } from "./router/user.router";
import "express-async-errors";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(dogController);
app.use(userController);

app.listen(3000);
