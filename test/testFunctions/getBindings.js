const CONSTANTS = require('../constants/constants');

const settings = CONSTANTS.DEFAULT_PARAMETERS.settings;
const settingsKerpak = CONSTANTS.DEFAULT_PARAMETERS.settingsKerpak;

module.exports = (Gateways, IDBANK, tap, makeId, defaultOrder) => {
    tap.test(CONSTANTS.TEST_NAMES.GET_BINDINGS, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS, async (tap) => {
            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_WRONG, async (tap) => {
                const newSettings = { ...settings };
                newSettings.USER_NAME_API_BINDING = `${makeId(10)}`;
                const client = Gateways.create(IDBANK, newSettings);
                const res = await client.getBindings(defaultOrder.clientId);
                delete res.data.bindings;
                delete res.data.errorMessage;
                const comparableRes = {
                    ...CONSTANTS.ACCESS_DENIED,
                    errorStep: CONSTANTS.ERROR_STEPS.GET_BINDING_STEP
                }

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
            const res = await client.getBindings(defaultOrder.clientId);

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.CLIENT_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const clientId = `tl${makeId(10)}`;
            const res = await client.getBindings(clientId);

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.BINDING_NOT_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS, async (tap) => {
            const client = Gateways.create(IDBANK, settings);
            const res = await client.getBindings(defaultOrder.clientId);
            const bindings = res.data.bindings;
            delete res.data.bindings;

            tap.plan(2);
            tap.strictSame(res, CONSTANTS.CARD_SUCCESS, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.type(bindings, 'Array', CONSTANTS.MESSAGES.TYPE_EQUAL);
            tap.end();
        });
        tap.end();
    });
}