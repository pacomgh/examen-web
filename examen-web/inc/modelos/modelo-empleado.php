<?php

if($_POST['accion'] == 'crear'){
     // creará un nuevo registro en la base de datos

     require_once('../funciones/bd.php');

     // Validar las entradas
     $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
     $apellidos = filter_var($_POST['apellidos'], FILTER_SANITIZE_STRING);
     $domicilio = filter_var($_POST['domicilio'], FILTER_SANITIZE_STRING);
     $sueldo = filter_var($_POST['sueldo'], FILTER_SANITIZE_STRING);
     $fecha = preg_replace("([^0-9/])", "", $_POST['date']);

     try {
          $stmt = $conn->prepare("INSERT INTO empleado (nombre, apellidos, domicilio, sueldoSemanal, fechaIngreso) VALUES (?, ?, ?, ?, ?)");
          $stmt->bind_param("sssds", $nombre, $apellidos, $domicilio, $sueldo, $fecha);
          $stmt->execute();
          if($stmt->affected_rows == 1) {
               $respuesta = array(
                    'respuesta' => 'correcto',
                    'datos' => array(
                         'nombre' => $nombre,
                         'apellidos' => $apellidos,
                         'domicilio' => $domicilio,
                         'sueldo' => $sueldo,
                         'fecha' => $fecha,
                         'id_insertado' => $stmt->insert_id
                    )
               );
          }
          $stmt->close();
          $conn->close();
     } catch(Exception $e) {
          $respuesta = array(
               'error' => $e->getMessage()
          );
     }

     echo json_encode($respuesta);
}

if($_GET['accion'] == 'borrar') {
     require_once('../funciones/bd.php');

     $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

     try {
          $stmt = $conn->prepare("DELETE FROM empleado WHERE id = ? ");
          $stmt->bind_param("i", $id);
          $stmt->execute();
          if($stmt->affected_rows == 1) {
               $respuesta = array(
                    'respuesta' => 'correcto'
               );
          }
          $stmt->close();
          $conn->close();
     } catch(Exception $e){
          $respuesta = array(
               'error' => $e->getMessage()
          );
     }
     echo json_encode($respuesta);
}

if($_POST['accion'] == 'editar') {
     // echo json_encode($_POST);

     require_once('../funciones/bd.php');

     // Validar las entradas
     $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
     $apellidos = filter_var($_POST['apellidos'], FILTER_SANITIZE_STRING);
     $domicilio = filter_var($_POST['domicilio'], FILTER_SANITIZE_STRING);
     $sueldo = filter_var($_POST['sueldo'], FILTER_SANITIZE_NUMBER_FLOAT);
     $fecha = filter_var($_POST['fecha'], FILTER_SANITIZE_STRING);
     //$fecha = preg_replace("([^0-9/])", "", $_POST['date']);
     $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

     try{
          $stmt = $conn->prepare("UPDATE empleado SET nombre = ?, apellidos = ?, domicilio = ?, sueldoSemanal = ?, fechaIngreso = ? WHERE id = ?");
          $stmt->bind_param("sssdsi", $nombre,  $apellidos,  $domicilio, $sueldo, $fecha, $id);
          $stmt->execute();
          if($stmt->affected_rows == 1){
               $respuesta = array(
                    'respuesta' => 'correcto'
               );
          } else {
               $respuesta = array(
                    'respuesta' => 'error'
               );
          }
          $stmt->close();
          $conn->close();
     } catch(Exception $e){
          $respuesta = array(
               'error' => $e->getMessage()
          );
     }
     echo json_encode($respuesta);
}
