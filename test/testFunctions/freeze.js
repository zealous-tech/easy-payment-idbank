const CONSTANTS = require('../constants/constants');

const settings = CONSTANTS.DEFAULT_PARAMETERS.settings;
const settingsKerpak = CONSTANTS.DEFAULT_PARAMETERS.settingsKerpak;

module.exports = (Gateways, IDBANK, tap, makeId, defaultOrder) => {
    tap.test(CONSTANTS.TEST_NAMES.FREEZE, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS, async (tap) => {
            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_WRONG, async (tap) => {
                const newSettings = { ...settings };
                newSettings.USER_NAME_API_BINDING = `${makeId(10)}`;
                const client = Gateways.create(IDBANK, newSettings);
                const order = { ...defaultOrder };
                const res = await client.freezeOrder(order);
                delete res.data.errorMessage;
                const comparableRes = {
                    ...CONSTANTS.ACCESS_DENIED_REGISTER,
                    errorStep: CONSTANTS.ERROR_STEPS.FREEZE_STEP,
                };

                tap.plan(1);
                tap.strictSame(res, comparableRes, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
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
            const comparableObj = {
                ...CONSTANTS.AMOUNT_INVALID,
                errorStep: CONSTANTS.ERROR_STEPS.FREEZE_STEP
            }

            tap.plan(1);
            tap.strictSame(res, comparableObj, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.ORDER_NUMBER, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const order = { ...defaultOrder };
            delete order.orderNumber;
            const res = await client.freezeOrder(order);
            const comparableObj = {
                ...CONSTANTS.ORDER_NUMBER,
                errorStep: CONSTANTS.ERROR_STEPS.FREEZE_STEP
            }

            tap.plan(1);
            tap.strictSame(res, comparableObj, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
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
            tap.strictSame(res, CONSTANTS.NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
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
            tap.strictSame(res, CONSTANTS.NO_BINDING_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
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
                    amount: order.amount,
                    currency: order.currency,
                    clientId: order.clientId,
                    bindingId: order.bindingId,
                },
            }

            tap.plan(1);
            tap.strictSame(res, comparableOrder, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });
        tap.end();
    });
}