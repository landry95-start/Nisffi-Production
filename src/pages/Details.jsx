
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Heart,
    Truck,
    ShieldCheck,
    RotateCcw,
    Headset,
    ShoppingBag,
    Minus,
    Plus
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../component/CartProvider";

const Details = () => {

    const { addCart, commander } = useCart();

    const location = useLocation();
    const navigate = useNavigate();

    const produit = location.state?.article;
      console.log("Produit reçu dans Details :", produit);

    
    if (!produit) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-2xl mb-4">
                        Produit introuvable
                    </p>

                    <button
                        onClick={() => navigate("/boutique")}
                        className="rounded-lg bg-[#46152F] px-5 py-3 text-white"
                    >
                        Retour à la boutique
                    </button>
                </div>
            </div>
        );
    }

   
    const {
        id,
        nom,
        prix,
        ancien_prix,
        image,
        description,
        categorie_nom,
        taille,
        stock
    } = produit;

    
    const imageUrl = image
        ? `http://localhost:3000${image}`
        : "";

    const [quantity, setQuantity] = useState(1);

    const [productSize, setProductSize] = useState(taille || "");

    const handleAddCart = () => {
        addCart({
            ...produit,
            quantity,
            taille: productSize
        });
    };

    const incrementQuantity = () => {
        setQuantity((current) =>
            Math.min(Number(stock), current + 1)
        );
    };

    const handleWhatsApp = () => {
        const numeroAdmin = "237689090581"
        const message = `Bonjour Landry!, je souhaite commander ce produit. 
        produit :${nom} 
        quantité : ${quantity},
        prix : ${prix} FCFA.
        reference : ${id}`;
        const url = `https://wa.me/${numeroAdmin}/?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <>
            <section></section>

            <section className="px-10 py-10">

                <section className="flex items-start justify-between gap-10">

                    {/* GALERIE DU PRODUIT */}
                    <div className="flex items-start justify-between gap-6">

                        {/* Petites images désactivées */}
                        <div className="flex flex-col gap-4">

                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 opacity-40 cursor-not-allowed"
                                    title="Images supplémentaires non disponibles"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={nom}
                                        className="h-full w-full rounded-2xl object-cover grayscale"
                                    />

                                    <div className="absolute inset-0 bg-gray-300/30" />
                                </div>
                            ))}

                        </div>

                        {/* Image principale */}
                        <div className="relative h-[440px] w-[440px] rounded-2xl bg-gray-100">

                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={nom}
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400">
                                    Image indisponible
                                </div>
                            )}

                            <button
                                type="button"
                                className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow-sm hover:text-red-500"
                            >
                                <Heart size={19} />
                            </button>

                        </div>

                    </div>

                    {/* INFORMATIONS DU PRODUIT */}
                    <div className="flex-1 min-w-0 pt-2">

                        <h4 className="text-xs font-medium uppercase tracking-[3px] text-[#A77C5C]">
                            {categorie_nom}
                        </h4>

                        <h1 className="mt-4 font-['Playfair_Display'] text-4xl font-semibold leading-tight text-[#29211D]">
                            {nom}
                        </h1>

                        <div className="mt-3 flex items-center gap-3">

                            <h4 className="font-['Playfair_Display'] text-2xl font-bold text-red-500">
                                {Number(prix).toLocaleString("fr-FR")} FCFA
                            </h4>

                            {ancien_prix && Number(ancien_prix) > Number(prix) && (
                                <span className="text-gray-400 line-through">
                                    {Number(ancien_prix).toLocaleString("fr-FR")} FCFA
                                </span>
                            )}

                        </div>

                        <p className="mt-5 font-['Playfair_Display'] text-md font-bold text-gray-500">
                            {description || "Un accessoire raffiné qui associe élégance et praticité."}
                        </p>

                        {/* TAILLE */}
                        <div className="mt-6">

                            <h3 className="text-sm font-semibold text-[#29211D]">
                                Taille :
                                <span className="font-normal ml-1">
                                    {productSize || "Non renseignée"}
                                </span>
                            </h3>

                            {taille && (
                                <div className="mt-3 flex gap-3">
                                    <button
                                        type="button"
                                        className="h-10 w-12 rounded-lg border border-[#29211D] text-xs text-[#29211D]"
                                    >
                                        {taille}
                                    </button>
                                </div>
                            )}

                            <div className="mt-5 flex items-center gap-2">
                                <span className="text-xs text-gray-600">
                                    En stock :
                                </span>

                                <span className={`text-xs font-semibold ${Number(stock) > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {Number(stock) > 0 ? `${stock} disponible(s)` : "Rupture de stock"}
                                </span>
                            </div>

                        </div>

                        {/* QUANTITÉ ET PANIER */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">

                            <div className="flex h-11 items-center gap-4 rounded-full border border-gray-300 px-4">

                                <button
                                    type="button"
                                    aria-label="Diminuer la quantité"
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    <Minus size={14} />
                                </button>

                                <span className="text-sm">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    aria-label="Augmenter la quantité"
                                    disabled={quantity >= Number(stock)}
                                    onClick={incrementQuantity}
                                >
                                    <Plus size={14} />
                                </button>

                            </div>

                            <button
                                type="button"
                                disabled={Number(stock) <= 0}
                                className="flex h-11 flex-1 items-center justify-center gap-3 rounded-full bg-[#191919] px-5 text-sm font-medium text-white transition hover:bg-[#A77C5C] disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={handleAddCart}
                            >
                                <ShoppingBag size={17} />
                                Ajouter au panier
                            </button>

                            <button
                                type="button"
                                className="flex h-11 w-12 items-center justify-center rounded-full border border-gray-300 transition hover:border-red-400 hover:text-red-500"
                            >
                                <Heart size={19} />
                            </button>

                        </div>

                        <button
                            type="button"
                            disabled={Number(stock) <= 0}
                            onClick={handleWhatsApp}
                            className="mt-7 flex h-11 w-full items-center justify-center gap-3 rounded-full bg-green-500 px-5 text-sm font-medium text-white transition hover:bg-[#A77C5C] disabled:opacity-40"
                        >
                            <FaWhatsapp className="h-5 w-5" />
                            Commander sur Whatsapp
                        </button>

                    </div>

                </section>

            </section>

            {/* SERVICES */}
            <section className="mx-10 mt-10 border-t border-gray-200 py-6">

                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

                    <div className="flex items-center justify-center gap-3 border-gray-200 md:border-r">
                        <Truck size={24} strokeWidth={1.5} />
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Livraison rapide
                            </h4>
                            <p className="mt-1 text-[11px] text-gray-500">
                                Partout à Yaoundé
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 border-gray-200 md:border-r">
                        <ShieldCheck size={24} strokeWidth={1.5} />
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Paiement sécurisé
                            </h4>
                            <p className="mt-1 text-[11px] text-gray-500">
                                100% fiable
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 border-gray-200 md:border-r">
                        <RotateCcw size={24} strokeWidth={1.5} />
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Retour sous 7 jours
                            </h4>
                            <p className="mt-1 text-[11px] text-gray-500">
                                Selon nos conditions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <Headset size={24} strokeWidth={1.5} />
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Service client
                            </h4>
                            <p className="mt-1 text-[11px] text-gray-500">
                                Disponible 7j/7
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            

        </>
    );
};

export default Details;
