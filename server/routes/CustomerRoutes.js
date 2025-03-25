import { Router } from "express";
import { createCustomer, getAllCustomers } from "../controllers/CustomerController.js";


const customerRoutes = Router();

customerRoutes.post("/new-customer", createCustomer);
customerRoutes.get("/get-all-customers", getAllCustomers);

export default customerRoutes;