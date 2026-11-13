import React from 'react'
import { ChevronRight } from 'lucide-react'


const categories = [
  { id: 1, label: 'Vêtements', href: '/categorie/vetements' },
  { id: 2, label: 'Chaussures', href: '/categorie/chaussures' },
  { id: 3, label: 'Sacs', href: '/categorie/sacs' },
  { id: 4, label: 'Accessoires', href: '/categorie/accessoires' },
  { id: 5, label: 'Maison & Gadgets', href: '/categorie/maison-gadgets' },
]


const CategorySidebar = () => {

  return (
    <aside className="w-64 shrink-0 rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold text-[#46152F]">Toutes les catégories</h2>
        <nav>
            <ul>
                {categories.map((category)=> (
                    <li key={category.id}>
                        <a href='#' className="flex items-center justify-between rounded-md px-3 py-3 text-sm 
                            text-gray-700 transition hover:bg-[#F5E9E9] hover:text-[#46152F]">
                                {category.label}
                                <ChevronRight size={16} />
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
  )
}

export default CategorySidebar