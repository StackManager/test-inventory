import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from "./helpers";
import { authRouter } from "./services/auth";
import { companyRouter } from "./services/company";
import { itemRouter } from "./services/item";


const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.NODE_DOMAIN!);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, withCredentials, Cookie, Authorization, append,delete,entries,foreach,get,has,keys,set,values");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  if ('OPTIONS' == req.method) res.send(200);
  else next();
});


app.set('trust proxy', 1);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);


app.use('/api', authRouter);
app.use('/api', companyRouter);
app.use('/api', itemRouter);


app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export {app}
