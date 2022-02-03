module.exports = {
    DEFAULT_PARAMETERS: {
        settingsKerpak: {
            USER_NAME_API: '14531737_api',
            PASSWORD_API: 'ker1Vanadzor1pak1',
            USER_NAME_API_BINDING: '14531737_binding',
            PASSWORD_API_BINDING: 'ker1Vanadzor1pak1',
            TEST_MODE: false
        },
        settings: {
            USER_NAME_API: '14531661_api',
            PASSWORD_API: 'ker1Vanadzor1pak',
            USER_NAME_API_BINDING: '14531661_binding',
            PASSWORD_API_BINDING: 'ker1Vanadzor1pak',
            TEST_MODE: false
        },
    },
    TEST_NAMES: {
        ATTACH_CARD: 'Attach card',
        SETTINGS: 'Test settings fields',
        SETTINGS_FIELDS: 'Testing without settings fields',
        SETTINGS_WRONG: 'Testing incorrectly entered settings',
        TIMEOUT: 'Testing timeout',
        AMOUNT: 'Testing without amount',
        ORDER_NUMBER: 'Testing without order number',
        ORDER_ID: 'Testing without order id',
        SAME_ORDER_ID: 'Testing with the same order id',
        SAME_BINDING_ID: 'Testing with the same binding id',
        LANGUAGE: 'Testing without language',
        SUCCESS: 'Success',
        PAY_ORDER: 'Pay order',
        CLIENT_ID: 'Testing without clientId',
        BINDING_ID: 'Testing without bindingId',
        GET_ORDER_STATUS: 'Get order status',
        FREEZE: 'Freeze order',
        REVERSE: 'Reverse order',
        DEPOSIT: 'Deposit order',
        REFUND: 'Refund order',
        GET_BINDINGS: 'Get bindings',
        REMOVE_CARD: 'Remove card'
    },
    MESSAGES: {
        EQUIVALENT_STRICTLY: 'The response a equivalent strictly',
        ERROR_MESSAGE_EQUAL: 'Error message is equal',
        ERROR_NAME_EQUAL: 'Error name is equal',
        ERROR_CODE_EQUAL: 'Error code is equal',
        ERROR_EQUAL: 'Error is equal',
        HAS_ERROR_EQUAL: 'Has error is equal',
        ORDER_ID_EQUAL: 'Order id is equal',
        TYPE_EQUAL: 'Type is equal'
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
    ERROR_STEPS: {
        FREEZE_STEP: 'registerPreAuth.do',
        DEPOSIT_STEP: 'deposit.do',
        REVERSE_STEP: 'reverse.do',
        REGISTER_STEP: 'register.do',
        REFUND_STEP: 'refund.do',
        GET_BINDING_STEP: 'getBindings.do'
    },
    ACCESS_DENIED_REGISTER: {
        hasError: true,
        data: {
            errorCode: 5,
            errorCodeString: '5',
            error: true
        },
        errorStep: 'register.do'
    },
    ACCESS_DENIED: {
        hasError: true,
        data: {
            errorCode: '5',
            error: true
        }
    },
    ORDER_NO_FOUND: {
        hasError: true,
        data: {
            errorCode: '6',
            errorMessage: 'No such order',
            error: true
        }
    },
    CARD_SUCCESS: {
        hasError: false,
        data: {
            errorCode: '0',
            errorMessage: 'Success',
            error: false
        }
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
        }
    },
    ORDER_NUMBER: {
        hasError: true,
        data: {
            errorCode: 1,
            errorMessage: 'Order number is duplicated, order with given order number is processed already',
            errorCodeString: '1',
            error: true
        }
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
    NO_BINDING_FOUND: {
        hasError: true,
        data: { error: 'No binding found', errorCode: 2 },
        errorStep: 'paymentOrderBinding.do'
    },
    GET_ORDER_STATUS_NOT_FOUND: {
        hasError: false,
        data: {
          errorCode: '6',
          errorMessage: 'Order not found',
          merchantOrderParams: [],
          attributes: [],
          error: true
        }
    },
    GET_ORDER_STATUS_SUCCESS: {
        hasError: false,
        data: {
            errorCode: '0',
            errorMessage: 'Success',
            orderStatus: 2,
            actionCode: 0,
            actionCodeDescription: 'Request processed successfully',
            error: false
        }
    },
    FREEZE_SUCCESS: {
        hasError: false,
        data: {
            errorCode: '0',
            errorMessage: 'Success',
            orderStatus: 1,
            error: false,
        }
    },
    FREEZE_LANGUAGE: {
        hasError: true,
        data: {
          errorCode: 5,
          errorMessage: 'Invalid merchant language',
          errorCodeString: '5',
          error: true
        },
        errorStep: 'registerPreAuth.do'
    },
    REVERSE_SUCCESS: {
        reverse: { errorCode: '0', errorMessage: 'Success', error: false },
        hasError: false,
        data: {
          errorCode: '0',
          errorMessage: 'Success',
          orderStatus: 3,
          error: false
        }
    },
    REVERSE_SAME_ORDER_ID: {
        hasError: true,
        data: {
          errorCode: '7',
          errorMessage: 'Reversal is impossible for current transaction state',
          error: true
        },
        errorStep: 'reverse.do'
    },
    DEPOSIT_SUCCESS: {
        deposit: { errorCode: '0', errorMessage: 'Success', error: false },
        hasError: false,
        data: {
          errorCode: '0',
          errorMessage: 'Success',
          orderStatus: 2,
          error: false
        }
    },
    DEPOSIT_AMOUNT_INVALID: {
        hasError: true,
        data: {
          errorCode: '5',
          errorMessage: 'deposit amount is invalid',
          error: true
        },
        errorStep: 'deposit.do'
    },
    DEPOSIT_AMOUNT_EXCEEDING: {
        hasError: true,
        data: {
          errorCode: '5',
          errorMessage: 'deposited amount is exceeding approved amount',
          error: true
        },
        errorStep: 'deposit.do'
    },
    DEPOSIT_SAME_ORDER_ID: {
        hasError: true,
        data: {
          errorCode: '7',
          errorMessage: 'Payment must be in approved state',
          error: true
        },
        errorStep: 'deposit.do'
    },
    REFUND_SUCCESS: {
        refund: { errorCode: '0', errorMessage: 'Success', error: false },
        hasError: false,
        data: {
          errorCode: '0',
          errorMessage: 'Success',
          orderStatus: 4,
          error: false
        }
    },
    REFUND_AMOUNT_INVALID: {
        hasError: true,
        data: { 
            errorCode: '5',
            errorMessage: 'Amount is invalid',
            error: true 
        },
        errorStep: 'refund.do'
    },
    REFUND_AMOUNT_EXCEEDING: {
        hasError: true,
        data: {
          errorCode: '7',
          errorMessage: 'Refund amount exceeds deposited amount',
          error: true
        },
        errorStep: 'refund.do'
    },
    REFUND_SAME_ORDER_ID: {
        hasError: true,
        data: {
          errorCode: '7',
          errorMessage: 'Refund is impossible for current transaction state',
          error: true
        },
        errorStep: 'refund.do'
    },
    BINDING_NOT_FOUND: {
        hasError: true,
        data: {
          errorCode: '2',
          errorMessage: 'Data not found',
          bindings: [],
          error: true
        },
        errorStep: 'getBindings.do'
    },
    REMOVE_CARD_BINDING_NOT_FOUND: {
        hasError: true,
        data: {
            errorCode: '2',
            errorMessage: 'No binding found',
            error: true
        },
        errorStep: 'unBindCard.do'
    },
    REMOVE_CARD_SAME_BINDING_ID: {
        hasError: true,
        data: {
          errorCode: '2',
          errorMessage: "Binding is already enable/disable, change doesn't need",
          error: true
        },
        errorStep: 'unBindCard.do'
    },
    REMOVE_CARD_ACCESS_DENIED: {
        hasError: true,
        data: {
            errorCode: '2',
            errorMessage: 'No rights to manage binding of another merchant',
            error: true
        },
        errorStep: 'unBindCard.do'
    }
}