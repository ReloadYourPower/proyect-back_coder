# Proyecto Backend - E-Commerce

## Estructura de Archivos

```plaintext
e-comerce/
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── daos/
│   │   ├── CartDAO.js
│   │   ├── ProductDAO.js
│   │   ├── TicketDAO.js
│   │   └── UserDAO.js
│   ├── dtos/
│   │   └── UserDTO.js
│   ├── factories/
│   │   └── DAOFactory.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   ├── Ticket.js
│   │   └── User.js
│   ├── repositories/
│   │   ├── CartRepository.js
│   │   ├── ProductRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   ├── productService.js
│   │   └── ticketService.js
│   ├── utils/
│   │   ├── errorUtils.js
│   │   ├── logger.js
│   │   └── mailer.js
│   ├── .env
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── server.js
│   └── README.md
└── package.json

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

