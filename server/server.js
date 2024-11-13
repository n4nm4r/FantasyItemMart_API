import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.js';
import productRouter from './routes/products.js';

const port =process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//React client app  make the dist folder public, create a dist folder
//app.use(express.static('../client/dist'));
app.use(cors());


app.use('/api/users',userRouter);
app.use('/api/products',productRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });