const expect = require('chai').expect;
const request = require('supertest');
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// const app = require('../app.js');
// const conn = require('../controllers/auth.js');
// const routes = require('../routes/auth.js');
// const user = require('../models/user.js');

describe('api testing', function(){
    it('test case for realtime', function(){
        let data = {'city': 'Bloomington', 'state': 'IN'}
        request('http://localhost:3500')
        .get('/realtime/Bloomington/IN', data)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    it('test case for activityRetrieve', function(){
        let data = {'user_id': '123'}
        request('http://localhost:3400')
        .get('/findAllActivities/123')
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    it('test case for getActivity', function(){
        let data = {'user_id':'123', 'session_id':'123'}
        request('http://localhost:3400')
        .get('/findBySessionId/123')
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
})