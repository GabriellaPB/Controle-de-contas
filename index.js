// conectando banco
console.log('hello backend')

const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())

const knex = require('knex')

const connection = knex({
  client: 'mysql2',
  version: '5.7',
  debug: true,
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'admin',
    password: '@Password8',
    database: 'bills'
  }
});

const q = connection()
  .select('*')
  .from('bills ')
  .then((res) => {
    console.log(res)
    accountsFromDB(res)
  })
  .catch((res) => {
    console.log(res)
  })

app.get('/', function (req, res) {
  res.send('Hello World')
})


function accountsFromDB(contas) {

  //  console.log(contas)

  let parsedAccounts = [];

  for (let conta of contas) {
    if (parsedAccounts[conta.id] === true) {
      parsedAccounts[conta.id] = {}
    }
    parsedAccounts.push(conta)
    //console.log(parsedAccounts)
  }
  //let arrayAccounts = [];
  //
  //Object.keys(parsedAccounts).forEach(index => {
  //  arrayAccounts.push(parsedAccounts[index])
  //});

  //console.log(parsedAccounts)
  return parsedAccounts;

  //console.log(parsedAccounts)
  //return parsedAccounts;
  //return contas;
}

app.get('/bills', async function (request, response) {
  const billsDB = await connection()
    .select('*')
    .from('bills')
  //.then((res) => {
  //  console.log(res)
  //  accountsFromDB(res)
  //
  //})
  //.catch((res) => {
  //  console.log(res)
  //})


  //const parsedAccounts = accountsFromDB(billsDB)

  const parsedAccounts = accountsFromDB(billsDB)
  response.json([parsedAccounts])
})




app.listen(3000,
  function () {
    console.log('Iniciou na porta 3000')
  })