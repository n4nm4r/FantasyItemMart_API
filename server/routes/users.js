import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';

const router = express.Router();

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

// Prisma setup
const prisma = new PrismaClient();

// Routes

router.get('/', (req, res) => {
  res.send('user route');
});

// User sign up
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // Verify inputs are not empty
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).send('Required fields must have a value.');
  }

  // Verify if email is unique
  const existingUser = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Add user to database
  const user = await prisma.customer.create({
    data: {
      email: email,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name,
    },
  });

  res.json({'user' : email});
});

// User login
router.post('/login', async (req, res) => {
  // Get user inputs
  const { email, password } = req.body;

  // Validate the inputs
  if (!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  // Find user in database
  const existingUser = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });
  if (!existingUser) {
    return res.status(404).send('User not found');
  }

  // Compare/verify the password entered
  const passwordMatch = await comparePassword(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid password');
  }

  // Setup user session data
  req.session.email = existingUser.email;
  req.session.customer_id = existingUser.customer_id;
  req.session.name = existingUser.first_name + ' ' + existingUser.last_name;
  console.log('logged in user: ' + req.session.email);

  // Send response
  res.send('Login successful');
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Successful logout');
});

// Get session
router.get('/getSession', (req, res) => {
  // Return values in session for users
  res.json({ 'user': req.session.email });
});

export default router;
