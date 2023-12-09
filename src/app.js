// const express = require('express')
// const app = express();
// const path = require('path')


// // port
// const PORT = process.env.PORT || 4000

// // cors

// const cors = require('cors')
// app.use(express.json())
// app.use(
//     cors({
//         origin : '*',
//         methods : [ "GET", "POST", "PUT", "PATCH", "DELETE" ]
//     })
// )

// // connect mongoosedb
// require('./db/conn')


// // Calling Routes

//     //admin
//         app.use(require('./routes/admin/User'))

//     //user
//         app.use(require('./routes/user/deceased'))
//         app.use(require('./routes/user/notification'))

//         app.use(require('./routes/user/stripes'))
        

// app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// // listen

// app.get('/',async(req,res)=>{
//     res.send('working...')
// })

// app.listen(PORT,async(req,res)=>{
//     console.log('connected')
// })



// This is your test secret API key.

const stripe = require('stripe')('sk_test_51OJWDGSB3BgK4PZ1PR26iL4nA0w8jGrmYrlXzmVEBlz3nSvrMoZILQ8ZeKeoYhXuzCj8MhZObRaKhgtQpjX7BQl600EUMArFFD');
const express = require('express');
const app = express();
app.use(express.static('public'));

const cors = require('cors')
app.use(express.json())
app.use(
    cors({
        origin : '*',
        methods : [ "GET", "POST", "PUT", "PATCH", "DELETE" ]
    })
)

const YOUR_DOMAIN = 'http://localhost:5173';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: 'Invoice for Product X',
        metadata: {
          order: 'order-xyz',
        },
        account_tax_ids: ['DE123456789'],
        custom_fields: [
          {
            name: 'Purchase Order',
            value: 'PO-XYZ',
          },
        ],
        rendering_options: {
          amount_tax_display: 'include_inclusive_tax',
        },
        footer: 'B2B Inc.',
      },
    },
    line_items: [
      {
        price: 'price_1OKDZWSB3BgK4PZ1douZigKV',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  console.log(session)
  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // console.log(session,"session")
  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.get('/test', async(req, res) =>{
    res.send('success')
})


app.listen(4000, () => console.log('Running on port 4000'));