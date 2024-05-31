# E-commerce Application

This is an e-commerce application built using Node.js, Express, MongoDB, and Handlebars. The application includes features such as user authentication, product listing, shopping cart, and checkout.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/e-commerce.git

/ecommerce-app
│
├── /backend
│   ├── /config
│   │   ├── db.js
│   │   ├── passport.js
│   │   └── config.js
│   │
│   ├── /controllers
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── viewController.js
│   │   └── paymentController.js
│   │
│   ├── /dao
│   │   ├── /implementations
│   │   │   ├── productDAO.js
│   │   │   ├── userDAO.js
│   │   │   ├── cartDAO.js
│   │   │   └── paymentDAO.js
│   │   └── /interfaces
│   │       ├── IProductDAO.js
│   │       ├── IUserDAO.js
│   │       ├── ICartDAO.js
│   │       └── IPaymentDAO.js
│   │
│   ├── /middlewares
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── /models
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Payment.js
│   │
│   ├── /routes
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── viewRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── /services
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   ├── productService.js
│   │   ├── userService.js
│   │   ├── viewService.js
│   │   └── paymentService.js
│   │
│   ├── /views
│   │   ├── layouts
│   │   │   └── main.handlebars
│   │   ├── partials
│   │   │   ├── header.handlebars
│   │   │   └── footer.handlebars
│   │   ├── error404.handlebars
│   │   ├── error401.handlebars
│   │   ├── home.handlebars
│   │   ├── login.handlebars
│   │   ├── register.handlebars
│   │   ├── profile.handlebars
│   │   ├── products.handlebars
│   │   ├── addProduct.handlebars
│   │   ├── cart.handlebars
│   │   ├── payment.handlebars
│   │   └── mail.handlebars
│   │
│   ├── app.js
│   ├── package.json
│   └── README.md
