const { 
    attachCardTest,
    payOrderTest,
    getOrderStatusTest,
    freezeTest,
    reverseOrderTest,
    depositOrderTest
} = require('./tests');
const Gateways = require('easy-payment');
const IDBANK = require('../index').gateway;

const tap = require('tap');

attachCardTest(Gateways,IDBANK,tap);
payOrderTest(Gateways,IDBANK,tap);
getOrderStatusTest(Gateways,IDBANK,tap);
freezeTest(Gateways,IDBANK,tap);
reverseOrderTest(Gateways,IDBANK,tap);
depositOrderTest(Gateways,IDBANK,tap);
