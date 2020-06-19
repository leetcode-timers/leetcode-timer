const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const request = require('supertest')
const url = 'http://localhost:3000/dev'
const token = 123

chai.use(chaiHttp)

describe('Dashboard', () => {
  it('Unauthorized GET /dashboard', async function () {
    let res = await chai.request(url)
      .get('/dashboard')
    console.log(res)
    res.should.have.status(403)
  })
})

describe('Create Account', () => {
  it('Ill-formed email', function (done) {
    request(url)
      .post('/create')
      .set('Content-type', `application/json`)
      .set('Authorization', 'bearer 123')
      .send(
        {
          email: 'nsd@google.com',
          password: 'pwd12344'
        }
      )
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err)
        console.log(res)
        done()
      })
  })
})
