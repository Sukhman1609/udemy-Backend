const express=require("express");
const mongoose=require("mongoose")
const searchRoute = require('./Routing/modelrouter');
const categoryRoute = require("./Routing/categories");
const Port=8000;
const app=express()
const stripe=require("stripe")("sk_test_51OE9GCSBTTGVG4VXemPm1dh6k7Pis7d9RW1Qcimnvyo0z2P8AmhCWgQcV1doSH0HbcwddzIdYjeTxoMKxxrIbjDE00IOFSSmgC")
// app.use(express.json())
const cors=require("cors")
// const blog = require("./Routing/blog");
app.use(cors())

const uri = 'mongodb+srv://ersukhmanpreetkaur:ecommerce@cluster0.huz1uyq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use(express.json());


app.use('/api', searchRoute);

app.get('/api/search', (req, res) => {
        
        const searchTerm = req.query.q; 
        res.json({ results: [] }); 
      });
app.use("/api",categoryRoute);

app.post("/api/create-checkout-session",async(req,res)=>{
        const {products}=req.body;
        // console.log(products)
        
        const lineItems = products.map((product)=>({
                price_data:{
                        currency:"inr",
                        product_data:{
                                name:product.name
                        },
                        unit_amount:product.price * 100,
                },
                quantity:product.quantity
        }));

        const frontendUrl = req.get('Referer');
        const successUrl = `${frontendUrl}sucess`;
        const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items:lineItems,
                mode:"payment",
                success_url: successUrl,
                cancel_url:`${frontendUrl}`,
        })
        res.json({id:session.id})
})

app.get('/',(req,res)=>{
        console.log('Homme page')
     res.send('API is running fine')   
})


app.listen(9000,()=>{
        try{
                console.log(`Server is running fine-${Port}`)
        }
        catch(err){
                console.log(`Error occured in the code-${err}`)
        }
})












