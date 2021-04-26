import { Request, Response } from "express";
import { MessagesService } from "@modules/messages/services/MessagesService";

class MessagesController {

  async create(req: Request, res: Response): Promise<Response> {
    const { admin_id, user_id, text } = req.body;

    const messageService = new MessagesService();

    try {
      const message = await messageService.create({ admin_id, user_id, text });

      return res.json(message);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const messageService = new MessagesService();

    try {
      const listMessagesById = await messageService.index(userId)

      return res.json(listMessagesById);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
}
export { MessagesController }
