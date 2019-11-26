const mongoose = require('mongoose');

//Includes territories
//Credit to https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977
const states = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
];

const AddressSchema = mongoose.Schema({
    street: {type: String},
    city: {type: String},
    state: {type: String, enum: states},
    zip: {type: Number, maxlength: 5}
});

const NonPrisonerSchema = {
    addresses: {type: [AddressSchema]},
    phone: {type: Number, maxlength: 10}
};

module.exports = NonPrisonerSchema;