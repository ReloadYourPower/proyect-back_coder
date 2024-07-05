
proyect-back_coder/
│
├── e-comerce/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js          # Configuración de variables de entorno
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── productController.js
│   │   ├── daos/
│   │   │   ├── ProductDAO.js
│   │   │   └── UserDAO.js
│   │   ├── dtos/
│   │   │   └── UserDTO.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js  # Middleware de autorización
│   │   │   └── errorMiddleware.js # Middleware de manejo de errores
│   │   ├── models/
│   │   │   ├── Ticket.js
│   │   │   └── User.js
│   │   ├── repositories/
│   │   │   ├── ProductRepository.js
│   │   │   └── UserRepository.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── services/
│   │   │   ├── emailService.js    # Servicio para envío de correos
│   │   │   └── ticketService.js
│   │   ├── utils/
│   │   │   ├── logger.js          # Logger para desarrollo y producción
│   │   │   └── mocking.js         # Generador de productos mock
│   │   ├── app.js                 # Archivo principal del servidor
│   │   └── .env                   # Archivo de variables de entorno
│   └── Dockerfile
└── .dockerignore

|-- test
    |-- auth.test.js
    |-- cart.test.js
    |-- ticket.test.js
    |-- utils.test.js
    |-- setup.js (opcional, para configuraciones globales)





Tareas	Realizadas:
<!-- Mover partes importantes y comprometedoras a .env y leerlas en config.js	✔️ -->
<!-- Modificar capa de persistencia con Factory, DAO y DTO	✔️ -->
<!-- Implementar patrón Repository	✔️ -->
Modificar ruta /current para enviar un DTO del usuario	✔️
<!-- Crear middleware de autorización para endpoints	✔️ -->
<!-- Crear modelo Ticket	✔️ -->
Implementar ruta /carts/:cid/purchase	✔️
<!-- Generar módulo de Mocking para 100 productos	✔️ -->
Crear customizador de errores y diccionario de errores comunes	✔️
<!-- Implementar logger para desarrollo y producción	✔️ -->
Implementar sistema de recuperación de contraseña	✔️ se envia el email por /profile/email/test-email
<!-- Establecer rol premium para usuarios	✔️ -->
<!-- Modificar schema de producto para incluir campo owner	✔️ -->
<!-- Modificar permisos de modificación y eliminación de productos	✔️ -->
Implementar nueva ruta /api/users/premium/:uid	✔️
Crear una guía de estructura de archivos actualizada	✔️
<!-- Realizar la configuración necesaria para tener documentado tu proyecto final a partir de Swagger.✔️ -->
Se debe tener documentado el módulo de productos.✔️
Se debe tener documentado el módulo de carrito✔️
<!-- No realizar documentación de sesiones✔️ -->
