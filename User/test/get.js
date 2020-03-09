const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app.js');
const conn = require('../controllers/auth.js');
const routes = require('../routes/auth.js');
const user = require('../models/user.js');

describe('api testing', function(){
    it('test case for signout', function(){
        // let data = {'name': 'random', 'email': 'random@gmail.com', 'password':'Random123!'}
        request('http://localhost:8080')
        .get('/signout')
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, user);
    });
    
    it('test case for reset password', function(){
        // let data = {'name': 'random', 'email': 'random@gmail.com', 'password':'Random123!'}
        request('http://localhost:8080')
        .get('/reset-password')
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, user);
    });

})