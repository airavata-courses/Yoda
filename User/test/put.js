const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app.js');
const conn = require('../controllers/auth.js');
const routes = require('../routes/auth.js');
const user = require('../models/user.js');

describe('api testing', function(){
it('test case for forgot password', function(){
    let data = {'email': 'random@gmail.com'}
    request('http://localhost:8080')
    .put('/forgot-password', data)
    .set('accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, user);
});
})