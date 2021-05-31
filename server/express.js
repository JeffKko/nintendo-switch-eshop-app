const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const axios = require('axios')

app.use(cors({
  origin: [
    'http://192.168.68.109:3000',
    'http://localhost:3000',
  ],
  credentials: true,
}))
app.use(cookieParser())

console.log(express.static(process.cwd() + '/dist'))

console.log(process.cwd())

app.use('/', express.static(process.cwd() + '/dist'))
app.use(express.json()) // parse json

app.get('/test', (req, res) => {
  res.status(200).send('im a test')
})


const regionMap = {
  HK: 'zh',
  US: 'en',
  JP: 'ja',
}

app.get('/rates', function(req, res) {
  res.status(200).json(
    {"HKD":3.560779948128301,"USD":27.635037789469802,"JPY":0.25155912695072574}
  )
  // axios('http://data.fixer.io/api/latest?access_key=92a552f51b509c9cf8aa11a2a2cc8f67&symbols=TWD,HKD,USD,JPY')
  //   .then(({ data }) => {

  //     if (!data.success) Promise.reject('some error')

  //     const {TWD, HKD, USD, JPY} = data.rates

  //     const rates = {
  //       HKD: TWD / HKD,
  //       USD: TWD / USD,
  //       JPY: TWD / JPY,
  //     }

  //     res.status(200).json(rates)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
})

app.get('/sales', function(req, res) {
  axios(`https://ec.nintendo.com/api/${req.query.country}/${regionMap[req.query.country]}/search/sales?count=${req.query.count}&offset=${req.query.offset}`)
    .then(({ data }) => {
      console.log(data)
      res.status(200).json(data)
    })
})

app.get('/price', function(req, res) {
  console.log(req.query.ids)
  axios(`https://api.ec.nintendo.com/v1/price?country=${req.query.country}&lang=${regionMap[req.query.country]}&ids=${req.query.ids}`)
    .then(({ data }) => {
      console.log(data)
      res.status(200).json(data)
    })
})

app.get('/ranking', function(req, res) {
  axios(`https://ec.nintendo.com/api/${req.query.country}/${regionMap[req.query.country]}/search/ranking?count=${req.query.count}&offset=${req.query.offset}`)
    .then(({ data }) => {
      console.log(data)
      res.status(200).json(data)
    })
})

app.get('/new', function(req, res) {
  axios(`https://ec.nintendo.com/api/${req.query.country}/${regionMap[req.query.country]}/search/new?count=${req.query.count}&offset=${req.query.offset}`)
    .then(({ data }) => {
      console.log(data)
      res.status(200).json(data)
    })
})

// app.post('/message', (req, res) => {
//   const message = req.body.message

//   const event = new ChatEvent(message)

//   eventList.push(event)

//   clientList.forEach(s => {
//     console.log(event.id)
//     s.res.write(`id: ${event.id}\ndata: ${JSON.stringify(event)}\n\n`)
//   })

//   res.status(200).end()
// })

module.exports = app
