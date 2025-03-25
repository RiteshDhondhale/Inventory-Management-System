import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import invRoutes from "./routes/InvRoutes.js";
import vendorRoutes from "./routes/VendorRoutes.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import saleRoutes from "./routes/SaleRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 2001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use(express.json());

app.use('/api/items', invRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', saleRoutes);

const server = app.listen(port,() =>{
    console.log(`Server is running at http://localhost:${port}`)
})

mongoose.connect(databaseURL)
    .then(()=> console.log("DB Connection Successfull."))
    .catch(err => console.log(err.message));