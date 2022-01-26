const Gateways = require('easy-payment');
const IDBANK = require('../index').gateway;

const tap = require('tap');
const CONSTANTS = require('./constants')

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
const bindingId = '18c22df4-12f0-4d3d-a79c-e5f0be1fbcff';
const bindingId2 = '18c22df4-12f0-4d3d-a79c-e5f0be1fbcff';

tap.test('Attach Card', async (tap) => {
    const settings = {
        USER_NAME_API: '14531737_api',
        PASSWORD_API: 'ker1Vanadzor1pak1',
        USER_NAME_API_BINDING: '14531737_binding',
        PASSWORD_API_BINDING: 'ker1Vanadzor1pak1',
        TEST_MODE: false
    };

    const defaultOrder = {
        orderNumber: `tl${makeId(10)}`,
        currency: '051',
        language: 'hy',
        pageView: 'DESKTOP',
        amount: 100,
        returnUrl: 'http://localhost:4000/api/card/paymentResult',
        description: 'Kerpak - TEST LOCAL',
        clientId: clientId,
    }

    tap.test('Testing without settings fields', async (tap) => {
        const newSettings = {...settings};
        newSettings.PASSWORD_API = null;
        let client;
        try {
            client = Gateways.create(IDBANK, newSettings);
        } catch(err) {
            tap.plan(2);
            tap.equal(err.name, CONSTANTS.SETTINGS.NAME, 'Error name is equal');
            tap.equal(err.message, CONSTANTS.SETTINGS.MESSAGE[1], 'Error message is equal');
        }
        tap.end();
    });

    tap.test('Testing timeout', async (tap) => {
        const newSettings = {...settings, TIMEOUT: 10};
        const client = Gateways.create(IDBANK, newSettings);
        const order = { ...defaultOrder };
        const res = await client.attachCard(order);

        tap.plan(2);
        tap.ok(res.hasError, 'Error is a true');
        tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, 'Error message is equal');
        tap.end();
    });

    tap.test('Testing without amount', async (tap) => {
        const client = Gateways.create(IDBANK, settings);
        const order = { ...defaultOrder };
        order.amount = null;
        const res = await client.attachCard(order);

        tap.plan(3);
        tap.ok(res.data.error, 'Error is a true');
        tap.equal(res.data.errorCode, CONSTANTS.AMOUNT_INVALID.ERROR_CODE, 'Error code is equal');
        tap.equal(res.data.errorMessage, CONSTANTS.AMOUNT_INVALID.MESSAGE, 'Error message is equal');
        tap.end();
    });

    tap.test('Testing without orderId', async (tap) => {
        const client = Gateways.create(IDBANK, settings);
        const order = { ...defaultOrder };
        order.orderNumber = null;
        const res = await client.attachCard(order);

        tap.plan(3);
        tap.ok(res.data.error, 'Error is a true');
        tap.equal(res.data.errorCode, CONSTANTS.ORDER_NUMBER.ERROR_CODE, 'Error code is equal');
        tap.equal(res.data.errorMessage, CONSTANTS.ORDER_NUMBER.MESSAGE, 'Error message is equal');
        tap.end();
    });

    tap.test('Testing without language', async (tap) => {
        const client = Gateways.create(IDBANK, settings);
        const order = { ...defaultOrder };
        order.language = null;
        const res = await client.attachCard(order);

        tap.plan(3);
        tap.ok(res.data.error, 'Error is a true');
        tap.equal(res.data.errorCode, CONSTANTS.LANGUAGE_INVALID.ERROR_CODE, 'Error code is equal');
        tap.equal(res.data.errorMessage, CONSTANTS.LANGUAGE_INVALID.MESSAGE, 'Error message is equal');
        tap.end();
    });

});