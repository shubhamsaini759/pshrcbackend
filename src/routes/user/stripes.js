const express = require('express')
const router = express.Router();

require("dotenv").config()
const stripe = require('stripe')(process.env.Secret_key)

// const Secret_key = 'sk_test_51OJWDGSB3BgK4PZ1PR26iL4nA0w8jGrmYrlXzmVEBlz3nSvrMoZILQ8ZeKeoYhXuzCj8MhZObRaKhgtQpjX7BQl600EUMArFFD'

// const stripe = Stripe(Secret_key)

router.post('/create-checkout-session', async (req, res) => {
  try{

    const session = await stripe.checkout.sessions.create({
      payment_method_types : ["card"],
      mode : "payment",
      line_items: [
        {
          price_data: {
            currency : 'inr',
            product_data : {
                name : 'T-Shirt'
            },
            unit_amount : 2 * 100,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.send("success").json({id: session.id})
    // res.send({url : session.url});

  }catch(err){
    console.log(err)
  }
    
  });




// router.get('/create-checkout-session', async (req, res) => {
//     try{
//          res.send("hello")
//     }catch(err){
//         console.log(err)
//     }
// })


  
  module.exports = router