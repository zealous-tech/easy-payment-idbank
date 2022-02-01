const { 
    attachCardTest,
    payOrderTest,
    getOrderStatusTest,
    freezeTest,
    reverseOrderTest,
    depositOrderTest,
    refundOrderTest,
    getBindingsTest,
    removeCardTest
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
refundOrderTest(Gateways,IDBANK,tap);
getBindingsTest(Gateways,IDBANK,tap);
// TODO: After deleting each card, you need to update bindingId
// removeCardTest(Gateways,IDBANK,tap);
