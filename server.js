const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const path = require('path')
const port = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//
const app = express()
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// at heroku production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.json(__dirname, 'client/build', 'index.html'))
  })
}

// process payments
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  }

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    }
    res.status(200).send({ success: stripeRes })
  })
})

//
app.listen(port, (error) => {
  if (error) throw error
  console.log('Server is running on port ' + port)
})
