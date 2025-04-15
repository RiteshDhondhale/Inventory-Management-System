import { Router } from "express";
import { createItem, deleteItem, getAllItems, updateItem } from "../controllers/InvController.js";


const invRoutes = Router();

invRoutes.post("/new-item", createItem);
invRoutes.get("/get-all-items", getAllItems);
invRoutes.delete("/delete-item/:id", deleteItem);
invRoutes.put("/update-item/:id", updateItem)

export default invRoutes;