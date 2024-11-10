const request = require('supertest');
const app = require('../app');



describe('Register Tests', () => {

    // Registro owner correcto
    it('POST /users/registerUser: registro de owner correcto', async () => {
        const data = {
            name: 'Usuario1',
            lastname: 'Apellido1',
            username: 'usuario1',
            mail: 'usuario1@example.com',
            number: '666666666',
            password: 'passuser1',
            type: '1'
          };
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
    });

    // Registro guest correcto
    it('POST /users/registerUser: registro de guest correcto', async () => {
        const data = {
            name: 'Usuario2',
            lastname: 'Apellido2',
            username: 'usuario2',
            mail: 'usuario2@example.com',
            number: '666666666',
            password: 'passuser2',
            type: '2'
          };
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
    });

    // Registro username existente
    it('POST /users/registerUser: registro usuario existente', async () => {
        const data = {
            name: 'Usuario1',
            lastname: 'Apellido1',
            username: 'usuario1',
            mail: 'usuario1@example.com',
            number: '666666666',
            password: 'passuser1',
            type: '1'
          };
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty('error', 'Existing username');
    });

    // Registro mail existente
    it('POST /users/registerUser: registro mail existente', async () => {
        const data = {
            name: 'Usuario3',
            lastname: 'Apellido3',
            username: 'usuario3',
            mail: 'usuario1@example.com',
            number: '666666666',
            password: 'passuser3',
            type: '1'
          };
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty('error', 'Existing email');
    });

    // Registro tipo erroneo
    it('POST /users/registerUser: registro tipo erroneo', async () => {
        const data = {
            name: 'Usuario4',
            lastname: 'Apellido4',
            username: 'usuario4',
            mail: 'usuario4@example.com',
            number: '666666666',
            password: 'passuser4',
            type: '0'
          };
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Incorrect type');
    });

    // Registro sin datos
    it('POST /users/registerUser: registro sin datos', async () => {
        const data = {};
        const res = await request(app)
            .post('/users/registerUser')
            .send(data)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
    });


    // Login correcto

    // Login nombre de usuario no registrado

    // Login contraseña incorrecta

    // Login sin datos


});

/*expect(res.body).toHaveProperty('data');

it('POST /api/endpoint debería recibir un JSON y devolver una respuesta', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30
    };

    const res = await request(app)
      .post('/api/endpoint')
      .send(data) // Envía el JSON en la solicitud
      .set('Accept', 'application/json'); // Asegura que el servidor lo trate como JSON

    // Validaciones de respuesta
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toMatchObject(data); // Verifica que los datos recibidos coincidan
  });*/
