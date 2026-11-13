
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../component/CartProvider";

export default function Cart() {
  const { cart, removeArticle, removeCart ,updateQuantity} = useCart();

  const prixTotal = cart.reduce(
    (total, item) => total + Number(item.prix) * item.quantity,
    0
  );
  

  return (
    <main className="bg-[#F8F6F5] min-h-screen px-4 py-10 md:px-10 lg:px-20">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#46152F] mb-2">
              Mon panier
            </h1>

            <p className="text-gray-500 mb-10">
              Retrouvez les articles que vous avez sélectionnés.
            </p>
          </div>
          <div className="flex gap-2 items-center text-red-500 cursor-pointer"
            onClick={() => removeCart()}
          >
            <p className="text-sm">Supprimer tous les articles</p>
            <Trash2 size={18} />
          </div>
        </div>

        {cart.length === 0 ? (

          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <ShoppingBag className="w-14 h-14 mx-auto text-gray-400 mb-4" />

            <h2 className="text-xl font-semibold mb-2">
              Votre panier est vide
            </h2>

            <p className="text-gray-500 mb-6">
              Découvrez nos articles et trouvez votre prochain coup de cœur.
            </p>

            <Link
              to="/boutique"
              className="inline-block bg-[#46152F] text-white px-7 py-3 rounded-lg hover:bg-[#6A2345] transition"
            >
              Découvrir la boutique
            </Link>
          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

           
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm"
                >

                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:3000${item.image}`
                    }
                    alt={item.nom}
                    className="w-full sm:w-32 h-36 object-cover rounded-lg"
                  />

                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.nom}
                      </h2>

                      <p className="text-[#A77C5C] font-medium mt-2">
                        {Number(item.prix).toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-5">

                     
                      <div className="flex items-center border rounded-lg">

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-100"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-4">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      <button
                        onClick={() => removeArticle(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Supprimer</span>
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <aside className="bg-white rounded-xl p-6 shadow-sm h-fit">

              <h2 className="text-xl font-semibold mb-6">
                Résumé de la commande
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Articles</span>
                <span>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Sous-total</span>
                <span>
                  {prixTotal.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#46152F]">
                  {prixTotal.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              <button
                className="w-full mt-7 bg-[#46152F] text-white py-3 rounded-lg hover:bg-[#6A2345] transition"
              >
                Commander
              </button>

              <Link
                to="/boutique"
                className="block text-center text-sm text-gray-500 mt-5 hover:text-[#46152F]"
              >
                Continuer mes achats
              </Link>

            </aside>

          </div>

        )}

      </div>
    </main>
  );
}
