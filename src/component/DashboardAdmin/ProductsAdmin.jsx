
import React, { useState } from "react";
import { Pencil, Trash2, Package, Plus } from "lucide-react";
import { useProducts } from "./ContextProduct";
import { useNavigate } from "react-router-dom";

const ProductsAdmin = () => {

    const navigate = useNavigate();

    const { products, deleteProduct } = useProducts();

    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id) => {

        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible."
        );

        if (!confirmation) return;

        try {
            setDeletingId(id);

            await deleteProduct(id);

            alert("Produit supprimé avec succès.");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Une erreur est survenue lors de la suppression."
            );

        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#FCFAFB] p-3 sm:p-5 md:p-8">

           
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#46152F]">
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate('product-form')}
                    className="flex items-center justify-center gap-2 bg-[#46152F] text-white px-5 py-3 rounded-lg opacity-60 cursor-pointer w-full sm:w-auto"
                >
                    <Plus size={18} />
                    Ajouter un produit
                </button>

            </div>

            
            <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 mb-6 flex items-center gap-4">

                <div className="w-12 h-12 rounded-lg bg-[#F5EAF0] flex items-center justify-center shrink-0">
                    <Package className="text-[#46152F]" size={24} />
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Total des produits
                    </p>

                    <p className="text-2xl font-bold text-[#46152F]">
                        {products.length}
                    </p>
                </div>

            </div>

            {/* TABLEAU */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

                <div className="p-4 sm:p-5 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                        Tous les produits
                    </h2>
                </div>

                {products.length === 0 ? (

                    <div className="py-16 text-center px-4">

                        <Package
                            size={45}
                            className="mx-auto text-gray-300 mb-4"
                        />

                        <h3 className="font-semibold text-gray-700">
                            Aucun produit disponible
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Les produits ajoutés apparaîtront ici.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[850px] text-left">

                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">

                                <tr>
                                    <th className="px-5 py-4">Produit</th>
                                    <th className="px-5 py-4">Catégorie</th>
                                    <th className="px-5 py-4">Marque</th>
                                    <th className="px-5 py-4">Prix</th>
                                    <th className="px-5 py-4">Stock</th>
                                    <th className="px-5 py-4 text-center">Actions</th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {products.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition"
                                    >

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                {product.image ? (
                                                    <img
                                                        src={`http://localhost:3000${product.image}`}
                                                        alt={product.nom}
                                                        className="w-14 h-14 rounded-lg object-cover bg-[#F3E9DF] shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                                        <Package size={20} className="text-gray-400" />
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {product.nom}
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        ID : {product.id}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {product.categorie_nom || "Sans catégorie"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {product.marque_nom || "Sans marque"}
                                        </td>

                                        <td className="px-5 py-4 text-sm font-semibold text-[#46152F]">
                                            {Number(product.prix).toLocaleString("fr-FR")} FCFA
                                        </td>

                                        <td className="px-5 py-4">

                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                Number(product.stock) > 0
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {product.stock} disponible(s)
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => navigate('product-form/')}
                                                    title="Modification à connecter ensuite"
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 opacity-50 cursor-not-allowed"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deletingId === product.id}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 disabled:opacity-40"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </main>
    );
};

export default ProductsAdmin;
