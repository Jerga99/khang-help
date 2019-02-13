const { normalizeErrors } = require("../helpers/mongoose");
const Payment = require('../models/payment')


exports.getPendingPayment = (req, res) => {
    const user = res.locals.user;

    //  populate booking from payment and populate rental from booking
    Payment.where({ toUser: user })
        .populate({
            path: 'booking',
            populate: { path: 'rental' }
        })
        .populate('fromUser')
        .exec((err, foundPayment) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) })
            }

            // return res.json(foundPayment)
            return res.json({ success: 'OK' })
        })
}