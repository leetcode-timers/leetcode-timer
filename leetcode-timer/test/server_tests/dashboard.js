const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const version = 'v1'
const endpoint = 'https://o0tbd1isti.execute-api.us-east-1.amazonaws.com/'
const url = endpoint + version
const create_token = 123
chai.use(chaiHttp)

const status_codes = require('../util/constants.js')
const error_messages = require('../util/errorMessages.js')
const test_info = require('../util/test_info')

describe('Users Endpoint', () => {

  describe('Account Creation Failure', () => {
    it('should fail to create account when wrong token', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + 'abc')
        .send(test_info.person1)
      res.should.have.status(status_codes.forbidden_status_code)
      res.body.should.eql(error_messages.forbidden_body)
    })

    it('should fail to create account when email malformed', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person_with_invalid_email)
      res.should.have.status(status_codes.bad_request_status_code)
      res.body.should.eql(error_messages.malformed_email_body)
    })

    it('should fail to create account when password < limit', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person_with_small_password)
      res.should.have.status(status_codes.bad_request_status_code)
      res.body.should.eql(error_messages.malformed_password_body)
    })

    it('should fail to create account when name > limit', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person_with_long_name)
      res.should.have.status(status_codes.bad_request_status_code)
      res.body.should.eql(error_messages.malformed_name_body)
    })

    it('should fail to create account when password is missing', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person_without_password)
      res.should.have.status(status_codes.bad_request_status_code)
      res.body.should.eql(error_messages.missing_password_body)
    })

    it('should fail to create account when email is missing', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person_without_email)
      res.should.have.status(status_codes.bad_request_status_code)
      res.body.should.eql(error_messages.missing_email_body)
    })

  })
  describe('Account Creation success', () => {

    it('should create account successfully', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1)
      res.should.have.status(status_codes.created_status_code)
    })
  })

  describe('Dashboard', () => {

    it('should not display dashboard', async () => {
      let res = await chai.request(url)
        .get('/dashboard')
        .set('Authorization', 'Bearer ' + test_info.sample_jwt)
      res.status.should.eq(status_codes.forbidden_status_code)
    })

    it('should display dashboard after logging in successfully', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1)
      res.should.have.status(status_codes.created_status_code)
      let message = JSON.parse(res.text)
      let recd_token = message.token

      res = await chai.request(url)
        .get('/dashboard')
        .set('Authorization', 'Bearer ' + recd_token)
      res.should.have.status(status_codes.ok_status_code)
    })
  })

  describe('Signing In', () => {

    before(async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1)
      res.should.have.status(status_codes.created_status_code)
    })

    it('should sign in successfully', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1)
      res.should.have.status(status_codes.created_status_code)
    })

    it('should fail to sign in', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1_wrong_password)
      res.should.have.status(status_codes.unauthorized_status_code)
    })

  })

  describe('Get User Info', () => {
    let recd_token
    let userId
    before(async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + create_token)
        .send(test_info.person1)
      res.should.have.status(status_codes.created_status_code)
      let message = JSON.parse(res.text)
      recd_token = message.token
      userId = message.body.id

      res = await chai.request(url)
        .get('/dashboard')
        .set('Authorization', 'Bearer ' + recd_token)
      res.should.have.status(status_codes.ok_status_code)
    })

    it('should return user info successfully', async () => {
      let res = await chai.request(url)
        .get('/users/' + userId)
        .set('Authorization', 'Bearer ' + recd_token)
        .send()
      res.should.have.status(status_codes.ok_status_code)
      res.body.body.email.should.eq(test_info.person1.email)
      res.body.body.name.should.eq(test_info.person1.name)
      res.body.body.password.should.eq(test_info.person1.password)
    })

  })
})
