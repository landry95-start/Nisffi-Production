import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


import authRouteur from "./Routes/Auth.js"
import categoryRouter from './Routes/Category.js'
import productRouter from './Routes/Products.js'


app.use('/api/auth', authRouteur);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

app.listen(3000, ()=> {
    console.log("Serveur lancé avec succès sur le port 3000");
})