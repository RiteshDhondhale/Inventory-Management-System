import mongoose from "mongoose";

const generateItemId = () =>
{
    return "IN-" + Math.floor(10000000 + Math.random() * 90000000);
}

const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        default: generateItemId,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Item Name is required"],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Item Type is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    rate: {
        type: Number,
        required: [true, 'Rate is required'],
        min: [0, 'Rate cannot be negative']
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

itemSchema.virtual('totalValue').get(function ()
{
    return this.quantity * this.rate;
})

itemSchema.pre("save", async function (next)
{
    this.updatedAt = Date.now();
    next();
});

const Item = mongoose.model("Item", itemSchema);

export default Item;