import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from 'jsonwebtoken';

declare global {
  function signin(e: string, role: string): Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "inventory";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async (add: string, role) => {

  const email = "angel"+add+"@gmail.com";
  const password = "12345678";

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email,
      password,
      role
    })
    .expect(201) 

  const cookie = response.get('Set-Cookie');

  return cookie;

};

