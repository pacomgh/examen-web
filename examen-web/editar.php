<?php
     include 'inc/funciones/funciones.php';
     include 'inc/layout/header.php';
     error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_WARNING & ~E_NOTICE);

     $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

     if(!$id) {
          die('No es válido');
     }

     $resultado = getEmpleado($id);
     $empleado = $resultado->fetch_assoc();
?>


<div class="contenedor-barra">
     <div class="contenedor barra">
          <a href="index.php" class="btn volver">Volver</a>
          <h1>Editar Empleado</h1>
     </div>
</div>

<div class="bg-registro contenedor sombra">
     <form id="empleado" action="#">
          <legend>Edite el Empleado</span> </legend>

          <?php include 'inc/layout/formulario.php'; ?>
     </form>
</div>


<?php include 'inc/layout/footer.php'; ?>
