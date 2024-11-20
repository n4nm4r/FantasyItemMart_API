import express from 'express';

import { PrismaClient } from '@prisma/client';

const router =express.Router();
//notes




  //prisma setup
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
    





//get all prducts
router.get('/all', async (req, res)=>{
  const products = await prisma.product.findMany();

  res.json(products);
});



//get products by ID
router.get('/:id', async (req, res)=>{
const id = req.params.product_id

//Validate ID is a number
if (isNaN(id)){
  res.status(400).send('Invalid request id.');
    return;
}
const product = await prisma.product.findUnique({
  Where:{
    product_id: parseInt(product_id),
  },
});

if (product){
  res.json(copic);
}else{
  res.status(404).send('Product not found.')
}

//
});




///get purchase
router.get('/purchase',(req,res)=>{
res.send('Purchase');
});


export default router;