import React, {useState} from 'react'
import ProductCaracteristique from './ProductCaracteristique'
import ProductDescription from './ProductDescription'
import ProductReview from './ProductReview'
import { ProductSpecification } from './ProductSpecification'

const ProductInformation = ({produit}) => {


    const tabs = [
        { id: "description", label: "Description" },
        { id: "caracteristiques", label: "Caractéristiques" },
        { id: "avis", label: "Avis" }
    ]

    const [activeTab, setActiveTab] = useState("description");
     

  return (
    <section className="mx-10 mt-8 rounded-xl bg-white px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
                <div className="flex gap-8 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 text-sm transition ${
                                activeTab === tab.id
                                ? "border-b-2 border-black font-semibold text-black"
                                : "text-gray-500 hover:text-black"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className='mt-4'>
                    {activeTab==="description" && 
                        <ProductDescription produit={produit}/>
                    }

                    {activeTab==="caracteristiques" && (
                        <ProductCaracteristique produit={produit} />
                    )}
                </div>
            </div>

            <ProductSpecification produit={produit} />
        </div>

    </section>
  )
}

export default ProductInformation