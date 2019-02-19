let chai = require("chai");
let chaiHttp = require("chai-http")
let server = require('../server.js');
var expect = chai.expect;
var request = require('supertest');

chai.use(chaiHttp);
chai.should();

var url = 


describe('Routes', ()=>{
  describe('[ / ]',()=>{
    it('should repond with a 200 status code if not logged in',(done)=>{
      chai.request(server).get('/')
      .end((err,res)=>{
        expect(res).to.have.status(200);
        done();
      })
    });
  });

  describe('[ /users/register ]',()=>{
    it('should repond with a 200 status code',(done)=>{
      chai.request(server).get('/users/register')
      .end((err,res)=>{
        expect(res).to.have.status(200);
        done();
      })
    });
  });

  describe('[ /users/profile ]',()=>{
    it('should redirect to homepage if not logged in',(done)=>{
      chai.request(server).get('/users/profile')
      .end((err,res)=>{
        res.should.redirectTo("http://"+res.request.host+'/');
        done();
      })
    })
  })
})