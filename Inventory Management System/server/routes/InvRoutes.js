import { Router } from "express";
import { createItem, deleteItem, getAllItems } from "../controllers/InvController.js";


const invRoutes = Router();

invRoutes.post("/new-item", createItem);
invRoutes.get("/get-all-items", getAllItems);
invRoutes.delete("/delete-item/:id", deleteItem);

export default invRoutes;