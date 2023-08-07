import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from './helpers';

describe('DELETE company/delete', function() {


  it('A simple user cannot delete a company', async () => {
    
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .delete('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "consultor"))
    .send()
    .expect(401);

  });
  
  it('A manager can delete many company and delete one', async () => {
    
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .delete('/api/company/'+company.body.id)
    .set('Cookie', user)
    .send()
    .expect(200);

  });

  it('Any manager can create many company and delete one', async () => {
    
    let user = await global.signin("general-1", "manager");
    await createCompany(user, "1");
    await createCompany(user, "2");
    await createCompany(user, "3");
    let company = await createCompany(user, "4");
    
    const response = await request(app)
    .delete('/api/company/'+company.body.id)
    .set('Cookie', await global.signin("general-2", "manager"))
    .send()
    .expect(200);

  });

});