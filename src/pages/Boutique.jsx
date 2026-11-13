
import React, { useState } from "react";
import ProductsCard from "../component/ProductsCard";
import { motion } from "framer-motion";
import { useProducts } from "../component/DashboardAdmin/ContextProduct";
import { useCategories } from "../component/DashboardAdmin/ContextCategory";

const containerVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4
        }
    }
};

const Boutique = () => {

    const { products, loading, error } = useProducts();
    const { categories } = useCategories();

    const [categoryFilter, setCategoryFilter] = useState("Tous");
    const [brandFilter, setBrandFilter] = useState("Tous");

    const brands = [
        ...new Set(
            products
                .map((item) => item.marque_nom)
                .filter(Boolean)
        )
    ];

    const productFilter = products.filter((item) => {

        const resultCategory =
            categoryFilter === "Tous" ||
            item.categorie_nom === categoryFilter;

        const resultBrand =
            brandFilter === "Tous" ||
            item.marque_nom === brandFilter;

        return resultCategory && resultBrand;
    });

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr] px-4 sm:px-6 lg:px-8 xl:px-15 py-6 sm:py-8 lg:py-10 gap-6">

            {/* FILTRES */}
            <aside className="sticky top-0 h-fit self-start border border-gray-200 rounded-lg p-4 sm:p-5">

                <div className="border-b pb-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold">
                        Filtres
                    </h3>
                </div>

                
                <div className="mt-3">

                    <h3 className="font-['Playfair_Display'] text-base font-semibold">
                        Catégories
                    </h3>

                    <div className="mt-3 flex flex-col gap-3 border-b pb-6">

                        <label className="flex gap-2">
                            <input
                                type="radio"
                                name="category"
                                checked={categoryFilter === "Tous"}
                                onChange={() => setCategoryFilter("Tous")}
                            />
                            <span>Tous</span>
                        </label>

                        {categories.map((item) => (

                            <label key={item.id} className="flex gap-2">

                                <input
                                    type="radio"
                                    name="category"
                                    value={item.nom}
                                    checked={categoryFilter === item.nom}
                                    onChange={() => setCategoryFilter(item.nom)}
                                />

                                <span>{item.nom}</span>

                            </label>

                        ))}

                    </div>
                </div>

                {/* Marques */}
                <div className="mt-3">

                    <h3 className="font-['Playfair_Display'] text-base font-semibold">
                        Marques
                    </h3>

                    <div className="mt-3 flex flex-col gap-3 border-b pb-6">

                        <label className="flex gap-2">
                            <input
                                type="radio"
                                name="brand"
                                checked={brandFilter === "Tous"}
                                onChange={() => setBrandFilter("Tous")}
                            />
                            <span>Tous</span>
                        </label>

                        {brands.map((item) => (

                            <label key={item} className="flex gap-2">

                                <input
                                    type="radio"
                                    name="brand"
                                    value={item}
                                    checked={brandFilter === item}
                                    onChange={() => setBrandFilter(item)}
                                />

                                <span>{item}</span>

                            </label>

                        ))}

                    </div>
                </div>

            </aside>

            {/* PRODUITS */}
            <motion.main
                className="min-w-0 lg:pl-6 xl:pl-10"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >

                {loading ? (
                    <p className="text-center text-gray-500">
                        Chargement des produits...
                    </p>
                ) : error ? (
                    <p className="text-center text-red-500">
                        {error}
                    </p>
                ) : productFilter.length === 0 ? (
                    <p className="flex items-center justify-center min-h-64 font-bold text-red-500 text-xl sm:text-2xl lg:text-3xl font-['Playfair_Display'] text-center">
                        Pas de produit disponible pour le moment
                    </p>
                ) : (
                    <motion.div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                        {productFilter.map((item) => (
                            <ProductsCard key={item.id} produit={item} />
                        ))}
                    </motion.div>
                )}

            </motion.main>

        </section>
    );
};

export default Boutique;




