import mongoose from "mongoose";

const generateItemId = () => 
{
    return "VN-" + Math.floor(100000 + Math.random() * 900000);
}

const vendorSchema = new mongoose.Schema({
    id: {
        type: String,
        default: generateItemId,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Vendor Name is required"],
    },
    phone: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: [true, 'Company Name is required'],
    },
    address: {
        type: String,
        required: true
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

vendorSchema.pre("save", async function (next)
{
    this.updatedAt = Date.now();
    next();
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;