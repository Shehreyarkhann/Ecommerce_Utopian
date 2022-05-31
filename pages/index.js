import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client.js";

export default function Home({ productsData, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className="products-heading">
        <h2 className="text-2xl font-bold"> UTOPIAN PRIME </h2>
        <p>Welcome to the new Era of E Commerce</p>
      </div>
      <div className="products-container">
        {productsData.map((product) => (
        <Product key={product._id} product={product}/>))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const productsData = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  console.log(bannerData);
  return { props: { productsData, bannerData } };
};
