import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import workspaceRouter from "./routes/workspace";
import subscriptionRouter from "./routes/subscription";
import boardRouter from "./routes/board";
import listRouter from "./routes/list";
import cardRouter from "./routes/card";
import inviteRouter from "./routes/invite";
import labelRouter from "./routes/label";
import checklistRouter from "./routes/checklist";
import activityRouter from "./routes/activity";
import attachmentRouter from "./routes/attachment";

const app = express();

app.use(logger(process.env.ENVIRONMENT || "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/workspaces", workspaceRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/boards", boardRouter);
app.use("/lists", listRouter);
app.use("/cards", cardRouter);
app.use("/invites", inviteRouter);
app.use("/labels", labelRouter);
app.use("/checklists", checklistRouter);
app.use("/activities", activityRouter);
app.use("/attachments", attachmentRouter);

export default app;
