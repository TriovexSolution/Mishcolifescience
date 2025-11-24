import express from 'express';
import { subscribeUser } from '../controller/subscribeController.js'; 
// import { getFilterProducts, getProductDetails } from '../controllers/productController.js'; // Example existing imports

const router = express.Router();

// Route for the new subscription functionality
router.post('/subscribe', subscribeUser);

// Example of existing routes:
// router.get('/products/filter', getFilterProducts);
// router.get('/products/:id', getProductDetails);

export default router;