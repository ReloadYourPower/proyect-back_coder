const express = require('express');
const router = express.Router();

// Endpoint para obtener productos mockeados en formato JSON
router.get('/', (req, res) => {
  res.json(req.mockedProducts);
});

module.exports = router;
