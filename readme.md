Creado por Ander

 Proyecto de Backend y Frontend con Node.js, MySQL y React

- Este proyecto consiste en un backend desarrollado con Node.js y MySQL, siguiendo la estructura proporcionada por el código de bezkoder/node-js-jwt-auth. Además, se ha implementado un frontend en React que se conecta al backend y realiza diversas funcionalidades como registro, inicio de sesión y acceso a recursos protegidos según el rol del usuario. El backend está en el puerto 8080-


- Ejecutar el frontend en el puerto 8081:
El frontend proporciona una interfaz para que los usuarios se registren en la aplicación. Al acceder a la ruta de registro, los usuarios pueden completar un formulario con sus datos y crear una cuenta.

- Inicio de Sesión
Los usuarios registrados pueden iniciar sesión a través de la interfaz de inicio de sesión. Se proporciona un formulario donde los usuarios deben ingresar sus credenciales para acceder a la aplicación.

- Acceso Protegido a Recursos
    - Rol Administrador
    Cuando un usuario con el rol de administrador inicia sesión, se le proporciona acceso a recursos específicos destinados a las funciones administrativas.

    - Rol Moderador
    Los usuarios con el rol de moderador tienen acceso a recursos y funciones específicas diseñadas para sus responsabilidades moderadoras.

    - Acceso Público
    Los usuarios que no han iniciado sesión o no tienen un rol específico tienen acceso a recursos públicos y funcionalidades básicas de la aplicación.

    - Gestión del Estado
    La gestión del estado en el frontend se realiza utilizando el estado local de React y, cuando es necesario, mediante el uso de Context API o bibliotecas de manejo de estado como Redux. Se ha buscado un equilibrio adecuado para garantizar un rendimiento óptimo y una gestión eficiente del estado de la aplicación.

    - Gestión de Rutas
    La gestión de rutas en el frontend se lleva a cabo mediante React Router. Se han definido rutas para cada funcionalidad, como registro, inicio de sesión y acceso a recursos protegidos según el rol del usuario. Esto garantiza una navegación fluida y una experiencia de usuario coherente.

    Problemas ocurridos y solucionados: He hecho un backend con node y mysql en el que he tenido un pequeño problema y a la hora de crear los roles los he tenido que meter directamente en la BD. 
    Aún así lo he solucionado y funciona correctamente