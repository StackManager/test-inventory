import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from './helpers';

describe('PUT company/update', function() {
  

  it('A consultor cannot update a company', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "consultor"))
    .send({
      "name":"Quantym qyer",
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "nit":"123456712",
      "phone":"4084441359",
      "address": "Address is the same"
    })
    .expect(401);
  });


  it('A manager can update a company', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send({
      "name":"Quantym qyer",
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "nit":"123456712",
      "phone":"4084441359",
      "address": "Address is the same"
    })
    .expect(200);
  });

  it('A manager cannot update a company without name', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send({
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "nit":"123456712",
      "phone":"4084441359",
      "address": "Address is the same"
    })
    .expect(400);
  });

  it('A manager cannot update a company without NIT', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send({
      "name":"Quantym qyer",
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "phone":"4084441359",
      "address": "Address is the same"
    })
    .expect(400);
  });


  it('A manager cannot update a company without phone', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send({
      "name":"Quantym qyer",
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "nit":"123456712",
      "address": "Address is the same"
    })
    .expect(400);
  });

  it('A manager cannot update a company without address', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .put('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send({
      "name":"Quantym qyer",
      "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "nit":"123456712",
      "phone":"4084441359",
    })
    .expect(400);
  });



});
