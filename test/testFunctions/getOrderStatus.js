const CONSTANTS = require('../constants/constants');

const settings = CONSTANTS.DEFAULT_PARAMETERS.settings;
const settingsKerpak = CONSTANTS.DEFAULT_PARAMETERS.settingsKerpak;

module.exports = (Gateways, IDBANK, tap, makeId, defaultOrder) => {
    tap.test(CONSTANTS.TEST_NAMES.GET_ORDER_STATUS, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS, async (tap) => {
            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_WRONG, async (tap) => {
                const newSettings = { ...settings };
                newSettings.USER_NAME_API_BINDING = `${makeId(10)}`;
                const client = Gateways.create(IDBANK, newSettings);
                const res = await client.getOrderStatus({ useBinding: true, extended: true });
                delete res.data.merchantOrderParams;
                delete res.data.attributes;
                delete res.data.errorMessage;

                tap.plan(1);
                tap.strictSame(res, { ...CONSTANTS.ACCESS_DENIED, hasError: false }, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
                tap.end();
            });

            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_FIELDS, async (tap) => {
                const newSettings = { ...settingsKerpak };
                delete newSettings.USER_NAME_API_BINDING;
                try {
                    Gateways.create(IDBANK, newSettings);
                } catch (err) {
                    tap.plan(2);
                    tap.equal(err.name, CONSTANTS.SETTINGS.NAME, CONSTANTS.MESSAGES.ERROR_NAME_EQUAL);
                    tap.ok(CONSTANTS.SETTINGS.MESSAGE.includes(err.message), CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
                    tap.end();
                }
            });
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.TIMEOUT, async (tap) => {
            const newSettings = { ...settings, TIMEOUT: 10 };
            const client = Gateways.create(IDBANK, newSettings);
            const orderId = `tl${makeId(10)}`;
            const res = await client.getOrderStatus({
                orderId: orderId,
                useBinding: true,
                extended: true,
            });

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.ORDER_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const res = await client.getOrderStatus({ useBinding: true, extended: true });
            delete res.data.merchantOrderParams;
            delete res.data.attributes;

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
                    amount: order.amount,
                    currency: order.currency,
                },
            }

            tap.plan(1);
            tap.strictSame(res, comparableStatus, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
    });
}