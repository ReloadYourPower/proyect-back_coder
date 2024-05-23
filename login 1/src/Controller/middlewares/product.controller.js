const Product = require('../../DAO/models/product');

const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        res.redirect('/profile'); // Redirigir a la lista de productos después de agregar uno nuevo
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, minPrice, maxPrice, search } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const query = {};
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.paginate(query, options);
        console.log("Products fetched:", products.docs); // Log products to see if they are being fetched
        // Verificar si cada producto tiene las propiedades necesarias
        const sanitizedProducts = products.docs.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price
        }));

        res.render('profile', {
            title: 'My profile',
            products: sanitizedProducts,
            page: products.page,
            totalPages: products.totalPages,
            searchValue: search, // Pasar el valor de búsqueda para que se mantenga en la vista
            minPriceValue: minPrice, // Pasar los valores mínimos y máximos de precios para que se mantengan en la vista
            maxPriceValue: maxPrice
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { addProduct, getProducts };
