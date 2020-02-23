<div class="campos">
    <fieldset>
          <legend>Informacion del Empleado</legend>
     <div class="campo">
          <label for="nombre">Nombre:</label>
          <input 
               type="text" 
               placeholder="Nombre Empleado" 
               id="nombre"
               value="<?php echo ($empleado['nombre']) ? $empleado['nombre'] : '';  ?>"
          >
     </div>
     <div class="campo">
          <label for="apellidos">Apellidos:</label>
          <input 
               type="text" 
               placeholder="Apellidos Empleado" 
               id="apellidos"
               value="<?php echo ($empleado['apellidos']) ? $empleado['apellidos'] : '';  ?>"
          >
     </div>
     <div class="campo">
          <label for="domicilio">Domicilio:</label>
          <input 
               type="text" 
               placeholder="Domicilio empleado" 
               id="domicilio"
               value="<?php echo ($empleado['domicilio']) ? $empleado['domicilio'] : '';  ?>"
          >
     </div>
     <div class="campo">
          <label for="sueldo">Sueldo:</label>
          <input 
               type="number" 
               placeholder="Sueldo empleado" 
               id="sueldo"
               min="0"
               value="<?php echo ($empleado['sueldo']) ? $empleado['sueldo'] : '';  ?>"
          >
     </div> 
     <div class="campo">
          <label for="fecha">Fecha Ingreso:</label>
          <input 
               type="date" 
               placeholder="Fecha ingreso" 
               id="fecha"
               min="0"
               value="<?php echo ($empleado['fecha']) ? $empleado['fecha'] : '';  ?>"
          >
     </div>  
    </fieldset>  
</div>

<div class="campo enviar">
     <?php
          $textoBtn = ($empleado['fecha']) ? 'Guardar' : 'Añadir';
          $accion = ($empleado['fecha']) ? 'editar' : 'crear';
     ?>
     <input type="hidden" id="accion" value="<?php echo $accion; ?>">
     <?php if( isset( $empleado['id'] )) { ?>
          <input type="hidden" id="id" value="<?php echo $empleado['id']; ?>">
     <?php } ?>
     <input type="submit" value="<?php echo $textoBtn; ?>">
</div>
<!--
<div class="campo enviar">
  <input type="hidden" id="accion" value="crear">
  <input type="submit" value="Añadir">
</div>
-->