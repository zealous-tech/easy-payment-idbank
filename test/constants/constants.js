const ERRORS = {
    SETTINGS: {
        NAME: 'AssertionError',
        MESSAGE: [
            'USER_NAME_API is mandatory',
            'PASSWORD_API is mandatory',
            'USER_NAME_API_BINDING is mandatory',
            'PASSWORD_API_BINDING is mandatory'
        ],
    },
    ATTACH_CARD: {
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
        }
    },
    PAY_ORDER: {
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
            hasError: false,
            data: {
                errorCode: '0',
                errorMessage: 'Success',
                orderStatus: 2,
                error: false,
            }
        }
    }
}

module.exports = ERRORS