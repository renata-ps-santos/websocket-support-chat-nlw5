import { Router } from "express";
import { SettingsController } from "../controller";


const settingsRouter = Router();

const settingsController = new SettingsController;

settingsRouter.post('/create', settingsController.create);
settingsRouter.put('/:username', settingsController.update);
settingsRouter.get('/:username', settingsController.index);


export default settingsRouter;
