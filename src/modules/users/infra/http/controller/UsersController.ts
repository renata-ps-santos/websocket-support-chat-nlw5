import { Request, Response } from "express";
import { UserService } from "@modules/users/services/UsersService";

class UsersController {

  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const userService = new UserService();

    try {
      const user = await userService.create(email);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { UsersController }
