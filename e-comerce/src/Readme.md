e-comerce/
├── src/
│   ├── config/                      # Configuraciones de la aplicación
│   │   ├── config.js                # Configuración general
│   │   ├── db.js                    # Configuración de la base de datos
│   │   └── passport.js              # Configuración de Passport (autenticación)
│   │
│   ├── controllers/                 # Controladores de la lógica de negocio
│   │   ├── authController.js        # Controlador de autenticación
│   │   ├── cartControllers.js       # Controladores de carrito de compras
│   │   ├── paymentController.js     # Controlador de pagos
│   │   ├── productController.js     # Controlador de productos
│   │   ├── userController.js        # Controlador de usuarios
│   │   └── viewController.js        # Controlador de vistas
│   │
│   ├── daos/                        # Objetos de acceso a datos (Data Access Objects)
│   │   ├── implementations/         # Implementaciones concretas de DAOs
│   │   │   ├── cartDAO.js           # Implementación del DAO para carrito
│   │   │   ├── paymentDAO.js        # Implementación del DAO para pagos
│   │   │   ├── productDAO.js        # Implementación del DAO para productos
│   │   │   └── userDAO.js           # Implementación del DAO para usuarios
│   │   │
│   │   └── interfaces/              # Interfaces de los DAOs
│   │       ├── ICartDAO.js          # Interfaz para DAO de carrito
│   │       ├── IPaymentDAO.js       # Interfaz para DAO de pagos
│   │       ├── IProductDAO.js       # Interfaz para DAO de productos
│   │       └── IUserDAO.js          # Interfaz para DAO de usuarios
│   │
│   ├── dtos/                        # Objetos de transferencia de datos (Data Transfer Objects)
│   │   └── UserDTO.js               # DTO para usuarios
│   │
│   ├── factories/                   # Fábricas para la creación de objetos
│   │   └── DAOFactory.js            # Fábrica para DAOs
│   │
│   ├── logger/                      # Configuración y uso del logger
│   │   └── logger.js                # Configuración del sistema de logs
│   │
│   ├── middlewares/                 # Middlewares de la aplicación
│   │   ├── authMiddleware.js        # Middleware de autenticación
│   │   ├── errorMiddleware.js       # Middleware de manejo de errores
│   │   ├── roleMiddleware.js        # Middleware de roles de usuario
│   │   └── validationMiddleware.js  # Middleware de validación de datos
│   │
│   ├── models/                      # Modelos de datos (Mongoose Schemas)
│   │   ├── Cart.js                  # Modelo para carrito
│   │   ├── Payment.js               # Modelo para pagos
│   │   ├── Product.js               # Modelo para productos
│   │   ├── Ticket.js                # Modelo para tickets
│   │   └── User.js                  # Modelo para usuarios
│   │
│   ├── repositories/                # Repositorios para el acceso a datos
│   │   └── ProductRepository.js     # Repositorio para productos
│   │
│   ├── routes/                      # Definición de rutas
│   │   ├── swagger/                 # Definiciones Swagger
│   │   │   ├── cartSwa.js           # Definición Swagger para carrito
│   │   │   ├── productSwa.js        # Definición Swagger para productos
│   │   │   └── userSwa.js           # Definición Swagger para usuarios
│   │   │
│   │   ├── authRoutes.js            # Rutas de autenticación
│   │   ├── cartRoutes.js            # Rutas de carrito
│   │   ├── emailRoutes.js           # Rutas de correos electrónicos
│   │   ├── mockingRoutes.js         # Rutas de mockeo (pruebas)
│   │   ├── paymentRoutes.js         # Rutas de pagos
│   │   ├── productRoutes.js         # Rutas de productos
│   │   ├── ticketRoutes.js          # Rutas de tickets
│   │   ├── userRoutes.js            # Rutas de usuarios
│   │   └── viewRoutes.js            # Rutas de vistas
│   │
│   ├── services/                    # Servicios de la aplicación
│   │   ├── authService.js           # Servicio de autenticación
│   │   ├── cartService.js           # Servicio de carrito
│   │   ├── emailService.js          # Servicio de correos electrónicos
│   │   ├── paymentService.js        # Servicio de pagos
│   │   ├── productService.js        # Servicio de productos
│   │   ├── ticketService.js         # Servicio de tickets
│   │   ├── userService.js           # Servicio de usuarios
│   │   └── viewService.js           # Servicio de vistas
│   │
│   ├── swagger/                     # Configuración Swagger
│   │   └── swagger.js               # Configuración Swagger
│   │
│   ├── test/                        # Pruebas unitarias y de integración
│   │   ├── auth.test.mjs            # Pruebas para autenticación
│   │   ├── cart.test.js             # Pruebas para carrito
│   │   ├── ticket.test.mjs          # Pruebas para tickets
│   │   └── utils.test.js            # Pruebas para utilidades
│   │
│   ├── utils/                       # Utilidades diversas
│   │   └── mocking.js               # Utilidades para mockeo (pruebas)
│   │
│   └── views/                       # Vistas de la aplicación
│       ├── layouts/                 # Layouts de vistas
│       │   └── main.handlebars      # Layout principal
│       │
│       ├── viewsUtils/              # Utilidades para vistas
│       │   └── utils.js             # Funciones útiles para vistas
│       │
│       ├── addProduct.handlebars    # Vista para añadir productos
│       ├── admin.handlebars         # Vista de administrador
│       ├── cart.handlebars          # Vista del carrito de compras
│       ├── dashboard.handlebars     # Vista del panel de control
│       ├── DTO.handlebars           # Vista para objetos de transferencia de datos
│       ├── error401.handlebars      # Vista de error 401 (no autorizado)
│       ├── error404.handlebars      # Vista de error 404 (no encontrado)
│       ├── index.handlebars         # Vista de inicio
│       ├── login.handlebars         # Vista de inicio de sesión
│       ├── mail.handlebars          # Vista para correos electrónicos
│       ├── payment.handlebars       # Vista de pagos
│       ├── products.handlebars      # Vista de productos
│       ├── profile.handlebars       # Vista de perfil de usuario
│       ├── register.handlebars      # Vista de registro
│       └── users.handlebars         # Vista de usuarios
│
├── .dockerignore                   # Archivos ignorados por Docker
├── .env                            # Variables de entorno
├── app.js                          # Punto de entrada de la aplicación
├── Dockerfile                      # Archivo de configuración de Docker
├── index.js                        # Archivo de entrada alternativo
├── package-lock.json               # Dependencias exactas del proyecto
├── package.json                    # Metadatos y scripts del proyecto
├── project-structure.txt           # Estructura de archivos del proyecto (generado)
└── README.md                       # Documentación principal del proyecto

