import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from './helpers';

describe('GET company/read', function() {


  it('A consultor can read a company', async () => {
    
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .get('/api/company/'+company.body.id)
    .set('Cookie', user)
    .send()
    .expect(200);
  });
  
  it('A manager can read a company', async () => {
    
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .get('/api/company/'+company.body.id)
    .set('Cookie', user)
    .send()
    .expect(200);
  });

});