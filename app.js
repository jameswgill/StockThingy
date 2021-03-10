const express = require('express');
const routes = require('./routes/index');


const app = express();
app.use("/media", express.static(__dirname + '/media'));

app.use('/', routes);


module.exports = app;


var yahooFinance = require('yahoo-finance');

async function getAusADR() {

    var AUDUSDquote = await yahooFinance.quote({
        symbol: "AUDUSD=X",
        module: 'price', // see the docs for the full list
    }, function (err, quotes) {

    });

    var AUDUSDprice = AUDUSDquote["price"]["regularMarketPrice"]


    var AusADR = await yahooFinance.quote({
        symbols: ['CMWAY', 'WBK', 'ANZBY', 'NABZY'],
        module: 'price', // see the docs for the full list
    }, function (err, quotes) {


    });


    var ticketPrices = {
        'time': AusADR[Object.keys(AusADR)[0]].price.regularMarketTime.toLocaleString(),
        'CMWAY': (AusADR["CMWAY"].price.regularMarketPrice / AUDUSDprice).toFixed(2),
        'WBK': (AusADR["WBK"].price.regularMarketPrice / AUDUSDprice).toFixed(2),
        'ANZBY': (AusADR["ANZBY"].price.regularMarketPrice / AUDUSDprice).toFixed(2),
        'NABZY': (AusADR["NABZY"].price.regularMarketPrice * 2 / AUDUSDprice).toFixed(2),
    }


    return ticketPrices
}

async function getAusTickets() {

    var AusTickets = await yahooFinance.quote({
        symbols: ['CBA.AX', 'WBC.AX', 'ANZ.AX', 'NAB.AX'],
        module: 'price', // see the docs for the full list
    }, function (err, quotes) {

    })


    var ticketPrices = {
        'time': AusTickets[Object.keys(AusTickets)[0]].price.regularMarketTime.toLocaleString(),
        'CBA': AusTickets["CBA.AX"].price.regularMarketPrice.toFixed(2),
        'WBC': AusTickets["WBC.AX"].price.regularMarketPrice.toFixed(2),
        'ANZ': AusTickets["ANZ.AX"].price.regularMarketPrice.toFixed(2),
        'NAB': AusTickets["NAB.AX"].price.regularMarketPrice.toFixed(2)
    }

    return ticketPrices

}


async function comboTickers() {

    console.log(AusTickets)
}


app.get('/prices', async function(req,res){
    
    var AusADR = await getAusADR()

    var AusTickets = await getAusTickets()

    var response = {
        ausADR: AusADR,
        ausTickets: AusTickets
    }

    return res.send(JSON.stringify(response))


})