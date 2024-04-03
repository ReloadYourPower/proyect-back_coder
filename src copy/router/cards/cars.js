const fs = require('fs');
const File = "C:/Users/User/Desktop/portafolio/POO/node/websocket/src copy/cards.json";

class CardsManager {
    constructor() {
        this.filePath = './cards.json';
        this.cards = [1]; // Inicializa como un array vacío si loadCardsFromFile devuelve null o undefined
        this.nextId = this.calculateNextId();
    }
    


    // Método para mostrar el carrito completo
    getCard(cardId) {
        try {
            console.log('Ruta del archivo JSON:', File);
            const data = fs.readFileSync(File, 'utf-8');
            const parsedData = JSON.parse(data);
            console.log("Tipo de parsedData:", typeof parsedData);
            console.log("parsedData:", parsedData);
    
            // Obtener la propiedad ID del objeto cards
            const cartId = parsedData.id;
            console.log(cartId);
            console.log(cardId);
            if (cartId == cardId) {
                console.log("ID del carrito encontrado:", cartId);
                return parsedData; // Devuelve todo el objeto de carrito
            } else {
                throw new Error(`No se encontró ningún carrito con el ID ${cardId}`);
            }
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
            throw error;
        }
    }
    
    
    
    

    // Método para mostrar los productos completos del carrito
  
    getCardProducts(pId) {
        const card = this.getCard(pId);
        return card.products;
    }


    // Método privado para cargar los carritos desde el archivo JSON
    loadCardsFromFile() {
        try {
            console.log('Ruta del archivo JSON:', File);
         const data = fs.readFileSync(File, 'utf-8');
        console.log('Contenido del archivo JSON:', data);
        const parsedData = JSON.parse(data);
        console.log('Datos parseados del archivo JSON:', parsedData);
        return parsedData;
        } catch (error) {
            // Si el archivo no existe, lo creamos con una estructura de datos vacía
            if (error.code === 'ENOENT') {
                console.log('El archivo no existe. Creando un nuevo archivo JSON vacío.');
                this.saveCardsToFile([]);
                return [];
            } else {
                console.error('Error al leer el archivo JSON:', error);
                throw error;
            }
        }
    }
    
    

          // Método privado para calcular el próximo ID disponible
          calculateNextId() {
            let maxId = 0;
            for (const card of this.cards) {
                if (card.id > maxId) {
                    maxId = card.id;
                }
            }
            return maxId + 1;
        }
        
    // Método privado para guardar los carritos en el archivo JSON
    saveCardsToFile(data) {
        const jsonData = JSON.stringify(data, null, 2);
        console.log("Guardando datos en el archivo JSON:", File);
        fs.writeFileSync(File, jsonData);
    }
    
  
    // Método para crear un nuevo carrito
    createCard() {
        if (this.cards.length > 0) {
            throw new Error('Ya existe un carrito creado');
        }

        const newCard = {
            id: this.nextId++,
            products: []
        };

        this.cards.push(newCard);
        this.saveCardsToFile(this.cards); // Guarda los carritos en el archivo JSON
        return newCard;
    }

    // Método para agregar un producto al carrito
    addProductToCard(cardId, productId, quantity) {
        const card = this.getCard(cardId);
        if (!card) {
            throw new Error(`No se encontró ningún carrito con el ID ${cardId}`);
        }
    
        if (!card.products) {
            card.products = []; // Si no hay productos definidos, inicializamos la propiedad
        }
    
        const newProduct = {
            id: productId,
            quantity: quantity
        };
    
        card.products.push(newProduct);
        const data = card;
        console.log("variebles:",cardId,productId,quantity);
        this.saveCardsToFile(data); // Guarda los carritos en el archivo JSON
        return card;
    }
        // Método para eliminar un producto del carrito por su ID
    removeProductFromCard(cardId, productId) {
        const cardIndex = this.cards.findIndex(card => card.id === cardId);
        if (cardIndex === -1) {
            throw new Error(`No se encontró ningún carrito con el ID ${cardId}`);
        }

        const productIndex = this.cards[cardIndex].products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            throw new Error(`No se encontró ningún producto con el ID ${productId} en el carrito`);
        }

        this.cards[cardIndex].products.splice(productIndex, 1);
        this.saveCardsToFile(this.cards); // Guarda los carritos en el archivo JSON
        return this.cards[cardIndex];
    }

    
}

module.exports = CardsManager;
