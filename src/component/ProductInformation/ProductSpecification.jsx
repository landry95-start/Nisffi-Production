import React from 'react'

export const ProductSpecification = ({ produit }) => {
  return (
    <div className="border-l border-gray-200 pl-8">
        
        <h3 className="mb-4 font-['Playfair_Display'] text-lg font-semibold">
            Détails du produit
        </h3>

        <div className="flex justify-between gap-4 border-b border-gray-100 py-3 text-sm">
            <span className="text-gray-700">Matiere</span>
            <span className="text-gray-500">{produit.details.Matière}</span>
        </div>

        <div className="flex justify-between gap-4 border-b border-gray-100 py-3 text-sm">
            <span className="text-gray-700">Dimensions</span>
            <span className="text-gray-500">{produit.details.Dimensions}</span>
        </div>

        <div className="flex justify-between gap-4 border-b border-gray-100 py-3 text-sm">
            <span className="text-gray-700">Poid</span>
            <span className="text-gray-500">{produit.details.Poids}</span>
        </div>

        <div className="flex justify-between gap-4 border-b border-gray-100 py-3 text-sm">
            <span className="text-gray-700">Marque</span>
            <span className="text-gray-500">{produit.details.Marque}</span>
        </div>

    </div>
  )
}
