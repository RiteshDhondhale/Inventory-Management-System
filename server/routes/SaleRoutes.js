import { Router } from "express";
import { createSale } from "../controllers/SaleController.js";

const saleRoutes = Router();

saleRoutes.post("/new-sale", createSale);

export default saleRoutes;