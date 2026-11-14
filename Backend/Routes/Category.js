import express from "express"

const router = express.Router();

import  {uploadCategory}  from "../Middelware/upload.js";

import { AddCategory, GetCategories, deleteCategory, setCategories } from "../controllers/CategoryController.js";

router.post("/", uploadCategory.single("image"), AddCategory);

router.get("/", GetCategories);

router.put("/:id", uploadCategory.single("image"), setCategories);

router.delete("/:id", deleteCategory);

export default router;

/*

Multer est une bibliotheque qui permet de stocker des fichiers dans un dossier cote serveur 
puis la bd va enregistrer le chemin d'acces a ces fichiers.


Multer nous fournis notamment deux elements (objets) :
 
req.body : les donnees du formulaire

req.file : les informations sur le fichier notamment son nom et son chemin de stockage


upload.single(image) = Multer doit recevoir un seul fichier et le nom de ce fichier se trouve dans le champ
appelle image.

*/