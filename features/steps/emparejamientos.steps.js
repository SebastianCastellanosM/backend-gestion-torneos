import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";
import app from "../../server.js";
import Tournament from "../../models/tournamentModel.js";
import Team from "../../models/teamModel.js";

let response;
let tournamentId;

Given('que el administrador ha creado un torneo con varios equipos registrados', async function () {
  // Crear torneo
  const torneo = await Tournament.create({
    name: "Torneo de prueba",
    category: "Libre",
    format: "eliminacion_directa",
    rules: "Reglas de prueba",
  });
  tournamentId = torneo._id;

  // Crear equipos
  const team1 = await Team.create({ name: "Equipo 1", tournament: tournamentId });
  const team2 = await Team.create({ name: "Equipo 2", tournament: tournamentId });
});

When('selecciona el tipo de formato {string}', async function (formato) {
  // Puedes almacenar el formato para el siguiente paso si es necesario
  this.format = formato;
});

When('presiona el botón de generar emparejamientos', async function () {
  response = await request(app)
    .post(`/api/matches/generate`)
    .send({ tournamentId, format: this.format || "eliminacion_directa" });
});

Then('el sistema debe generar los enfrentamientos según los criterios', function () {
  expect(response.status).to.equal(201);
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then('mostrar la lista de partidos programados', function () {
  const partidos = response.body;
  expect(partidos[0]).to.have.property("teamA");
  expect(partidos[0]).to.have.property("teamB");
});

Given('que no hay equipos inscritos en el torneo', async function () {
  // Crear torneo vacío
  const torneo = await Tournament.create({
    name: "Torneo sin equipos",
    category: "Sub-15",
    format: "liga",
    rules: "Sin reglas",
  });
  tournamentId = torneo._id;
});

When('el administrador intenta generar emparejamientos', async function () {
  response = await request(app)
    .post(`/api/matches/generate`)
    .send({ tournamentId, format: "liga" });
});

Then('el sistema debe mostrar un mensaje de error', function () {
  expect(response.status).to.equal(400);
  expect(response.body.message?.toLowerCase()).to.include("no hay equipos");
});

Then('no debe generar ningún enfrentamiento', function () {
  expect(response.body.matches || []).to.be.undefined;
});
