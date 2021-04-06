import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import workspaceRouter from "./routes/workspace";
import subscriptionRouter from "./routes/subscription";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/workspaces", workspaceRouter);
app.use("/subscriptions", subscriptionRouter);

export default app;
