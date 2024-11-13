import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router =express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/server/public/images/'); // save uploaded files in `public/images` folder
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





//user sign up
router.post('/signup', async(req,res)=>{
  const{email,password, first_name, last_name} = req.body;
  res.send('User Signup');

// Verify inputs not empty
if(!email || !password || !first_name || !last_name) {
  
  res.status(400).send('Required fields must have a value.');
  return;
}

const user = await prisma.customer.create(
  {
    data: {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }
  }
);

res.json(user);

});


//user login
router.post('/login',(req,res)=>{
  res.send('User Login');
});


//user logout
router.post('/logout',(req,res)=>{
  res.send('User Logout');
});


//get session
router.post('/getSession',(req,res)=>{
  res.send('User Session');
});

export default router;