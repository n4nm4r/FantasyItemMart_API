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
  


//----------

router.get('/', (req, res) => {
    res.send('user route');
  });
  
router.post('/signup',(req,res)=>{
  res.send('User Signup');
});

router.post('/login',(req,res)=>{
  res.send('User Login');
});

router.post('/logout',(req,res)=>{
  res.send('User Logout');
});

router.post('/getSession',(req,res)=>{
  res.send('User Session');
});

export default router;