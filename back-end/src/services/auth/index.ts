import { currentUserRouter } from "./routers/current-user";
import { signinRouter } from "./routers/signin";
import { signoutRouter } from "./routers/signout";
import { signupRouter } from "./routers/signup";
const { Router } = require('express');
const authRouter = Router();

authRouter.use('/auth', currentUserRouter);
authRouter.use('/auth', signinRouter);
authRouter.use('/auth', signupRouter);
authRouter.use('/auth', signoutRouter);

export { authRouter };