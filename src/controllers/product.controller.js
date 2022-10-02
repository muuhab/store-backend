import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {}); // TODO get all product
productRouter.get("/:id", (req, res) => {}); // TODO get product By ID
productRouter.post("/", (req, res) => {}); // TODO create a new product
productRouter.put("/:id", (req, res) => {}); // TODO update a product
productRouter.delete("/:id", (req, res) => {}); // TODO delete a product

export default productRouter;
