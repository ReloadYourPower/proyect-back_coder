# Clase productManager

La clase `productManager` es una herramienta útil para gestionar un inventario de productos en tu aplicación. Permite agregar productos, obtener todos los productos en el inventario, y buscar productos por su ID.

## Uso

Para comenzar a utilizar la clase `productManager`, sigue estos pasos:

1. **Crear una instancia de la clase:**

   ```javascript
   const manager = new productManager('Título', 'Descripción', 10, 100, 'imagen.jpg', 'ABC123');
2. **Utiliza el método addProduct para agregar productos al inventario. Esto generará automáticamente un ID único para cada producto.**
 ```javascript
 manager.addProduct();
 ```

3. **Utiliza el método getProducts para obtener una lista de todos los productos en el inventario.**
```javascript
 const productos = manager.getProducts();
console.log(productos);
 ```
4. **Utiliza el método getProductsById para buscar un producto en el inventario por su ID.**
```javascript
 const producto = manager.getProductsById('ABC123');
console.log(producto);
 ```