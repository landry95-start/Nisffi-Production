import React from "react";
import { useProducts } from "../component/DashboardAdmin/ContextProduct";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../component/CartProvider"; 

const Nouveaute = () => {

  const navigate = useNavigate();

  const { products, loading, error } = useProducts();

  const {addCart} = useCart();

  const produitsHomme = products.filter(
    (produit) => produit.univers === "Homme"
  );

  console.log("Tous les produits :", products);

  console.log("Produits Homme :", produitsHomme);

  const formatPrice = (prix) => {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Chargement des produits...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[3px] text-[#A77C5C] mb-2">
          Collection masculine
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#46152F]">
          Nos produits pour homme
        </h1>

        <p className="text-gray-500 mt-2">
          Découvrez notre sélection de produits.
        </p>
      </div>

      
      {produitsHomme.length === 0 ? (

        <div className="py-16 text-center">
          <p className="text-gray-500">
            Aucun produit disponible pour le moment.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

          {produitsHomme.map((produit) => (

            
            <motion.article
                className="group rounded-xl border border-[#EAE5DF] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate("/details", {
                  state: { article: produit }
                })}
            >

                
                <div className="relative h-52 overflow-hidden rounded-xl bg-[#F5EADF]">

                    <img
                        src={`http://localhost:3000${produit.image}`}
                        alt={produit.nom}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {produit.ancien_prix && Number(produit.ancien_prix) > Number(produit.prix) && (
                        <span className="absolute left-3 top-3 rounded-full bg-pink-600 px-3 py-1 text-xs font-semibold text-white">
                            Promo
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow-sm hover:text-red-500"
                    >
                        <Heart size={17} />
                    </button>

                </div>

               
                <div className="p-3">

                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                        {produit.categorie_nom}
                    </p>

                    <h3 className="mt-1 line-clamp-1 text-sm font-medium text-[#29211D]">
                        {produit.nom}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">

                        <span className="text-sm font-bold">
                            {Number(produit.prix).toLocaleString("fr-FR")} FCFA
                        </span>

                        {produit.ancien_prix && Number(produit.ancien_prix) > Number(produit.prix) && (
                            <span className="text-xs text-gray-400 line-through">
                                {Number(produit.ancien_prix).toLocaleString("fr-FR")} FCFA
                            </span>
                        )}

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                        <span className="text-xs text-gray-500">
                            {produit.marque_nom || "Sans marque"}
                        </span>

                        <button
                            type="button"
                            aria-label="Ajouter au panier"
                            disabled={Number(produit.stock) <= 0}
                            className="rounded-full bg-[#171717] p-2 text-white transition hover:bg-[#A77C5C] disabled:opacity-40 disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.stopPropagation();

                                addCart({
                                    ...produit,
                                    quantity: 1
                                });
                            }}
                        >
                            <ShoppingCart size={16} />
                        </button>

                    </div>

                </div>

            </motion.article>

          ))}

        </div>

      )}

    </section>
  );
};

export default Nouveaute;
