import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from '../../company/__test__/helpers';
import { createItemCompany } from './helpers';

describe('DELETE ItemCompany/delete', function() {


  it('A simple user cannot delete a company', async () => {
    
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    let consultor = await global.signin("general-2", "consultor");
    let item = await createItemCompany(user, company.body.id)
    expect(item.status).toEqual(201);
    
    const response = await request(app)
    .delete('/api/item/'+item.body.id)
    .set('Cookie', consultor)
    .send()
    .expect(401);

  });
  
  it('A manager can delete many company and delete one', async () => {
    
    let user = await global.signin("general-1", "manager");
    let company = await createCompany(user, "1");
    let item = await createItemCompany(user, company.body.id)
    expect(item.status).toEqual(201);
    
    const response = await request(app)
    .delete('/api/item/'+item.body.id)
    .set('Cookie', user)
    .send()
    .expect(200);

  });

});