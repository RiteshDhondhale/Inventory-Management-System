import mongoose from "mongoose";

const generateCustomerId = () =>
{
    return "CS-" + Math.floor(1000 + Math.random() * 9000);
}

const customerSchema = new mongoose.Schema({
    id: {
        type: String,
        default: generateCustomerId,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Vendor Name is required"],
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
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

customerSchema.pre("save", async function (next)
{
    this.updatedAt = Date.now();
    next();
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;