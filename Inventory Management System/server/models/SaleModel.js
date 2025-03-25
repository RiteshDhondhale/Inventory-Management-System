import mongoose from "mongoose";

const generateOrderId = () =>
{
    return "SL-" + Math.floor(100000 + Math.random() * 900000);
}

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
    items: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    totalAmount: {
        type: Number,
        required: [true, 'Rate is required'],
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
    this.totalAmount = this.items.reduce((total, item) => total + item.rate, 0);
    this.updatedAt = Date.now();
    next();
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;