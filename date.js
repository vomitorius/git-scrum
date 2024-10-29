const moment = require('moment');

const parseAmount = (amount) =>
    amount.startsWith('a') ? 1 : parseInt(amount, 10);

const date = (input) => {
    const matches = input.match(/(\d+|an?) (\w+)( ago)?/);
    if (matches) {
        const unit = moment.normalizeUnits(matches[2]);

        if (!unit) {
            throw new Error('Could not parse date');
        }

        const amount = parseAmount(matches[1]);

        return moment().subtract(amount, matches[2]);
    }

    // Validate input date format
    if (!moment(input, moment.ISO_8601, true).isValid() && !moment(input, 'ddd, DD MMM YYYY HH:mm:ss ZZ', true).isValid()) {
        throw new Error('Invalid date format. Please use a valid RFC2822 or ISO format.');
    }
    
    return moment(input);
};



module.exports = date;