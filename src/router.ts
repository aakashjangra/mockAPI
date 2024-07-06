import{ Router} from 'express'
import { productModel } from './db/db';
const router = Router();

//all products
router.get('/products', async (req, res) => {
  
  const products = await productModel.find({});

  res.json({products});
})

router.get('/product/:id', async (req, res) => {
   const id = req.params.id;

  if(!id.trim()){
    res.status(401).json({err: "Invalid id!"});
    return;
  }
  
  const product = await productModel.findOne({
    id: req.params.id
  })

  if(!product){
    res.status(401).json({err: "Product with the given id doesn't exist!"});
    return;
  }

  res.json({product});
});

router.post('/product', async (req, res) => {
  const {name, description, price, thumbnails, rating} = req.body;

  if(!name || !price){
    res.status(401);
    console.log(name, price )
    res.json({err: 'Name and price are required!'});
    return;
  }

  const product = await productModel.create({
    name, 
    price,
    description, 
    rating,
    thumbnails
  })

  res.json({product});
});

router.put('/product/:id', async (req, res) => {
  
  const id = req.params.id;

  if(!id.trim()){
    res.status(401).json({err: "Invalid id!"});
    return;
  }
  
  const product = await productModel.findOne({
    id: req.params.id
  })

  if(!product){
    res.status(401).json({err: "Product with the given id doesn't exist!"});
    return;
  }

  const {name, description, price, thumbnails, rating} = req.body;

  if(name){
    product.name = name;
  }

  if(description){
    product.description = description;
  }

  if(price){
    product.price = price;
  }

  if(rating){
    product.rating = rating;
  }

  if(thumbnails){
    product.thumbnails = thumbnails;
  }

  await product.validate();
  //updating with the new properties
  await product.save();

  res.json({product});
});

router.delete('/product/:id', async (req, res) => {
  const id = req.params.id;

  console.log('id is - ', id)

  if(!id.trim()){
    res.status(401).json({err: 'Invalid id!'});
    return;
  }

 const product = await productModel.findOne({
    id
  })

  if(!product){
    res.status(401).json({err: "Product with the given id doesn't exist!"});
    return;
  }

  await product.deleteOne();

  res.json({message: 'Product deleted successfully!'})
});

export default router;