Tareas	Realizadas:
<!-- Mover partes importantes y comprometedoras a .env y leerlas en config.js	✔️ -->
<!-- Modificar capa de persistencia con Factory, DAO y DTO	✔️ -->
<!-- Implementar patrón Repository	✔️ -->
<!-- Modificar ruta /current para enviar un DTO del usuario	✔️ -->
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
<!-- Implementar nueva ruta /api/users/premium/:uid	✔️ -->
acomodar desde /users el update and delete de los usuarios desde los botones ✔️
<!-- Crear una guía de estructura de archivos actualizada	✔️ -->
<!-- Realizar la configuración necesaria para tener documentado tu proyecto final a partir de Swagger.✔️ -->
Se debe tener documentado el módulo de productos.✔️
Se debe tener documentado el módulo de carrito✔️
<!-- No realizar documentación de sesiones✔️ -->
<!-- Realizar módulos de testing para tu proyecto principal, utilizando los módulos de mocha + chai + supertest -->
<!-- Se deben incluir por lo menos 3 tests desarrollados para -->
<!-- Router de products.✔️ -->
<!-- Router de carts.✔️ -->
<!-- Router de sessions.✔️ -->
<!-- NO desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing✔️ -->
agregar principio de pasarela de pago restringida✔️
controlador de pasarela de pagos ✔️
web token para los pagos notificado por email ✔️
coneccion e-mail ✔️
encriptado de los datos de pago ✔️


