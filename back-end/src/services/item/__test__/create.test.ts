import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from '../../company/__test__/helpers';
import { createItemCompany } from './helpers';


describe('POST ItemCompany/create', function() {
  
  it('Name required', async () => {

    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    
    const response = await request(app)
    .post('/api/item/create')
    .set('Cookie', user)
    .send({
      "description":"Lorem ipsum dolor sit amet consectetur",
      "price":"1.50",
      "companyId": company.body.id
    })
    .expect(400);

  });

  it('Description required', async () => {
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    
    const response = await request(app)
    .post('/api/item/create')
    .set('Cookie', user)
    .send({
      "name":"Producto ",
      "price":"1.50",
      "companyId": company.body.id
    })
    .expect(400);
  });

  it('Price required', async () => {
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    
    const response = await request(app)
    .post('/api/item/create')
    .set('Cookie', user)
    .send({
      "name":"Producto ",
      "description":"Lorem ipsum dolor sit amet consectetur",
      "companyId": company.body.id
    })
    .expect(400);
  });

  it('CompanyId required', async () => {
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    
    const response = await request(app)
    .post('/api/item/create')
    .set('Cookie', user)
    .send({
      "name":"Producto ",
      "description":"Lorem ipsum dolor sit amet consectetur",
      "price":"1.50",
    })
    .expect(400);
  });


  it('A consultor cannot create a item', async () => {
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    let consultor = await global.signin("general-2", "consultor");
    let item = await createItemCompany(consultor, company.body.id)
    expect(item.status).toEqual(401);

  });

  it('A manager can create a item', async () => {
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    let item = await createItemCompany(user, company.body.id)
    expect(item.status).toEqual(201);

  });
});
