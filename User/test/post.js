const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app.js');
const conn = require('../controllers/auth.js');
const routes = require('../routes/auth.js');
const user = require('../models/user.js');

// var should = chai.should();

// describe('POST /signin', () => {
//     before((done) => {
//         mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => done())
//         .catch((err)=>done(err));        
//     })
//     after((done) => {
//         app.close()
//         .then(() => done())
//         .catch((err)=>done(err));        
//     })
//     it ('OK, signing in works', (done)=>{
//         request(routes).post('/signin')
//         .send({email: 'tanvithote@gmail.com', password:"Tanvi123!"})
//         .then((res)=>{
//             const body = res.body;
//             expect(body).to.contain.property('_id');
//             expect(body).to.contain.property('email');
//             expect(body).to.contain.property('name');
//             done();
//         })
//     })
// })

describe('api testing', function(){
    it('test case for signin', function(){
        let data = {'email': 'tanvithote@gmail.com', 'password': 'Tanvi123!'}
        request('http://localhost:8080')
        .post('/signin', data)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, user);
    });
    it('test case for signup for existing user', function(){
        let data = {'name': 'tanvi', 'email': 'tanvithote@gmail.com', 'password':'Tanvi123!'}
        request('http://localhost:8080')
        .post('/signup', data)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403, user);
    });
    it('test case for signup for new user', function(){
        let data = {'name': 'random', 'email': 'random@gmail.com', 'password':'Random123!'}
        request('http://localhost:8080')
        .post('/signup', data)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, user);
    });    

})
