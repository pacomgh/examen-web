<?php

function getEmpleados() {
     include 'bd.php';
     try{
          return $conn->query("SELECT id, nombre, apellidos, domicilio, sueldoSemanal, fechaIngreso FROM empleado");
     } catch(Exception $e) {
          echo "Error!!" . $e->getMessage() . "<br>";
          return false;
     }
}

// Obtiene un contacto toma un id.

function getEmpleado($id) {
     include 'bd.php';
     try{
          return $conn->query("SELECT id, nombre, apellidos, domicilio, sueldoSemanal, fechaIngreso FROM empleado WHERE id = $id");
     } catch(Exception $e) {
          echo "Error!!" . $e->getMessage() . "<br>";
          return false;
     }
}
