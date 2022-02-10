const CONSTANTS = require('../constants/constants');

const settingsKerpak = CONSTANTS.DEFAULT_PARAMETERS.settingsKerpak;
const settings = CONSTANTS.DEFAULT_PARAMETERS.settings;


module.exports = (Gateways, IDBANK, tap, makeId, defaultOrder) => {
    tap.test(CONSTANTS.TEST_NAMES.REMOVE_CARD, async (tap) => {
        tap.test(CONSTANTS.TEST_NAMES.SETTINGS, async (tap) => {
            tap.test(CONSTANTS.TEST_NAMES.SETTINGS_WRONG, async (tap) => {
                const client = Gateways.create(IDBANK, settings);
                const res = await client.removeCard(defaultOrder.bindingId);

                tap.plan(1);
                tap.strictSame(res, CONSTANTS.REMOVE_CARD_ACCESS_DENIED, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
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
            const newSettings = { ...settingsKerpak, TIMEOUT: 10 };
            const client = Gateways.create(IDBANK, newSettings);
            const bindingId = makeId(10);
            const res = await client.removeCard(bindingId);

            tap.plan(2);
            tap.ok(res.hasError, CONSTANTS.MESSAGES.ERROR_EQUAL);
            tap.equal(res.err.name, CONSTANTS.TIMEOUT.MESSAGE, CONSTANTS.MESSAGES.ERROR_MESSAGE_EQUAL);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.BINDING_ID, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const bindingId = makeId(10);
            const res = await client.removeCard(bindingId);

            tap.plan(1);
            tap.strictSame(res, CONSTANTS.REMOVE_CARD_BINDING_NOT_FOUND, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.end();
        });

        tap.test(CONSTANTS.TEST_NAMES.SUCCESS, async (tap) => {
            const client = Gateways.create(IDBANK, settingsKerpak);
            const res = await client.removeCard(defaultOrder.bindingId);
            delete res.data.bindings;

            tap.plan(2);
            tap.strictSame(res, CONSTANTS.CARD_SUCCESS, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            tap.test(CONSTANTS.TEST_NAMES.SAME_BINDING_ID, async (tap) => {
                const res = await client.removeCard(defaultOrder.bindingId);
                tap.plan(1);
                tap.strictSame(res, CONSTANTS.REMOVE_CARD_SAME_BINDING_ID, CONSTANTS.MESSAGES.EQUIVALENT_STRICTLY);
            });
            tap.end();
        });
        tap.end();
    });
}