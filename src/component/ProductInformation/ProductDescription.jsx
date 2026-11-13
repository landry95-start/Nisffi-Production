import React from 'react';
import { Check } from 'lucide-react';

const ProductDescription = ({ produit }) => {

    return (
        <div>

            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#29211D]">
                {produit.titreDescription}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
                {produit.description}
            </p>

            <div className="mt-5 flex flex-col gap-4">

                {(produit.avantages || []).map((avantage, index) => (
                    <div key={index} className="flex items-center gap-3">

                        <Check size={17} className="shrink-0 text-[#29211D]" />

                        <span className="text-sm text-gray-600">
                            {avantage}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ProductDescription;

