const { isEmpty } = require('../../utility/index')

function addContactValidation(params) {
    let error = {}

    if (isEmpty(params.first_name)) {
        error.first_name = "Field should not be empty";
    }
    if (isEmpty(params.phone)) {
        error.phone = "Field should not be empty";
    }
    if (isEmpty(params.email)) {
        error.email = "Field should not be empty";
    }
    if (isEmpty(params.company)) {
        error.company = "Field should not be empty";
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

module.exports.addContactValidation = addContactValidation