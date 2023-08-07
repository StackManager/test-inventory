import request from 'supertest';
import { app } from '../../../app';
import { createCompany } from '../../company/__test__/helpers';
import { createItemCompany } from './helpers';

describe('PUT ItemCompany/list', function() {
  
  it('A consultor cannot update a item', async () => {
    let manager = await global.signin("general-1", "manager");
    let company = await createCompany(manager, "1");
    let consultor = await global.signin("general-2", "consultor");
    let item = await createItemCompany(manager, company.body.id)
    expect(item.status).toEqual(201);


    const response = await request(app)
    .put('/api/item/'+item.body.id)
    .set('Cookie', consultor)
    .send({
      "name": "Producto 2",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat",
      "price": "33.33"
    })
    .expect(401);

  });

  it('A manager can update a item', async () => {
    let manager = await global.signin("general-1", "manager");
    let company = await createCompany(manager, "1");
    let item = await createItemCompany(manager, company.body.id)
    expect(item.status).toEqual(201);


    const response = await request(app)
    .put('/api/item/'+item.body.id)
    .set('Cookie', manager)
    .send({
      "name": "Producto 2",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat",
      "price": "33.33"
    })
    .expect(200);

  });


});
