import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/user";
import workspacesRouter from "./routes/workspace";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/workspaces", workspacesRouter);

export default app;
