import express from 'express';
import { PrismaClient } from '@prisma/client';

const router =express.Router();



// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/'); // save uploaded files in `public/images` folder
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop(); // get file extension
      const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
      cb(null, uniqueFilename);
    }
  });
  const upload = multer({ storage: storage });

  //prisma setup
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
    


router.get('/', (req, res) => {
    res.send('product route');
});

router.get('/all', (req, res)=>{
res.send('all products');
});

router.get('/:id', (req, res)=>{
res.send('Product by Id');
});

router.get('/purchase',(req,res)=>{
res.send('Purchase');
});


export default router;