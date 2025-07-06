import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../server.js';
import User from '../../models/userModel.js';

let response;

Given('que un visitante accede a la página de registro', function () {
  // Simula acceso (no necesario para backend)
});

When('ingresa su nombre, correo electrónico, fecha de nacimiento y contraseña válidos', async function () {
  response = await request(app)
    .post('/api/users/register')
    .send({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'nuevo@correo.com',
      password: '12345678',
    });
});

When("presiona el botón de registro", async function () {
  response = await request(app)
    .post("/api/users/register")
    .send(this.newUser); // this.newUser debe tener los datos correctos
});

Then('el sistema debe crear su cuenta', function () {
  expect(response.status).to.equal(201);
});

Then('mostrar un mensaje de éxito', function () {
  expect(response.body).to.have.property('email', 'nuevo@correo.com');
});

Given('ya existe un usuario con el correo {string}', async function (email) {
  await User.deleteOne({ email }); // Limpieza previa por si ya existía
  await User.create({
    firstName: 'Existente',
    lastName: 'Usuario',
    email,
    password: 'hashedpassword', // En pruebas puedes omitir hash real
    role: 'captain',
  });
});

When('otro visitante intenta registrarse con ese mismo correo', async function () {
  response = await request(app)
    .post('/api/users/register')
    .send({
      firstName: 'Otro',
      lastName: 'Visitante',
      email: 'usuario@ejemplo.com',
      password: 'otro1234',
    });
});

Then('el sistema debe rechazar el registro', function () {
  expect(response.status).to.equal(400);
});

Then('mostrar un mensaje de error indicando que el correo ya está registrado', function () {
  const message = response.body?.message?.toLowerCase?.() || '';
  expect(message).to.include('correo ya está registrado');
});