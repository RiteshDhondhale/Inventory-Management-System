import { Router } from "express";
import { createSale, getAllSales } from "../controllers/SaleController.js";

const saleRoutes = Router();

saleRoutes.post("/new-sale", createSale);
saleRoutes.get("/get-all-sales", getAllSales);

export default saleRoutes;