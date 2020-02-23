const formularioEmpleado = document.querySelector('#empleado'),
    listadoEmpleados = document.querySelector('#listado-empleados tbody'),
    inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecuta
    formularioEmpleado.addEventListener('submit', leerFormulario);

    // Listener para eliminar el boton
    if (listadoEmpleados) {
        listadoEmpleados.addEventListener('click', eliminarEmpleado);
    }

    // buscador
    inputBuscador.addEventListener('input', buscarEmpleados);

    numeroEmpleados();
}

function leerFormulario(e) {
    e.preventDefault();

    // Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        apellidos = document.querySelector('#apellidos').value,
        domicilio = document.querySelector('#domicilio').value,
        sueldo = document.querySelector('#sueldo').value,
        fecha = document.querySelector('#fecha').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || apellidos === '' || domicilio === '' || sueldo === '' || fecha === '') {
        // 2 parametros: texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
    } else {
        // Pasa la validación, crear llamado a Ajax
        const infoEmpleado = new FormData();
        infoEmpleado.append('nombre', nombre);
        infoEmpleado.append('apellidos', apellidos);
        infoEmpleado.append('domicilio', domicilio);
        infoEmpleado.append('sueldo', sueldo);
        infoEmpleado.append('fecha', fecha);
        infoEmpleado.append('accion', accion);
        if (accion === 'crear') {
            // crearemos un nuevo empleado
            insertarBD(infoEmpleado);
        } else {
            // editar el empleado
            // leer el Id
            const idRegistro = document.querySelector('#id').value;
            infoEmpleado.append('id', idRegistro);
            actualizarRegistro(infoEmpleado);
        }
    }
}
/** Inserta en la base de datos via Ajax */
function insertarBD(datos) {
    // llamado a ajax

    // crear el objeto
    const xhr = new XMLHttpRequest();

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-empleado.php', true);

    // pasar los datos
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            // leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);

            // Inserta un nuevo elemento a la tabla
            const nuevoEmpleado = document.createElement('tr');

            nuevoEmpleado.innerHTML = `
                    <td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.apellidos}</td>
                    <td>${respuesta.datos.domicilio}</td>
                    <td>${respuesta.datos.sueldo}</td>
                    <td>${respuesta.datos.fecha}</td>
               `;

            // crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            // crear el icono de Editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            // crea el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            // agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            // crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            // crear el boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            // agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            // Agregarlo al tr
            nuevoEmpleado.appendChild(contenedorAcciones);

            // agregarlo con los contactos
            listadoEmpleados.appendChild(nuevoEmpleado);

            // Resetear el formulario
            document.querySelector('form').reset();

            // Mostrar la notificacion
            mostrarNotificacion('Empleado Creado Correctamente', 'correcto');

            // Actualizar el número
            numeroEmpleados();
        }
    }

    // enviar los datos
    xhr.send(datos)
}

function actualizarRegistro(datos) {
    // crear el objeto
    const xhr = new XMLHttpRequest();

    // abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-empleado.php', true);

    // leer la respuesta
    xhr.onload = function() {
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            if (respuesta.respuesta === 'correcto') {
                // mostrar notificación de Correcto
                mostrarNotificacion('Empleado Editado Correctamente', 'correcto');
            } else {
                // hubo un error
                mostrarNotificacion('Hubo un error...', 'error');
            }
            // Después de 3 segundos redireccionar
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }
    }

    // enviar la petición
    xhr.send(datos);
}
// Eliminar el Contacto
function eliminarEmpleado(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // tomar el ID
        const id = e.target.parentElement.getAttribute('data-id');

        // console.log(id);
        // preguntar al usuario
        const respuesta = confirm('¿Estás Seguro (a) ?');

        if (respuesta) {
            // llamado a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            // abrir la conexión
            xhr.open('GET', `inc/modelos/modelo-empleado.php?id=${id}&accion=borrar`, true);

            // leer la respuesta
            xhr.onload = function() {
                if (this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta == 'correcto') {
                        // Eliminar el registro del DOM
                        console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();

                        // mostrar Notificación
                        mostrarNotificacion('Empleado eliminado', 'correcto');

                        // Actualizar el número
                        numeroEmpleados();
                    } else {
                        // Mostramos una notificacion
                        mostrarNotificacion('Hubo un error...', 'error');
                    }

                }
            }

            // enviar la petición
            xhr.send();
        }
    }
}

// Notifación en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // formulario
    formularioEmpleado.insertBefore(notificacion, document.querySelector('form legend'));

    // Ocultar y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500)
        }, 3000);
    }, 100);

}

/** Buscador de registros */
function buscarEmpleados(e) {
    const expresion = new RegExp(e.target.value, "i");
    registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';

        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }
        numeroEmpleados();
    })
}

/** Muestra el número de Contactos */
function numeroEmpleados() {
    const totalEmpleados = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-empleados span');

    let total = 0;

    totalEmpleados.forEach(empleado => {
        if (empleado.style.display === '' || empleado.style.display === 'table-row') {
            total++;
        }
    });

    // console.log(total);
    contenedorNumero.textContent = total;
}