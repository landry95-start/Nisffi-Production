
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ImagePlus, Plus, Trash2 } from "lucide-react";

import { useCategories } from "./DashboardAdmin/ContextCategory";

const productSchema = z.object({

  nom: z.string()
    .trim()
    .min(1, "Le nom du produit est obligatoire"),

  categorie: z.string()
    .min(1, "Veuillez choisir une catégorie"),

  marque: z.string().optional(),

  prix: z.coerce.number()
    .positive("Le prix doit être supérieur à 0"),

  ancienPrix: z.union([
    z.literal(""),
    z.coerce.number().positive("L'ancien prix doit être positif"),
  ]).optional(),

  univers: z.enum(["Femme", "Homme", "Gadget"], {
    message: "Veuillez choisir un univers"
  }),

  stock: z.coerce.number()
    .int("Le stock doit être un nombre entier")
    .min(0, "Le stock ne peut pas être négatif"),

  couleur: z.string().optional(),

  taille: z.string().optional(),

  description: z.string()
    .max(1000, "La description est trop longue")
    .optional(),

}).refine(
  (data) => {
    if (data.ancienPrix === "" || data.ancienPrix === undefined) {
      return true;
    }

    return data.ancienPrix > data.prix;
  },
  {
    message: "L'ancien prix doit être supérieur au prix actuel",
    path: ["ancienPrix"],
  }
);

