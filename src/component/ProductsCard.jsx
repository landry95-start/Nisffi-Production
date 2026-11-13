
import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../component/CartProvider";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

const ProductsCard = ({ produit }) => {

    const navigate = useNavigate();
    const { addCart } = useCart();

    const imageUrl = produit.image
        ? `http://localhost:3000${produit.image}`
        : "";

    return (
        <section className="min-w-0">

            <motion.article
                className="group rounded-xl border border-[#EAE5DF] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                variants={cardVariants}
                onClick={() => navigate("/details", {
                    state: { article: produit }
                })}
            >

                {/* IMAGE */}
                <div className="relative h-36 sm:h-44 lg:h-48 xl:h-52 overflow-hidden rounded-xl bg-[#F5EADF]">

                    <img
                        src={imageUrl}
                        alt={produit.nom}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {produit.ancien_prix && Number(produit.ancien_prix) > Number(produit.prix) && (
                        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-pink-600 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-white">
                            Promo
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-white p-1.5 sm:p-2 text-gray-700 shadow-sm hover:text-red-500"
                    >
                        <Heart size={16} />
                    </button>

                </div>

                {/* INFORMATIONS */}
                <div className="p-2 sm:p-3">

                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500">
                        {produit.categorie_nom}
                    </p>

                    <h3 className="mt-1 line-clamp-1 text-xs sm:text-sm font-medium text-[#29211D]">
                        {produit.nom}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">

                        <span className="text-xs sm:text-sm font-bold">
                            {Number(produit.prix).toLocaleString("fr-FR")} FCFA
                        </span>

                        {produit.ancien_prix && Number(produit.ancien_prix) > Number(produit.prix) && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                {Number(produit.ancien_prix).toLocaleString("fr-FR")} FCFA
                            </span>
                        )}

                    </div>

                    <div className="mt-2 flex items-center justify-between gap-1">

                        <span className="min-w-0 truncate text-[10px] sm:text-xs text-gray-500">
                            {produit.marque_nom || "Sans marque"}
                        </span>

                        <button
                            type="button"
                            aria-label="Ajouter au panier"
                            disabled={Number(produit.stock) <= 0}
                            className="shrink-0 rounded-full bg-[#171717] p-1.5 sm:p-2 text-white transition hover:bg-[#A77C5C] disabled:opacity-40 disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.stopPropagation();

                                addCart({
                                    ...produit,
                                    quantity: 1
                                });
                            }}
                        >
                            <ShoppingCart size={15} />
                        </button>

                    </div>

                </div>

            </motion.article>

        </section>
    );
};

export default ProductsCard;



/* ${} : permet d'injecter du js 

    `` : s'appelle template literal

sans :

let nom = "Yoan"

let message = "salut" + nom + "tu as " + 5 + "produits"

avec :

let message = `salut ${nom} tu as ${5} produits`;


Les cas ou tu peux l'utiliser : 

cas 1 : Texte simple :

`Prix: ${prix}`

cas 2 : Condition

`bg-${couleur}`
`p-4 ${isActive ? bg-red-100 : bg-blue-100}


en js la methode event.stopPropagation() permet d'empecher la propagation d'un evenement dans le DOM.

Par defaut , lorsqu'un evenement est declenche sur un element, il se propage vers ses elements parents. 

Cela signifie que si tu as un evenement click sur un element enfant et que tu cliques dessus, l'evenement sera aussi declenche sur l'element parent.

Exemple :

<div onClick={() => console.log("parent")}>
    <button onClick={() => console.log("enfant")}>
        Clique moi
    </button>
</div>

Quand tu cliques sur le bouton, la console affichera :

enfant
parent


Avec stopPropagation(), tu peux empecher cette propagation et l'evenement ne sera declenche que sur l'element enfant.

<div onClick={() => console.log("parent")}>
    <button onClick={(e) => {
        e.stopPropagation(); 
        console.log("enfant")}}>
        Clique moi
    </button>
</div>

resultat :

enfant

*/