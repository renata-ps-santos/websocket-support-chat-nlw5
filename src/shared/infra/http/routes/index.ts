import { Router } from 'express';
import { SettingsRouter } from '@modules/settings/infra/http/routes';
import { UsersRouter } from '@modules/users/infra/http/routes';
import { MessagesRouter } from '@modules/messages/infra/http/routes';
const appRoutes = Router();

appRoutes.use('/settings', SettingsRouter);

appRoutes.use('/users', UsersRouter);

appRoutes.use('/messages', MessagesRouter);


export default appRoutes;
