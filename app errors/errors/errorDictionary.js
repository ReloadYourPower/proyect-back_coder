const errorDictionary = {
  PRODUCT_NOT_FOUND: {
    status: 404,
    message: 'Producto no encontrado.'
  },
  CART_EMPTY: {
    status: 400,
    message: 'El carrito está vacío.'
  },
  PRODUCT_ALREADY_IN_CART: {
    status: 400,
    message: 'El producto ya está en el carrito.'
  },
  INVALID_PRODUCT_ID: {
    status: 400,
    message: 'ID de producto no válido.'
  },
  VIEW_NOT_LOADED: {
    status: 500,
    message: 'No se pudo cargar la vista.'
  },
  UNKNOWN_ERROR: {
    status: 500,
    message: 'Error desconocido.'
  }
};

module.exports = errorDictionary;
