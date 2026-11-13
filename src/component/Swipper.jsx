import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

import femme2 from '../../src/assets/femme2.png'
import femme3 from '../../src/assets/femme3.jpeg'
import homme from '../../src/assets/homme.jpeg'

const slides = [
  {
    tag: 'NOUVELLE COLLECTION',
    title: 'Sublimez votre style',
    description: 'Des accessoires et articles de mode soigneusement sélectionnés pour une allure unique, chaque jour.',
    image: femme2,
  },
  {
    tag: 'ÉLÉGANCE AU QUOTIDIEN',
    title: 'Révélez votre élégance',
    description:
      'Découvrez des pièces raffinées pour sublimer toutes vos tenues.',
    image: femme3,
  },
  {
    tag: 'COLLECTION EXCLUSIVE',
    title: 'Le luxe dans chaque détail',
    description:
      'Des accessoires sélectionnés pour affirmer votre personnalité.',
    image: homme,
  },
]

const Swipper = () => {
  return (
    <section className="overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[300px] items-center
                         bg-cover bg-center px-6 py-12
                         sm:min-h-[400px] sm:px-12
                         lg:min-h-[500px] lg:px-16"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r
                              from-[#f7dfd0] via-[#f7dfd0]/80
                              to-transparent" />

              <div className="relative z-10 max-w-lg">
                <p className="mb-4 text-xs tracking-[0.3em]
                              text-[#800d36]">
                  {slide.tag}
                </p>

                <h1 className="mb-5 font-serif text-4xl
                               leading-tight text-[#800d36]
                               sm:text-5xl lg:text-7xl">
                  {slide.title}
                </h1>

                <p className="mb-7 max-w-sm text-sm leading-6
                              text-gray-800">
                  {slide.description}
                </p>

                <Link to="/boutique"
                  className="inline-flex rounded-full
                             bg-[#800d36] px-6 py-3
                             text-sm font-medium text-white
                             transition hover:bg-[#5e0928]"
                >
                  Découvrir la collection →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Swipper