import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from '../../company/__test__/helpers';
import { createItemCompany } from './helpers';

describe('GET ItemCompany/list', function() {


  it('A simple user can list all items in a company', async () => {

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
    .get('/api/item/list/company/'+company.body.id)
    .set('Cookie', consultor)
    .send()
    .expect(200);

    expect(response.body.length).toEqual(4);

  });
  
  it('A manager can list all items in a company', async () => {
    
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
    .get('/api/item/list/company/'+company.body.id)
    .set('Cookie', manager)
    .send()
    .expect(200);

    expect(response.body.length).toEqual(4);
  });

});