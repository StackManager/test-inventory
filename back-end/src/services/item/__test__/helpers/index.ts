import request from 'supertest';
import { app } from '../../../../app';

export const createItemCompany = async (
  user: string[], 
  companyId: string
) => {

  let val = Math.floor(Math.random() * 1000) + 1

  return request(app)
  .post('/api/item/create')
  .set('Cookie', user).send({
    "name":"Producto " + val,
    "description":"Lorem ipsum dolor sit amet consectetur" + val,
    "price": val+".50",
    "companyId":companyId
  });
};