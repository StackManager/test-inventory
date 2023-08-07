import { itemCreate } from "./routers/create";
import { itemList } from "./routers/list";
import { itemUpdate} from "./routers/update";
import { itemDelete} from "./routers/delete";
import { itemRead} from "./routers/read";
import { itemEmailPDF} from "./routers/email-pdf";
import { itemGetPDF} from "./routers/get-pdf";

const { Router } = require('express');
const itemRouter = Router();

itemRouter.use('/item', itemCreate);
itemRouter.use('/item', itemList);
itemRouter.use('/item', itemRead);
itemRouter.use('/item', itemUpdate);
itemRouter.use('/item', itemDelete);
itemRouter.use('/item', itemGetPDF);
itemRouter.use('/item', itemEmailPDF);

export { itemRouter };