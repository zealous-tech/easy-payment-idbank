const CONSTANTS = require('./constants/constants')

const attachCardTest = (Gateways,IDBANK,tap,makeId) => {
    tap.test('Attach card', async (tap) => {
        const settings = {
            USER_NAME_API: '14531737_api',
            PASSWORD_API: 'ker1Vanadzor1pak1',
            USER_NAME_API_BINDING: '14531737_binding',
            PASSWORD_API_BINDING: 'ker1Vanadzor1pak1',
            TEST_MODE: false
        };

        const clientId = 'DNEDSThkJ2G9FxfH9';
        const bindingId = 'a5c68f48-4d51-4f7a-9c32-0d6a432bce27';
        const bindingId2 = 'a5c68f48-4d51-4f7a-9c32-0d6a432bce27';
    
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
            try {
                const client = Gateways.create(IDBANK, newSettings);
            } catch(err) {
                tap.plan(2);
                tap.equal(err.name, CONSTANTS.SETTINGS.NAME, 'Error name is equal');
                tap.ok(CONSTANTS.SETTINGS.MESSAGE.includes(err.message), 'Error message is equal');
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
            tap.equal(res.err.name, CONSTANTS.ATTACH_CARD.TIMEOUT.MESSAGE, 'Error message is equal');
            tap.end();
        });
    
        tap.test('Testing without amount', async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.amount = null;
            const res = await client.attachCard(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.ATTACH_CARD.AMOUNT_INVALID, 'The response a equivalent strictly')
            tap.end();
        });
    
        tap.test('Testing without orderId', async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = null;
            const res = await client.attachCard(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.ATTACH_CARD.ORDER_NUMBER, 'The response a equivalent strictly')
            tap.end();
        });
    
        tap.test('Testing without language', async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.language = null;
            const res = await client.attachCard(order);

            tap.plan(1);
            tap.strictSame(res,CONSTANTS.ATTACH_CARD.LANGUAGE_INVALID,'The response a equivalent strictly')
            tap.end();
        });
    
        tap.test('Success',async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            const res = await client.attachCard(order);
    
            tap.plan(2);
            tap.notOk(res.hasError, 'Has Error is equal');
            tap.equal(res.data.errorCode, CONSTANTS.ATTACH_CARD.SUCCESS.ERROR_CODE, 'Error code is equal');
            tap.end();
        })
    
        tap.end();
    });
}

const payOrderTest = async (Gateways,IDBANK,tap,makeId) => {
    tap.test('Pay order', async (tap) => {
        const settings = {
            USER_NAME_API: '14531661_api',
            PASSWORD_API: 'ker1Vanadzor1pak',
            USER_NAME_API_BINDING: '14531661_binding',
            PASSWORD_API_BINDING: 'ker1Vanadzor1pak',
            TEST_MODE: false
        };

        const clientId = 'DNEDSThkJ2G9FxfH9';
        const bindingId = 'a5c68f48-4d51-4f7a-9c32-0d6a432bce27';
        const bindingId2 = 'a5c68f48-4d51-4f7a-9c32-0d6a432bce27';
    
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
    
        tap.test('Testing without settings fields', async (tap) => {
            const newSettings = {...settings};
            newSettings.USER_NAME_API = 'asdasd';
            try {
                const client = Gateways.create(IDBANK, newSettings);
            } catch(err) {
                tap.plan(2);
                tap.equal(err.name, CONSTANTS.SETTINGS.NAME, 'Error name is equal');
                tap.ok(CONSTANTS.SETTINGS.MESSAGE.includes(err.message), 'Error message is equal');
            }
            tap.end();
        });
    
        tap.test('Testing timeout', async (tap) => {
            const newSettings = {...settings, TIMEOUT: 10};
            const client = Gateways.create(IDBANK, newSettings);
            const res = await client.payOrder(defaultOrder);

            tap.plan(2);
            tap.ok(res.hasError, 'Error is a true');
            tap.equal(res.err.name, CONSTANTS.PAY_ORDER.TIMEOUT.MESSAGE, 'Error message is equal');
            tap.end();
        });

        tap.test('Success',async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            const {hasError,data} = await client.payOrder(order);
            const res = { hasError,
                data
            }

            const comparableOrder = {
                hasError: CONSTANTS.PAY_ORDER.SUCCESS.hasError,
                data: {
                    ...data,
                    ...CONSTANTS.PAY_ORDER.SUCCESS.data,
                    orderNumber: order.orderNumber,
                    amount:  order.amount,
                    depositAmount:  order.amount,
                    currency:  order.currency,
                    clientId:  order.clientId,
                    bindingId:  order.bindingId,
                }
            }

            tap.plan(1);
            tap.strictSame(res, comparableOrder, 'Response is equal');
            tap.end();
        })
    
        tap.end();
    });
}

module.exports = { attachCardTest, payOrderTest };