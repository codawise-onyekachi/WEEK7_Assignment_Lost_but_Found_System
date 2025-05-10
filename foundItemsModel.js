
const mongoose = require("mongoose")

const foundItemSchema = new mongoose.Schema({
    itemName: {type: String, require: true},
    description:{type: String, default:" "},
    locationFound: {type: String, require:true},
    dateFound: { type: Date, default: "0"},
    claimed: {type: Boolean, default: false}
}, { timestamps: true}
)


const Item = new mongoose.model("Item",foundItemSchema )


module.exports = Item