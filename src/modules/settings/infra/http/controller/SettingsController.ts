import { Request, Response } from "express";
import { SettingService } from "@modules/settings/services/SettingsService";

class SettingsController {

  async create(req: Request, res: Response): Promise<Response> {
    const {chat, username} = req.body;

    const settingService = new SettingService();

    try {
      const setting = await settingService.create({chat, username});

      return res.json(setting);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }

  async index(req: Request, res: Response): Promise<Response>{
    const { username } = req.params;

    const settingService = new SettingService();

    const setting = await settingService.findByUsername(username);

    return res.json(setting);
  }

  async update(req: Request, res: Response): Promise<Response>{
    const { username } = req.params;
    const { chat } = req.body;

    const settingService = new SettingService();

    const setting = settingService.update(username, chat);

    return res.json(setting);
  }
}

export { SettingsController }
