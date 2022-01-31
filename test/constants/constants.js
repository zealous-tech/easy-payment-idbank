const ERRORS = {
    TEST_NAMES: {
        ATTACH_CARD: 'Attach card',
        SETTINGS_FIELDS: 'Testing without settings fields',
        TIMEOUT: 'Testing timeout',
        AMOUNT: 'Testing without amount',
        ORDER_NUMBER: 'Testing without order number',
        LANGUAGE: 'Testing without language',
        SUCCESS: 'Success',
        PAY_ORDER: 'Pay order',
        CLIENT_ID: 'Testing without clientId',
        BINDING_ID: 'Testing without bindingId'
    },
    MESSAGES: {
        EQUIVALENT_STRICTLY: 'The response a equivalent strictly',
        ERROR_MESSAGE_EQUAL: 'Error message is equal',
        ERROR_NAME_EQUAL: 'Error name is equal',
        ERROR_CODE_EQUAL: 'Error code is equal',
        ERROR_EQUAL: 'Error is equal',
        HAS_ERROR_EQUAL: 'Has error is equal'
    },
    SETTINGS: {
        NAME: 'AssertionError',
        MESSAGE: [
            'USER_NAME_API is mandatory',
            'PASSWORD_API is mandatory',
            'USER_NAME_API_BINDING is mandatory',
            'PASSWORD_API_BINDING is mandatory'
        ],
    },
    TIMEOUT: {
        MESSAGE: 'TimeoutError',
    },
    AMOUNT_INVALID: {
        hasError: true,
        data: {
            errorCode: 5,
            errorMessage: 'Amount is invalid',
            errorCodeString: '5',
            error: true
        },
        errorStep: 'register.do'
    },
    ORDER_NUMBER: {
        hasError: true,
        data: {
            errorCode: 1,
            errorMessage: 'Order number is duplicated, order with given order number is processed already',
            errorCodeString: '1',
            error: true
        },
        errorStep: 'register.do'
    },
    LANGUAGE_INVALID: {
        hasError: true,
        data: {
            errorCode: 5,
            errorMessage: 'Invalid merchant language',
            errorCodeString: '5',
            error: true
        },
        errorStep: 'register.do'
    },
    SUCCESS: {
        ERROR_CODE: 0,
        ERROR_CODE_STRING: '0'
    },
    PAY_ORDER_SUCCESS: {
        hasError: false,
        data: {
            errorCode: '0',
            errorMessage: 'Success',
            orderStatus: 2,
            error: false,
        }
    },
    PAY_ORDER_NO_BINDING_FOUND: {
        hasError: true,
        data: { error: 'No binding found', errorCode: 2 },
        errorStep: 'paymentOrderBinding.do'
    },
}

module.exports = ERRORS