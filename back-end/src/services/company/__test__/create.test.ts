import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from './helpers';

describe('POST company/create', function() {
  
  it('Name required', async () => {
    
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("name-1", "manager")).send({
      description: "Company description",
      address:"Company address ",
      nit:"123456789",
      phone: "4084441359"
    })
    expect(resp.status).toEqual(400);
  });

  it('Name needs at least 3 characters', async () => {
    
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("name-2", "manager")).send({
      name: "an",
      description: "Company description",
      address:"Company address ",
      nit:"123456789",
      phone: "4084441359"
    })
    expect(resp.status).toEqual(400);

  });


  it('Name cannot contain more than 50 characters', async () => {
    
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("name-3", "manager")).send({
      name: "asdasdasd asdasd asdas asd asd asd  asdas das das as",
      description: "Company description",
      address:"Company address ",
      nit:"123456789",
      phone: "4084441359"
    })

    expect(resp.status).toEqual(400);

  });

  it('Address required', async () => {
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("address-1", "manager")).send({
      name: "Company name",
      description:"Company Description ",
      nit:"123456789",
      phone: "4084441359"
    })
    expect(resp.status).toEqual(400);
  });


  it('Address cannot contain more than 255 characters', async () => {
    
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("address-2", "manager")).send({
      name: "Company",
      description: "Company description",
      address:"Company description Company description Company description Company description Company description Company description Company description Company description Company description Company description Company description Company description Company description",
      nit:"123456789",
      phone: "4084441359"
    })

    expect(resp.status).toEqual(400);

  });

  it('NIT required', async () => {
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("nit-1", "manager")).send({
      name: "Company name",
      description:"Company Description ",
      address:"Company address",
      phone: "4084441359"
    })
    expect(resp.status).toEqual(400);
  });


  it('NIT 9 characters', async () => {
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("nit-2", "manager")).send({
      name:"Company ",
      description: "Company description",
      address:"Company address ",
      nit:"12345678",
      phone: "4084441359"
    })
    expect(resp.status).toEqual(400);
  });


  it('Phone required', async () => {
    const resp = await request(app).post('/api/company/create').set('Cookie', await global.signin("phone-3", "manager")).send({
      name: "Company name",
      description:"Company Description ",
      nit:"123456789",
      address: "Company address"
    })
    expect(resp.status).toEqual(400);
  });

  it('I can create many companies', async () => {
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");

    const response = await request(app).get('/api/company/list').set('Cookie', user).send().expect(200);
    expect(response.body.length).toEqual(3);
  });
});
