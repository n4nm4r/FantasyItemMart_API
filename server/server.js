import express from 'express';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routes/users.js';
import productRouter from './routes/products.js';

const port =process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//React client app  make the dist folder public, create a dist folder
//app.use(express.static('../client/dist'));


//cors middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}
));


// express-session middleware
app.use(session({
  secret: 'fkldjbhkjkjhhkiu3$$sdg89F',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    secure: false,  // Set to `true` if using HTTPS in production
    sameSite: 'lax',  // Consider 'none' if client and server are on different origins
    maxAge: 3600000 // 1 hour in milliseconds
  }
}))


app.use('/api/users',userRouter);
app.use('/api/products',productRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });