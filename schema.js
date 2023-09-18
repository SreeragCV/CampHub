const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.htmlStrip': '{{#label}} must not include HTML!'
    },
    rules:{
        htmlStrip: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.htmlStrip', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

 module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().htmlStrip(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required().htmlStrip(),
        //images: Joi.string().required(),
        description: Joi.string().required().htmlStrip(),
    }).required(),
        deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().htmlStrip(),
        rating: Joi.number().required()
    }).required()
});