import request from 'supertest';
import { app } from '../../../../app';

export const createCompany = async (user: string[], id: string) => {
  return request(app).post('/api/company/create').set('Cookie', user).send({
    name:"Company "+ id,
    description: "Company description",
    address:"Company address " + id,
    nit:"94839450"+id,
    phone: "4084441359"
  });
};