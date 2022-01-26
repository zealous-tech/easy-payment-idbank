const errors = {
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
        ERROR_CODE: 5,
        MESSAGE: 'Amount is invalid'
    },
    ORDER_NUMBER: {
        ERROR_CODE: 1,
        MESSAGE: 'Order number is duplicated, order with given order number is processed already'
    },
    LANGUAGE_INVALID: {
        ERROR_CODE: 5,
        MESSAGE: 'Invalid merchant language'
    }
}

module.exports = errors