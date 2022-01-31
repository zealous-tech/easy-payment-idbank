const { attachCardTest , payOrderTest} = require('./tests');
const Gateways = require('easy-payment');
const IDBANK = require('../index').gateway;

const tap = require('tap');

const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; ++index) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

attachCardTest(Gateways,IDBANK,tap,makeId);
payOrderTest(Gateways,IDBANK,tap,makeId);