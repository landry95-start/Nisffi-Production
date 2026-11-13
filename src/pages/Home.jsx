import React from 'react'
import Swipper from '../component/Swipper'
import HeroBanner from '../component/HeroBanner'
import CategoryList from '../component/CategoryList'
import ProductCard from '../component/ProductCard'

const Home = () => {
  return (
    <>
      <Swipper />
      <HeroBanner />
      <CategoryList />
      <ProductCard />
    </>
  )
}

export default Home