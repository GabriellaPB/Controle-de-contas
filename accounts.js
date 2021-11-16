//console.log('hello world')


function initAjax(callbackfn) {

  $.ajax({
    url: 'http://localhost:3000/bills',

    success: (resultdb) => {

      callbackfn(resultdb)
    },

    error: (error) => {
      alert('Erro, algo deu errado no nosso servidor')
      console.log(error)
    }
  })

}

let tableBills = document.getElementById('bills')

const configuration = {
  headers: [
    'Conta',
    'Valor',
    'Data de vencimento',
    'Data de pagamento',
  ],
  columns: [
    'nome',
    'valor',
    'vencimento',
    'pagamento'
  ]

}

function creatHeader() {

  let theadBills = document.createElement('thead')
  let tr = document.createElement('tr')


  for (let header of configuration.headers) {
    if (configuration.headers) {
      let th = document.createElement('th')
      th.innerHTML = header
      tr.appendChild(th)
    }
  }
  tableBills.appendChild(theadBills)
  theadBills.appendChild(tr)
}



function creatTd(value) {
  let tdConta = document.createElement('td')
  tdConta.innerHTML = value

  //tr.appendChild(tdConta)
  return tdConta;
}





function creatTDS(conta) {
  return [creatTd(conta.conta),
  creatTd(conta.valor),
  creatTd(conta.data_vencimento),
  creatTd(conta.data_pagamento)
  ];
}

function creatTr(tds) {

  let trbody = document.createElement('tr')
  for (let td of tds) {
    trbody.appendChild(td)
    console.log(td)
  }

  return trbody;
}


function creatCounts(contas) {
  let tbody = document.createElement('tbody')
  for (let conta of contas) {
    let tds = creatTDS(conta)

    let tr = creatTr(tds)
    //creatTd(conta.conta, trbody)
    //creatTd(conta.valor)
    //creatTd(conta.data_vencimento)
    //creatTd(conta.data_pagamento)
    tbody.appendChild(tr)
  }
  tableBills.appendChild(tbody)
}

function dataDB(textarray) {

  for (let contas of textarray) {
    creatCounts(contas)
  }
}

creatHeader()
//creatTr(tds)

initAjax(dataDB)



