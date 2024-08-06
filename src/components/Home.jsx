import React, { useContext, useEffect } from 'react';
import HeroSection from './HeroSection';
import ProductSlider from './ProductSliders';
import OffersBanner from './OffersBanner';
import Footer from './Footer';
import NewsLetter from './NewsLetter';
import Featured from './Featured';
import Category from './Category';
import ProductList from './ProductList';
import { UserContext } from './Context Api/UserAuthContext';

export default function Home() {
  
  return (
    <div>
        <HeroSection/>
        <Category/>
        <ProductSlider title="Featured Product" description=" Do not misss the current offers until the end of march." image="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg"/>
        <OffersBanner/>
        <ProductList title="New Products" description="New Products with updated Stock.." image="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg" />
        <NewsLetter/>
        <Featured/>
       
        
    </div>
  )
}
