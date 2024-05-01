const assert = require('assert');
const axios = require('axios');

describe('Create Read Update and Delete Master Data Users API ', () => {
  let userId;

  it('should retrieve a list of user in page 2 ( tags : @API_1 )', async () => {
    const user2 = require('./data/user2.json')
    const response = await axios.get('https://reqres.in/api/users?page=2');
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.page, 2);
    assert.strictEqual(response.data.per_page, 6);
    assert.strictEqual(response.data.total, 12);
    assert.strictEqual(response.data.total_pages, 2);
    assert.strictEqual(response.data.data.length, 6);

    const body = response.data;
    
    body.data.forEach(user => {
      assert.strictEqual(typeof user.id, 'number');
      assert.strictEqual(typeof user.email, 'string');
      assert.strictEqual(typeof user.first_name, 'string');
      assert.strictEqual(typeof user.last_name, 'string');
      assert.strictEqual(typeof user.avatar, 'string');
    });

  });
  it('should retrieve a single user with id 2', async () => {
    const user2 = require('./data/user2.json')
    const response = await axios.get('https://reqres.in/api/users/2');
    
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.data, user2)
  });

  it('should create a new user', async () => {
    const user = {
      "name": "Wahyu",
      "job": "Test Engineer"
    }
    const response = await axios.post('https://reqres.in/api/users', user);

    assert.strictEqual(response.status, 201);
    assert.strictEqual(typeof response.data.id, 'string');
    assert.strictEqual(response.data.name, user.name);
    assert.strictEqual(response.data.job, user.job);
    assert.strictEqual(typeof response.data.createdAt, 'string');

    userId = response.data.id;
  });

  it('should update a user', async () => {
    const updatedUser = {
      name: 'Wahyu Maulana',
      job: 'QA Engineer'
    };
    const response = await axios.put(`https://reqres.in/api/users/${userId}`, updatedUser);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, updatedUser.name);
    assert.strictEqual(response.data.job, updatedUser.job);
    assert.strictEqual(typeof response.data.updatedAt, 'string');
  });  
  
  it('should delete a user', async () => {
    const response = await axios.delete(`https://reqres.in/api/users/${userId}`);

    assert.strictEqual(response.status, 204);
  });

  it('should fail to retrieve data for a non-existent user', async () => {
    try{
      const response = await axios.get('https://reqres.in/api/users/23');
      assert.fail('Expected retrieval to fail with non-existent user ID');
    } catch (error) {
      console.log(error.response.status)
      console.log(error.response.data)
      assert.strictEqual(error.response.status, 404);
    }
  });

});