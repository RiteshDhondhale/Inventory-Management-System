import { Router } from "express";
import { createVendor, deleteVendor, getAllVendors, updateVendor } from "../controllers/VendorController.js";

const vendorRoutes = Router();

vendorRoutes.post("/new-vendor", createVendor);
vendorRoutes.get("/get-all-vendors", getAllVendors);
vendorRoutes.delete("/delete-vendor/:id", deleteVendor);
vendorRoutes.put("/update-vendor/:id", updateVendor);

export default vendorRoutes;