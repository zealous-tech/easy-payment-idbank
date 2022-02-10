const CONSTANTS = require('../constants/constants');

const settingsKerpak = CONSTANTS.DEFAULT_PARAMETERS.settingsKerpak;

module.exports = (Gateways, IDBANK, tap, makeId, defaultOrder) => {
    tap.test(CONSTANTS.TEST_NAMES.ATTACH_CARD, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS, async (tap) => {
            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_WRONG, async (tap) => {
                const newSettings = { ...settingsKerpak };
                newSettings.USER_NAME_API = makeId(10);
                const client = Gateways.create(IDBANK, newSettings);
                const order = { ...defaultOrder };
                const res = await client.attachCard(order);
                delete res.data.errorMessage;

                tap.plan(1);
                tap.strictSame(res, CONSTANTS.ACCESS_DENIED_REGISTER, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
                tap.end();
            });

            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_FIELDS, async (tap) => {
                const newSettings = { ...settingsKerpak };
                delete newSettings.USER_NAME_API;
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
            const newSettings = { ...settingsKerpak, TIMEOUT: 10 };
            const client = Gateways.create(IDBANK, newSettings);
            const order = { ...defaultOrder };
            const res = await client.attachCard(order);

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.HAS_ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.AMOUNT, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const order = { ...defaultOrder };
            delete order.amount;
            const res = await client.attachCard(order);

            const comparableObj = {
                ...CONSTANTS.AMOUNT_INVALID,
                errorStep: CONSTANTS.ERROR_STEPS.REGISTER_STEP
            }

            tap.plan(1);
            tap.strictSame(res, comparableObj, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.ORDER_NUMBER, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const order = { ...defaultOrder };
            order.orderNumber = null;
            const res = await client.attachCard(order);
            const comparableObj = {
                ...CONSTANTS.ORDER_NUMBER,
                errorStep: CONSTANTS.ERROR_STEPS.REGISTER_STEP
            }

            tap.plan(1);
            tap.strictSame(res, comparableObj, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.LANGUAGE, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const order = { ...defaultOrder };
            order.language = null;
            const res = await client.attachCard(order);

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.LANGUAGE_INVALID, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY)
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const order = { ...defaultOrder };
            const res = await client.attachCard(order);

            tap.plan(4);
            tap.notOk(res.hasError, CONSTANTS.MESSAGES.HAS_ERROR_EQUAL);
            tap.notOk(res.data.error, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.data.errorCode, CONSTANTS.SUCCESS.ERROR_CODE, CONSTANTS.MESSAGES.ERROR_CODE_EQUAL);
            tap.equal(res.data.errorCodeString, CONSTANTS.SUCCESS.ERROR_CODE_STRING, CONSTANTS.MESSAGES.ERROR_CODE_EQUAL);
            tap.end();
        });

        tap.end();
    });
}