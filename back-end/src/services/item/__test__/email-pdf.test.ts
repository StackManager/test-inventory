import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from '../../company/__test__/helpers';
import { createItemCompany } from './helpers';

describe('GET ItemCompany/list/company/pdf', function() {


  it('A consultor can get pdf of items in a company', async () => {

    let manager = await global.signin("general-1", "manager");
    let company = await createCompany(manager, "1");
    let consultor = await global.signin("general-2", "consultor");
    let item = await createItemCompany(manager, company.body.id)
    expect(item.status).toEqual(201);
    let item1 = await createItemCompany(manager, company.body.id)
    expect(item1.status).toEqual(201);
    let item2 = await createItemCompany(manager, company.body.id)
    expect(item2.status).toEqual(201);
    let item3 = await createItemCompany(manager, company.body.id)
    expect(item3.status).toEqual(201);

    const response = await request(app)
    .get('/api/item/list/company/'+company.body.id+'/pdf/email')
    .set('Cookie', consultor)
    .send()
    .expect(200);



  });
  
  it('A manager can get pdf of items in a company', async () => {
    
    let manager = await global.signin("general-1", "manager");
    let company = await createCompany(manager, "1");
    let item = await createItemCompany(manager, company.body.id)
    expect(item.status).toEqual(201);
    let item1 = await createItemCompany(manager, company.body.id)
    expect(item1.status).toEqual(201);
    let item2 = await createItemCompany(manager, company.body.id)
    expect(item2.status).toEqual(201);
    let item3 = await createItemCompany(manager, company.body.id)
    expect(item3.status).toEqual(201);

    const response = await request(app)
    .get('/api/item/list/company/'+company.body.id+'/pdf/email')
    .set('Cookie', manager)
    .send()
    .expect(200);
  });

});