export default function ProductForm({
  onClose,
  onSubmit,
  marques = []
}) {

  // Image principale
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Images supplémentaires
  const [imagesSupplementaires, setImagesSupplementaires] = useState([]);

  const [submitError, setSubmitError] = useState("");

  // Référence pour nettoyer les aperçus
  const previewUrls = useRef(new Set());

  const { categories } = useCategories();

  // Nettoyage des URL temporaires à la fermeture du composant
  useEffect(() => {
    return () => {
      previewUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      previewUrls.current.clear();
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),

    defaultValues: {
      nom: "",
      categorie: "",
      marque: "",
      prix: "",
      ancienPrix: "",
      univers: "",
      stock: "",
      couleur: "",
      taille: "",
      description: "",
    },
  });

  // Vérification d'une image
  const validateImage = (file) => {

    const formatsAutorises = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!formatsAutorises.includes(file.type)) {
      return "Format non autorisé. Utilisez JPG, PNG ou WEBP.";
    }

    if (file.size > 2 * 1024 * 1024) {
      return "Chaque image ne doit pas dépasser 2 Mo.";
    }

    return null;
  };

  // Sélectionner l'image principale
  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const error = validateImage(file);

    if (error) {
      alert(error);
      e.target.value = "";
      return;
    }

    // Nettoyer l'ancien aperçu
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      previewUrls.current.delete(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    previewUrls.current.add(preview);

    setImage(file);
    setImagePreview(preview);

    e.target.value = "";
  };

  // Sélectionner les images supplémentaires
  const handleAdditionalImages = (e) => {

    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const nombreRestant = 5 - imagesSupplementaires.length;

    if (files.length > nombreRestant) {
      alert(`Vous pouvez ajouter encore ${nombreRestant} image(s) maximum.`);
      e.target.value = "";
      return;
    }

    // Vérifier tous les fichiers avant de les ajouter
    for (const file of files) {

      const error = validateImage(file);

      if (error) {
        alert(error);
        e.target.value = "";
        return;
      }
    }

    const nouvellesImages = files.map((file) => {

      const preview = URL.createObjectURL(file);

      previewUrls.current.add(preview);

      return {
        file,
        preview
      };
    });

    setImagesSupplementaires((prev) => [
      ...prev,
      ...nouvellesImages
    ]);

    e.target.value = "";
  };

  // Supprimer une image supplémentaire
  const removeAdditionalImage = (index) => {

    const imageASupprimer = imagesSupplementaires[index];

    if (imageASupprimer) {
      URL.revokeObjectURL(imageASupprimer.preview);
      previewUrls.current.delete(imageASupprimer.preview);
    }

    setImagesSupplementaires((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Soumission du formulaire
  const submitProduct = async (data) => {

    setSubmitError("");

    try {

      if (!onSubmit) {
        throw new Error("La fonction onSubmit n'a pas été transmise.");
      }

      if (!image) {
        throw new Error("Veuillez sélectionner une image principale.");
      }

      await onSubmit({
        ...data,

        ancienPrix: data.ancienPrix === ""
          ? null
          : data.ancienPrix,

        image,

        images: imagesSupplementaires.map((item) => item.file)
      });

      setImage(null);
      setImagePreview("");
      setImagesSupplementaires([]);

      onClose?.();

    } catch (error) {

      setSubmitError(
        error.response?.data?.message ||
        error.message ||
        "Une erreur est survenue lors de l'ajout du produit."
      );
    }
  };

  const InputError = ({ message }) => (
    message ? (
      <p className="text-xs text-red-600 mt-1">{message}</p>
    ) : null
  );

  const inputClass =
    "w-full border border-[#EDE3E7] rounded-lg p-3 outline-none focus:border-[#46152F] focus:ring-2 focus:ring-[#46152F]/10";

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

        <div className="flex items-center justify-between p-6 border-b border-[#EDE3E7]">

          <div>
            <h2 className="text-xl font-bold text-[#46152F]">
              Ajouter un produit
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Renseignez les informations du produit.
            </p>
          </div>

          <button type="button" onClick={onClose}>
            <X size={22} className="text-gray-500" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(submitProduct)}
          className="p-6 space-y-5"
        >

          {/* Image principale */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Image principale *
            </label>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8B8CC] rounded-xl bg-[#FCF8FA] p-6 cursor-pointer hover:bg-[#F8EDF2]">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Aperçu du produit"
                  className="h-32 w-32 object-cover rounded-lg"
                />

              ) : (

                <>
                  <ImagePlus size={30} className="text-[#46152F]" />

                  <span className="text-sm text-gray-600">
                    Cliquez pour sélectionner une image
                  </span>

                  <span className="text-xs text-gray-400">
                    PNG, JPG ou WEBP — 2 Mo maximum
                  </span>
                </>

              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>
          </div>

          {/* Images supplémentaires */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-medium">
                Images supplémentaires (facultatif)
              </label>

              <span className="text-xs text-gray-400">
                {imagesSupplementaires.length}/5
              </span>

            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">

              {imagesSupplementaires.map((item, index) => (

                <div
                  key={item.preview}
                  className="relative aspect-square"
                >

                  <img
                    src={item.preview}
                    alt={`Image supplémentaire ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-[#EDE3E7]"
                  />

                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    aria-label="Supprimer cette image"
                  >
                    <X size={14} />
                  </button>

                </div>

              ))}

              {imagesSupplementaires.length < 5 && (

                <label className="aspect-square flex flex-col items-center justify-center gap-1 border-2 border-dashed border-[#E8B8CC] rounded-lg bg-[#FCF8FA] cursor-pointer hover:bg-[#F8EDF2]">

                  <Plus size={24} className="text-[#46152F]" />

                  <span className="text-xs text-gray-500 text-center">
                    Ajouter
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleAdditionalImages}
                    className="hidden"
                  />

                </label>

              )}

            </div>

            <p className="text-xs text-gray-400 mt-2">
              Vous pouvez ajouter jusqu'à 5 images. Chaque image ne doit pas dépasser 2 Mo.
            </p>

          </div>

          {/* Nom */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Nom du produit *
            </label>

            <input
              {...register("nom")}
              placeholder="Ex : Sac à main élégant"
              className={inputClass}
            />

            <InputError message={errors.nom?.message} />
          </div>

          {/* Catégorie, marque, univers et prix */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-2">
                Catégorie *
              </label>

              <select
                {...register("categorie")}
                className={inputClass}
              >
                <option value="">Choisir une catégorie</option>

                {categories.map((categorie) => (
                  <option
                    key={categorie.id}
                    value={categorie.id}
                  >
                    {categorie.nom}
                  </option>
                ))}
              </select>

              <InputError message={errors.categorie?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Marque (facultatif)
              </label>

              <select
                {...register("marque")}
                className={inputClass}
              >
                <option value="">Aucune marque</option>

                {marques.map((marque) => (
                  <option
                    key={marque.id}
                    value={marque.id}
                  >
                    {marque.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Univers du produit *
              </label>

              <select
                {...register("univers")}
                className={inputClass}
              >
                <option value="">Choisir un univers</option>
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
                <option value="Gadget">Gadget</option>
              </select>

              <InputError message={errors.univers?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Prix (FCFA) *
              </label>

              <input
                type="number"
                min="1"
                {...register("prix")}
                placeholder="25000"
                className={inputClass}
              />

              <InputError message={errors.prix?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Ancien prix (FCFA)
              </label>

              <input
                type="number"
                min="1"
                {...register("ancienPrix")}
                placeholder="30000"
                className={inputClass}
              />

              <InputError message={errors.ancienPrix?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantité en stock *
              </label>

              <input
                type="number"
                min="0"
                {...register("stock")}
                placeholder="15"
                className={inputClass}
              />

              <InputError message={errors.stock?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Couleur
              </label>

              <input
                {...register("couleur")}
                placeholder="Noir, beige..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Taille
              </label>

              <input
                {...register("taille")}
                placeholder="S, M, L, XL..."
                className={inputClass}
              />
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              placeholder="Décrivez votre produit..."
              className={`${inputClass} resize-none`}
            />

            <InputError message={errors.description?.message} />
          </div>

          {/* Erreur serveur */}

          {submitError && (
            <p className="text-sm text-red-600">
              {submitError}
            </p>
          )}

          {/* Boutons */}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#EDE3E7]">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-gray-200 text-gray-600"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#46152F] text-white hover:bg-[#6A2345] disabled:opacity-60"
            >
              <Plus size={18} />

              {isSubmitting
                ? "Enregistrement..."
                : "Ajouter le produit"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
