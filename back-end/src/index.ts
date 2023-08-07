import mongoose from 'mongoose';
import {app} from './app'
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const start = async () => {
  
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_PASSWORD){
    throw new Error('MONGO_USERNAME must be defined');
  }

  if (!process.env.MONGO_USERNAME){
    throw new Error('MONGO_USERNAME must be defined');
  }

  if (!process.env.MONGO_HOSTNAME){
    throw new Error('MONGO_HOSTNAME must be defined');
  }

  if (!process.env.MONGO_PORT){
    throw new Error('MONGO_PORT must be defined');
  }

  if (!process.env.MONGO_DB){
    throw new Error('MONGO_DB must be defined');
  }
  
  try {
    mongoose.set("strictQuery", false);
    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true&authSource=admin`;
    await mongoose.connect(url, {});
    console.log("Connected to MongoDb");

  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