/*

Nous avons le systemes de plusieurs types filtres 

par exemple on peut filtrer en fonction de la marques, du prix, de la categorie(jupes, robes, chemise)



Comment donc les combiner ensemble ?

Voici le principe :

"Chaque filtre supplementaire affine le precedent"

Comprenons par des exemples :

Imagine que ta boutique contient ces articles :


Article	        Catégorie	        Marque


Robe rouge	       Robe	              Dior
Robe noire	       Robe	              Gucci
Sac à main	       Sacs	              Dior
Lunettes	       Lunettes	          Gucci
Robe blanche	   Robe	              Dior


Voici le comportement attendu :

Cas 1 : Tous les articles

Catégorie : Toutes · Marque : Toutes

5 articles affichés.


Cas 2 : Catégorie Robe

Catégorie : Robe · Marque : Toutes

3 robes affichées.


Cas 3 : Robe + Dior

Catégorie : Robe · Marque : Dior

2 robes Dior affichées.


Cas 4 : Toutes les catégories + Gucci

Catégorie : Toutes · Marque : Gucci

2 articles Gucci affichés : la robe noire et les lunettes.


Donc, dans ton exemple :
- Tu sélectionnes Robe, puis Dior → tu obtiens uniquement les robes de marque Dior.
- Tu sélectionnes Tous, puis Gucci → tu obtiens tous les articles Gucci, quelle que soit leur catégorie.



Comment programmer cela en React ?


const [categoryChoice, setCategoryChoice] = useState("tous"); // pour les categories
const [brandChoice, setBrandChoice] = useState("tous"); // pour les marques


categoryChoice mémorise la catégorie sélectionnée.

brandChoice mémorise la marque sélectionnée.



Application du filtres :

const produitsFilter = products.map((item) => {

    const correspondCategorie =
        categoryChoice === "tous" ||
        item.categorie === categoryChoice;

  const correspondMarque =
    brandChoice === "tous" ||
    item.marque === brandChoice;

    return (
        correspondCategorie &&
        correspondMarque
    )

})


Explication de cette condition


const correspondCategorie =
    categoryChoice === "tous" ||
    item.categorie === categoryChoice;


Elle signifie :

    "Si l'utilisateur a choisi toutes les catégories, accepte tous les produits. 
    Sinon, accepte uniquement ceux dont la catégorie correspond à son choix."



Imaginons que tu as ces produits :

const produits = [
  { nom: "Robe rouge", categorie: "robes" },
  { nom: "Sac Dior", categorie: "sacs" },
  { nom: "Robe noire", categorie: "robes" },
];

Et cet état React :
const [categoryChoice, setCategoryChoice] = useState("tous");


categoryChoice represente la categorie choisit par l'utilisateur

Si l'utilisateur n'a pas encore choisi de catégorie, sa valeur est "tous".
S'il clique sur « Robes », sa valeur devient "robes".
S'il clique sur « Sacs », sa valeur devient "sacs".


Maintenant examinons ligne par ligne


2. Comprendre le symbole ||

En JavaScript, || signifie OU.

Par exemple :
true || false // true
false || true // true
false || false // false
true || true  // true


Avec OU, il suffit qu'une des deux conditions soit vraie pour que le résultat soit vrai.


3. Décomposons ton code


const correspondCategorie =
  categoryChoice === "tous" ||
  item.categorie === categoryChoice;

cette expression contient deux conditions a savoir :


Première condition :


categoryChoice === "tous"


Cela signifie :
Est-ce que l'utilisateur a choisi toutes les catégories ?

Si oui, le résultat est true.





Explication complete : 

justement prenons juste la categorie

condition 1 : est-ce que l'utilisateur a choisie tout si oui true

return true (donc l'ensemble des elements )

comme Tableau.filter((item) => true) // on a un tableau avec les memes elements 

si non on passe a la condition 2 :

et a ce niveau on verifie si la categorie de chaque produit correspond a celui choisi 

produit 1 = true 

return true et filter concerve ce produit



(correspondCategorie && correspondMarque )


Apprentissage :

On rencontre souvent un type de condition


const condition1 = true;
const condition2 = false;


if (condition1 || condition2) {
    console.log("une condition est vraie")
} else {
    console.log("les deux conditions sont fausses")
}

|| = " au moins une des deux conditions doit etre vraie pour rester dans le if "sa

*/