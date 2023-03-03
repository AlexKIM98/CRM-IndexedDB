(function (){

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    } )

   


    function validarCliente(e){
        e.preventDefault();

        // Leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error')
            return;
        }

        // Crear objeto con la informacion (Object Literal)
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        cliente.id = Date.now(); 

        crearNuevoCliente(cliente);
    }

    
    function crearNuevoCliente(datosCliente){
        const transaction = DB.transaction(['crm'], 'readwrite');
        
        const objectStore = transaction.objectStore('crm');

        objectStore.add(datosCliente);

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error');
        };

        transaction.oncomplete = function(){
            console.log('Cliente agregado');

            imprimirAlerta('Cliente Agregado');

            setTimeout(() => {
                window.location.href = 'index.html';
            },3000);
        }
    }

    

        

})();