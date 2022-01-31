const CONSTANTS = require('./constants/constants');

const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; ++index) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

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

const attachCardTest = (Gateways,IDBANK,tap) => {
    tap.test(CONSTANTS.TEST_NAMES.ATTACH_CARD, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS_FIELDS, async (tap) => {
            const newSettings = {...settings};
            delete newSettings.PASSWORD_API;
            try {
                Gateways.create(IDBANK, newSettings);
            } catch(err) {
                tap.plan(2);
                tap.equal(err.name, CONSTANTS.SETTINGS.NAME, CONSTANTS.MESSAGES.ERROR_NAME_EQUAL);
                tap.ok(CONSTANTS.SETTINGS.MESSAGE.includes(err.message), CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            }
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.TIMEOUT, async (tap) => {
            const newSettings = {...settings, TIMEOUT: 10};
            const client = Gateways.create(IDBANK, newSettings);
            const order = { ...defaultOrder };
            const res = await client.attachCard(order);
    
            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.HAS_ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.AMOUNT, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            delete order.amount;
            const res = await client.attachCard(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.AMOUNT_INVALID, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.ORDER_NUMBER, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = null;
            const res = await client.attachCard(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.ORDER_NUMBER, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.LANGUAGE, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.language = null;
            const res = await client.attachCard(order);

            tap.plan(1);
            tap.strictSame(res,CONSTANTS.LANGUAGE_INVALID,CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS,async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            const res = await client.attachCard(order);
    
            tap.plan(4);
            tap.notOk(res.hasError, CONSTANTS.MESSAGES.HAS_ERROR_EQUAL);
            tap.notOk(res.data.error, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.data.errorCode, CONSTANTS.SUCCESS.ERROR_CODE, CONSTANTS.MESSAGES.ERROR_CODE_EQUAL);
            tap.equal(res.data.errorCodeString, CONSTANTS.SUCCESS.ERROR_CODE_STRING, CONSTANTS.MESSAGES.ERROR_CODE_EQUAL);
            tap.end();
        })
    
        tap.end();
    });
}

const payOrderTest = async (Gateways,IDBANK,tap) => {
    tap.test(CONSTANTS.TEST_NAMES.PAY_ORDER, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS_FIELDS, async (tap) => {
            const newSettings = {...settings};
            delete newSettings.USER_NAME_API;
            try {
                Gateways.create(IDBANK, newSettings);
            } catch(err) {
                tap.plan(2);
                tap.equal(err.name, CONSTANTS.SETTINGS.NAME, CONSTANTS.MESSAGES.ERROR_NAME_EQUAL);
                tap.ok(CONSTANTS.SETTINGS.MESSAGE.includes(err.message), CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            }
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.TIMEOUT, async (tap) => {
            const newSettings = {...settings, TIMEOUT: 10};
            const client = Gateways.create(IDBANK, newSettings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            const res = await client.payOrder(order);

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.AMOUNT, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.amount;
            const res = await client.payOrder(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.AMOUNT_INVALID, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.ORDER_NUMBER, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            delete order.orderNumber;
            const res = await client.payOrder(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.ORDER_NUMBER, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });
    
        tap.test(CONSTANTS.TEST_NAMES.LANGUAGE, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.language;
            const res = await client.payOrder(order);

            tap.plan(1);
            tap.strictSame(res,CONSTANTS.LANGUAGE_INVALID,CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.CLIENT_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.clientId;
            const res = await client.payOrder(order);
            delete res.register;
            
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.PAY_ORDER_NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.BINDING_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.bindingId;
            const res = await client.payOrder(order);
            delete res.register;

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.PAY_ORDER_NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS,async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            const {hasError,data} = await client.payOrder(order);
            const res = {
                hasError,
                data
            }

            const comparableOrder = {
                hasError: CONSTANTS.PAY_ORDER_SUCCESS.hasError,
                data: {
                    ...data,
                    ...CONSTANTS.PAY_ORDER_SUCCESS.data,
                    orderNumber: order.orderNumber,
                    amount:  order.amount,
                    depositAmount:  order.amount,
                    currency:  order.currency,
                    clientId:  order.clientId,
                    bindingId:  order.bindingId,
                }
            }

            tap.plan(1);
            tap.strictSame(res, comparableOrder, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    
        tap.end();
    });
}

const getOrderStatusTest = async (Gateways,IDBANK,tap) => {
    tap.test(CONSTANTS.TEST_NAMES.GET_ORDER_STATUS, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.ORDER_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const res = await client.getOrderStatus({
                useBinding: true,
                extended: true,
            });

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.GET_ORDER_STATUS_NOT_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            const resOrder = await client.payOrder(order);            
            const orderId = resOrder.register.orderId;
            const res = await client.getOrderStatus({
                orderId: orderId,
                useBinding: true,
                extended: true,
            });

            const comparableStatus = {
                hasError: CONSTANTS.GET_ORDER_STATUS_SUCCESS.hasError,
                data: {
                    ...res.data,
                    ...CONSTANTS.GET_ORDER_STATUS_SUCCESS.data,
                    orderNumber: order.orderNumber,
                    amount:  order.amount,
                    currency:  order.currency,
                },
            }
            
            tap.plan(1);
            tap.strictSame(res, comparableStatus, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    });
}

const freezeTest = async (Gateways,IDBANK,tap) => {
    tap.test(CONSTANTS.TEST_NAMES.FREEZE, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.TIMEOUT, async (tap) => {
            const newSettings = {...settings, TIMEOUT: 10};
            const client = Gateways.create(IDBANK, newSettings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            const res = await client.freezeOrder(order);

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.AMOUNT, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.amount;
            const res = await client.freezeOrder(order);
            
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.FREEZE_AMOUNT_INVALID, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.ORDER_NUMBER, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            delete order.orderNumber;
            const res = await client.freezeOrder(order);
    
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.FREEZE_ORDER_NUMBER, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.LANGUAGE, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.language;
            const res = await client.freezeOrder(order);

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.FREEZE_LANGUAGE, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.CLIENT_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.clientId;
            const res = await client.freezeOrder(order);
            delete res.registerPreAuth;
            
            tap.plan(1);
            tap.strictSame(res, CONSTANTS.FREEZE_NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.BINDING_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            delete order.bindingId;
            const res = await client.freezeOrder(order);
            delete res.registerPreAuth;

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.FREEZE_NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            order.orderNumber = `tl${makeId(10)}`;
            const res = await client.freezeOrder(order);
            delete res.registerPreAuth;
            delete res.paymentOrderBinding;

            const comparableOrder = {
                hasError: CONSTANTS.FREEZE_SUCCESS.hasError,
                data: {
                    ...res.data,
                    ...CONSTANTS.FREEZE_SUCCESS.data,
                    orderNumber: order.orderNumber,
                    amount:  order.amount,
                    currency:  order.currency,
                    clientId:  order.clientId,
                    bindingId:  order.bindingId,
                },
            }
            
            tap.plan(1);
            tap.strictSame(res, comparableOrder, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    });
}

module.exports = { attachCardTest, payOrderTest, getOrderStatusTest, freezeTest };