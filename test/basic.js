const { 
    attachCardTest,
    payOrderTest,
    getOrderStatusTest
} = require('./tests');
const Gateways = require('easy-payment');
const IDBANK = require('../index').gateway;

const tap = require('tap');

attachCardTest(Gateways,IDBANK,tap);
payOrderTest(Gateways,IDBANK,tap);
getOrderStatusTest(Gateways,IDBANK,tap);
