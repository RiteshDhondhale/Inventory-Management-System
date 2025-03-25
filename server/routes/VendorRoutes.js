import { Router } from "express";
import { createVendor, deleteVendor, getAllVendors } from "../controllers/VendorController.js";

const vendorRoutes = Router();

vendorRoutes.post("/new-vendor", createVendor);
vendorRoutes.get("/get-all-vendors", getAllVendors);
vendorRoutes.delete("/delete-vendor/:id", deleteVendor)

export default vendorRoutes;