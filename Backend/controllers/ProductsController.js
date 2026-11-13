import db from "../config/db.js";
import fs from "node:fs";

import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function GetProducts(req, res) {
  try {
    const query = `
      SELECT
        p.*,
        c.nom AS categorie_nom,
        m.nom AS marque_nom
      FROM produit p
      INNER JOIN categories c
        ON p.categorie_id = c.id
      LEFT JOIN marques m
        ON p.marque_id = m.id
      ORDER BY p.created_at DESC
    `;

    const result = await db.query(query);

    return res.status(200).json({
      produits: result.rows
    });

  } catch (error) {
    console.error("Erreur GetProducts :", error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des produits"
    });
  }
}


async function AddProduct(req, res) {
  try {
    const {
      nom,
      description,
      prix,
      ancien_prix,
      categorie_id,
      marque_id,
      stock,
      couleur,
      taille,
      univers
    } = req.body;

    // Champs obligatoires
    if (!nom?.trim() || !prix || !categorie_id || !req.file) {
      return res.status(400).json({
        message: "Veuillez remplir les champs obligatoires et ajouter une image"
      });
    }

   
    const prixFinal = Number(prix);

    const ancienPrixFinal =
      ancien_prix === "" || ancien_prix === undefined
        ? null
        : Number(ancien_prix);

    const categorieId = Number(categorie_id);

    const marqueId =
      marque_id === "" || marque_id === undefined
        ? null
        : Number(marque_id);

    const stockFinal =
      stock === "" || stock === undefined
        ? 0
        : Number(stock);

 
    if (
      !Number.isFinite(prixFinal) ||
      prixFinal <= 0 ||
      (ancienPrixFinal !== null &&
        (!Number.isFinite(ancienPrixFinal) ||
          ancienPrixFinal < prixFinal)) ||
      !Number.isInteger(categorieId) ||
      (marqueId !== null && !Number.isInteger(marqueId)) ||
      !Number.isInteger(stockFinal) ||
      stockFinal < 0
    ) {
      return res.status(400).json({
        message: "Certaines valeurs numériques sont invalides"
      });
    }

    const image = `/uploads/products/${req.file.filename}`;

    const query = `
      INSERT INTO produit (
        nom,
        description,
        prix,
        ancien_prix,
        image,
        categorie_id,
        marque_id,
        stock,
        couleur,
        taille,
        univers
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
    `;

    const values = [
      nom.trim(),
      description || null,
      prixFinal,
      ancienPrixFinal,
      image,
      categorieId,
      marqueId,
      stockFinal,
      couleur || null,
      taille || null,
      univers
    ];

    const result = await db.query(query, values);

    return res.status(201).json({
      message: "Produit ajouté avec succès",
      produit: result.rows[0]
    });

  } catch (error) {
    console.error("Erreur AddProduct :", error);

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Erreur suppression image :", err);
        }
      });
    }

    return res.status(500).json({
      message: "Erreur lors de l'ajout du produit"
    });
  }
}

async function DeleteProduct(req, res) {
  try {
    
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Identifiant du produit invalide"
      });
    }

    
    const query = `
      DELETE FROM produit
      WHERE id = $1
      RETURNING image
    `;

    const result = await db.query(query, [id]);

   
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    
    const image = result.rows[0].image;

    if (image && image.startsWith("/uploads/products/")) {
      const imagePath = path.resolve(
        __dirname,
        "..",
        image.slice(1)
      );

      try {
        await fs.promises.unlink(imagePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Erreur suppression image :", error);
        }
      }
    }

    return res.status(200).json({
      message: "Produit supprimé avec succès"
    });

  } catch (error) {
    console.error("Erreur DeleteProduct :", error);

    
    if (error.code === "23503") {
      return res.status(409).json({
        message: "Impossible de supprimer ce produit car il est utilisé ailleurs."
      });
    }

    return res.status(500).json({
      message: "Erreur lors de la suppression du produit"
    });
  }
}

export {
  GetProducts,
  AddProduct,
  DeleteProduct
};
