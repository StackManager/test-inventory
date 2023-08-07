import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from './helpers';

describe('GET company/list', function() {


  it('A simple user can list all companies', async () => {

    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    await createCompany(user, "4");
    
    const response = await request(app)
    .get('/api/company/list')
    .set('Cookie', await global.signin("general-2", "consultor"))
    .send()
    .expect(200);

    expect(response.body.length).toEqual(4);
  });
  
  it('A manager can list all companies', async () => {
    
    let user = await global.signin("general-3", "manager");
    await createCompany(user, "5");
    await createCompany(user, "6");
    await createCompany(user, "7");
    await createCompany(user, "8");
    
    const response = await request(app)
    .get('/api/company/list')
    .set('Cookie', await global.signin("general-4", "manager"))
    .send()
    .expect(200);

    expect(response.body.length).toEqual(4);
  });

});