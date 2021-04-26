import { Router } from "express";
import { MessagesController } from "../controller";


const messagesRouter = Router();

const messagesController = new MessagesController;

messagesRouter.post('/create', messagesController.create);
messagesRouter.get('/:userId', messagesController.index);

export default messagesRouter;
