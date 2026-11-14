-- Active: 1793609300441@@127.0.0.1@5432@postgres
CREATE DATABASE nisffi;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM admin


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE marques (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM categories;

SELECT * FROM admin;



CREATE TABLE produit (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix NUMERIC(12, 2) NOT NULL CHECK (prix >= 0),
    ancien_prix NUMERIC(12, 2),
    image TEXT,
    categorie_id INTEGER NOT NULL,
    marque_id INTEGER NOT NULL,
    marque VARCHAR(100),
    couleur VARCHAR(50),
    taille VARCHAR(20),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    statut BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categorie_id) REFERENCES categories(id),
    FOREIGN KEY (marque_id) REFERENCES marques(id),

    CHECK (ancien_prix IS NULL OR ancien_prix >= prix)
);


CREATE TABLE AVIS (
    id SERIAL PRIMARY KEY,
    produit_id INTEGER NOT NULL,
    note INTEGER CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (produit_id) REFERENCES produit(id)
);


ALTER TABLE AVIS ADD COLUMN nom VARCHAR(100) NOT NULL;


SELECT * FROM AVIS;


ALTER TABLE categories 
ADD COLUMN image_url TEXT,
ADD COLUMN ordre_affichage INTEGER DEFAULT 0;


SELECT * FROM categories

DELETE FROM categories WHERE id=14;

SELECT * FROM produit ;

TRUNCATE  TABLE categories RESTART IDENTITY CASCADE;

ALTER TABLE produit
ALTER COLUMN marque_id DROP NOT NULL;


ALTER TABLE produit DROP COLUMN marque_id;


ALTER TABLE produit DROP COLUMN categorie_id;

ALTER TABLE produit DROP COLUMN marque;

DROP TABLE produit;

ALTER TABLE produit RENAME TO prods;

SELECT * FROM prods;

CREATE TABLE produit (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix NUMERIC(12, 2) NOT NULL CHECK (prix >= 0),
    ancien_prix NUMERIC(12, 2),
    image TEXT,

    categorie_id INTEGER NOT NULL,
    marque_id INTEGER,

    couleur VARCHAR(50),
    taille VARCHAR(20),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    statut BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categorie_id) REFERENCES categories(id),
    FOREIGN KEY (marque_id) REFERENCES marques(id),

    CHECK (ancien_prix IS NULL OR ancien_prix >= prix)
);


SELECT current_database();

SELECT * FROM produit;

SELECT current_database();

SELECT * FROM produit;

SELECT COUNT(*) FROM produit;

SELECT * FROM produit;

SELECT datname
FROM pg_database
WHERE datistemplate = false;

SELECT * FROM produit ORDER BY id DESC;


ALTER TABLE produit
ADD COLUMN univers VARCHAR(30) NOT NULL DEFAULT 'Femme'
CHECK (univers IN ('Femme', 'Homme', 'Gadget'));


SELECT id, nom, univers, image
FROM produit
ORDER BY created_at DESC;

SELECT * FROM produit;

CREATE TABLE images_produits (
    id SERIAL PRIMARY KEY,
    produit_id INTEGER NOT NULL REFERENCES produit(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    est_principale BOOLEAN DEFAULT FALSE
);

DELETE FROM admin;