import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('GET /api/medianprime/:n', () => {

    let server;

    before(() => {
        server = app.listen(3002);
    });

    after(() => {
        server.close(() => {
            console.log('Test server stopped');
           // process.exit();
        });
    });


    it('should return an error message if the empty input', (done) => {
        chai.request(app)
            .get(`/api/medianprime/:''`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.equal('Invalid user input');
                done();
            });
    });

    it('should return an error message if the input is float', (done) => {
        chai.request(app)
            .get('/api/medianprime/3.5')
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.equal('Invalid user input');
                done();
            });
    });

    it('should return an error message if the input is string', (done) => {
        chai.request(app)
            .get(`/api/medianprime/'abc'`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.equal('Invalid user input');
                done();
            });
    });

    it('should return the median prime numbers up to the given number', (done) => {
        chai.request(app)
            .get('/api/medianprime/10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                expect(res.body[0]).to.be.equal(3);
                expect(res.body[1]).to.be.equal(5);
                done();
            });
    });

});
