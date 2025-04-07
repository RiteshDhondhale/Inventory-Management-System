import mongoose from "mongoose";

const generateOrderId = () =>
{
    return "SL-" + Math.floor(100000 + Math.random() * 900000);
}

const saleItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const saleSchema = new mongoose.Schema({
    id: {
        type: String,
        default: generateOrderId,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Customer is required"]
    },
    saleItems: [saleItemSchema],
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    totalAmount: {
        type: Number,
        required: [false, 'Rate is required'],
    },
    saleDate: {
        type: Date,
        default: Date.now
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

saleSchema.pre("save", async function (next)
{
    this.totalAmount = this.saleItems.reduce((total, item) => total + item.amount, 0);
    this.updatedAt = Date.now();
    next();
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;