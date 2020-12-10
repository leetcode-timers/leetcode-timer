const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const version = 'v1'
const endpoint = 'https://0ppx4z2z6a.execute-api.us-east-1.amazonaws.com/'
const url = endpoint + version
const token = 123
chai.use(chaiHttp)

describe('Dashboard', () => {
  it('should not display dashboard', async function () {
    let res = await chai.request(url)
      .get('/dashboard')
      .set('Authorization', 'Bearer eyJhbGciOiJSasfUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2QxQGdvb2dsZS5jb20iLCJpYXQiOjE1OTM0MDQ1OTgsImV4cCI6MTU5MzQwNDcxOH0.2sPDz6U40wm0P63MGWMu9etA3InQfR5odovKxNTXe48USw1ta3kTJJo1Nj2rVYhzUN-54HkDoakseWwwjSF0qw')
    console.log(res.body)
    res.status.should.eq(403)
  })
})

describe('Account Management', () => {

  describe('Users Endpoint', () => {

    it('should create account successfully', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'email': 'nachi@tr.com',
          'password': 'thisIsMyPassword',
          'name': 'Nachiket Dhamankar',
          'joinedAt': '1601186775'
        })
      console.log(res.body)
      res.should.have.status(201)
    })

    it('should display dashboard after logging in successfully', async () => {
      let res = await chai.request(url)
        .post('/users')
        .set('Authorization', 'Bearer ' + token)
        .send({
          'email': 'nachi@google.com',
          'password': 'thisIsMyPassword',
          'name': 'Nachiket Dhamankar',
          'joinedAt': '1601186775'
        })
      res.should.have.status(201)
      let message = JSON.parse(res.text)
      let recd_token = message.token

      res = await chai.request(url)
        .get('/dashboard')
        .set('Authorization', 'Bearer ' + recd_token)
      console.log(res.body)
      res.should.have.status(200)
    })
  })

})
