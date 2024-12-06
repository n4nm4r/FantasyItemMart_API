import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword,validatePassword} from '../lib/utility.js';

const router = express.Router();

// Prisma setup
const prisma = new PrismaClient();



// Routes



// User sign up
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  console.log('Request Body:', req.body);

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

  const isValidPassword = validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).send('Password does not meet the required criteria');
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

  res.json({'user' : user.email});
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
  req.session.customer_id = existingUser.customer_id;
  req.session.email = existingUser.email;
  req.session.first_name = existingUser.first_name;
  req.session.last_name = existingUser.last_name;
  console.log({'login session info: ' : req.session});

  // Send response
  res.send({'Login successful': existingUser.email,
              'session username':req.session.first_name
  });
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Successful logout');
});

// Get session
router.get('/getSession', async(req, res) => {

  console.log('Session:', req.session);
  
  
  //verify user is logged in. so verify user is not null
  if(req.session.customer_id){
    res.json({
      'customer_Id': req.session.customer_id,
      'email': req.session.email,
      'first_name': req.session.first_name,
      'last_name': req.session.last_name
    })
    

  }
  else{
    return res.status(401).send('Not logged in');
  }
  
  
});

export default router;
