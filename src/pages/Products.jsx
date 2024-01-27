import React, { useEffect, useState } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import FeatureProductBox from "../component/UI/FeatureProductBox";
import InfiniteScroll from "react-infinite-scroll-component";
import FullPageLoader from "../component/Loaders/CategoryLoader/FullPageLoader";

const MainBox = styled.div`
  height: 93vh;
  width: 75%;
  margin: 0 auto;
  height: fit-content;
  padding: 1rem 2rem;
  @media only screen and (max-width: 949px) {
    width: 100%;
    height: 93vh;
    padding: 1rem;
  }
`;
const HeadingAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
  h1 {
    text-transform: capitalize;
  }
  input {
    width: 20%;
    padding: 0.6rem 1rem;
    border: 1px solid #e8e8e8;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
    outline: none;
    @media only screen and (max-width: 949px) {
      width: 40%;
    }
  }
`;

const ResultAndFilter = styled.div``;

const ProductsDiv = styled.div`
  /* background-color: red; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  overflow: auto;
  height: 77vh;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
  }
  div {
    padding: 0.7rem;
  }
  img {
    width: 22rem;
    height: 28rem;
  }
  @media only screen and (min-width: 1100px) and (max-width: 1550px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 1099px) {
    grid-template-columns: repeat(2, 1fr);
    img {
      width: 14rem;
      height: 20rem;
    }
    h3 {
      font-size: 1.9rem;
    }
    span {
      gap: 0;
    }
  }
`;

const Products = (props) => {
  const path = useParams().category;
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const fetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/product/category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: path }),
      }
    );
    const data = await res.json();
    console.log(data.products);
    setAllProducts(data.products.reverse());
    setFilteredProducts(data.products.reverse());

    setIsLoading(false);
  };
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetcher();
    return () => {};
  }, [path]);

  const onChangeHandler = (e) => {
    const val = e.target.value;
    const arr = allProducts.filter((item) => {
      return item.title.includes(val);
    });
    setFilteredProducts(arr);
  };

  return (
    <>
      {!allProducts && isLoading && <FullPageLoader />}
      <Navbar />
      <MainBox id="productspageDiv">
        {" "}
        <HeadingAndSearch>
          <h1>{path}</h1>
          <input
            type="text"
            id="search"
            placeholder="Search here.."
            onChange={onChangeHandler}
          />
        </HeadingAndSearch>
        <ResultAndFilter></ResultAndFilter>
        <ProductsDiv>
          {allProducts &&
            filteredProducts.map((item) => {
              const colors = item.color.split(",");
              const image = item.images.split(" ")[0];

              return (
                <Link
                  to={`/product/${item.slug}`}
                  key={item.id + item.title}
                  state={{ productId: `${item.id}` }}
                >
                  <FeatureProductBox
                    data-aos="fade-up"
                    key={item.title}
                    data={{ ...item, colors: colors, img: image }}
                  />
                </Link>
              );
            })}
        </ProductsDiv>
      </MainBox>
      <Footer />
    </>
  );
};

export default Products;
