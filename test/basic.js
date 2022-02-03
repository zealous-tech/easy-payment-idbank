const Gateways = require('easy-payment');
const IDBANK = require('../index').gateway;
const tap = require('tap');

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
} = require('./testFunctions/index');

const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; ++index) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const clientId = 'DNEDSThkJ2G9FxfH9';
const bindingId = 'bed5aad0-e220-4321-ab8c-d068a74ac0ff';

const defaultOrder = {
    orderNumber: `tl${makeId(10)}`,
    currency: '051',
    language: 'hy',
    pageView: 'DESKTOP',
    amount: 100,
    returnUrl: 'http://localhost:4000/api/card/paymentResult',
    description: 'Kerpak - TEST LOCAL',
    clientId: clientId,
    bindingId: bindingId,
    useBinding: true,
}

const run = () => {
    attachCardTest(Gateways, IDBANK, tap, makeId, defaultOrder);
    payOrderTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    getOrderStatusTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    freezeTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    reverseOrderTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    depositOrderTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    refundOrderTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    getBindingsTest(Gateways,IDBANK,tap,makeId,defaultOrder);
    // Note: After deleting each card, you need to update bindingId
    removeCardTest(Gateways,IDBANK,tap,makeId,defaultOrder);
};

run();