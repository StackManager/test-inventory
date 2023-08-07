import { companyCreate } from "./routers/create";
import { companyList } from "./routers/list";
import { companyUpdate} from "./routers/update";
import { companyDelete} from "./routers/delete";
import { companyRead} from "./routers/read";


const { Router } = require('express');
const companyRouter = Router();

companyRouter.use('/company', companyList);
companyRouter.use('/company', companyRead);
companyRouter.use('/company', companyCreate);
companyRouter.use('/company', companyUpdate);
companyRouter.use('/company', companyDelete);

export { companyRouter };