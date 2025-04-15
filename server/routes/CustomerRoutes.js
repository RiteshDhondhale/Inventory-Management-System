import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from "../controllers/CustomerController.js";


const customerRoutes = Router();

customerRoutes.post("/new-customer", createCustomer);
customerRoutes.get("/get-all-customers", getAllCustomers);
customerRoutes.delete("/delete-customer/:id", deleteCustomer);
customerRoutes.put("/update-customer/:id", updateCustomer);

export default customerRoutes;