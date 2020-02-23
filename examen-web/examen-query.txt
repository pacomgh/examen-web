CREATE DATABASE empresa

USE empresa

CREATE TABLE empleado
( id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(120),
  domicilio VARCHAR(200),
  sueldoSemanal DOUBLE,
  fechaIngreso DATE
);