import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
// Prisma setup
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Get all products
router.get('/all', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const product_id = req.params.id;  // Use 'id' to match the route

  // Validate ID is a number
  if (isNaN(product_id)) {
    return res.status(400).send('Invalid request id.');
  }

  const product = await prisma.product.findUnique({
    where: {
      product_id: parseInt(product_id),
    },
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found.');
  }
});

// Get purchase
router.post('/purchase', async (req, res) => {
  const {
    street,
    city,
    province,
    country,
    postal_code,
    credit_card,
    credit_expire,
    credit_cvv,
    cart,
    invoice_amt,
    invoice_tax,
    invoice_total,
  } = req.body;

  // Validate required fields
  // if (!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire || !credit_cvv || !cart || !invoice_amt || !invoice_tax || !invoice_total) {
  //   return res.status(400).send('Required fields must have a value.');
  // }

  // Session check (uncomment if needed)
  // if (!req.session.customer_id) {
  //   return res.status(401).send('Not logged in. Please log in to make a purchase.');
  // }

  const customer_id = 2; // Temporary assignment
  //const customer_id = req.session.customer_id;

  const purchase = await prisma.purchase.create({
    data: {
      street,
      city,
      province,
      country,
      postal_code,
      credit_card,
      credit_expire,
      credit_cvv,
      cart,
      invoice_amt,
      invoice_tax,
      invoice_total,
      customer_id,
    },
  });
  res.json('Thank you for purchase');

  const cartList = cart.split(',').map(Number);

  const counts = cartList.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const sortedcartList = Object.entries(counts)
    .sort((a, b) => a[0] - b[0])  // Sort by the number
    .map(([num, count]) => `${num}:${count}`);

  console.log(sortedcartList);

  // for (const [num, count] of sortedcartList) {
  //   await prisma.purchaseItem.create({
  //     data: {
  //       purchase_id: purchase.purchase_id,
  //       product_id: parseInt(num),
  //       quantity: count,
  //     },
  //   });
  // }


  // res.json({ message: 'Purchase successful', purchase });
});

export default router;
