import React, { useEffect, useState } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import FeatureProductBox from "../component/UI/FeatureProductBox";
import FullPageLoader from "../component/Loaders/CategoryLoader/FullPageLoader";

const MainBox = styled.div`
  height: 93vh;
  width: 75%;
  margin: 0 auto;
  height: fit-content;
  padding: 8rem 3rem;
  display: flex;
  flex-direction: column;

  span {
    text-transform: capitalize;
    color: #777;
    font-size: 1.6rem;
    margin-bottom: -2.3rem;
  }

  @media only screen and (max-width: 1099px) {
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;

    span {
      font-size: 1.3rem;
      padding: 0 1rem;
    }
    p {
      font-size: 1.3rem;
      margin-bottom: 4rem;
    }
  }
`;
const DetailPara = styled.p`
  color: #777;
  font-size: 1.6rem;
  @media only screen and (max-width: 1099px) {
    padding: 0 1rem;
  }
`;
const HeadingAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    text-transform: capitalize;
    font-size: 5.7rem;
    font-weight: 400;
    margin-top: 4rem;
    margin-bottom: 4rem;
    color: black;
  }
  @media only screen and (max-width: 1099px) {
    h1 {
      font-size: 4rem;
      margin-top: 4rem;
      margin-bottom: 1.2rem;
      padding: 0 1rem;
    }
  }
`;

const FilterAndSearchBox = styled.div`
  display: flex;
  gap: 1rem;
  width: 40%;
  @media only screen and (max-width: 1099px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: -1rem;
  }
`;
const Input = styled.input`
  width: 70%;
  padding: 1rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
  outline: none;
  @media only screen and (max-width: 1099px) {
    width: 80%;
  }
`;
const ResultAndFilter = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 1099px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Select = styled.select`
  padding: 1rem 2rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 0.04rem;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
`;

const ProductsDiv = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

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
    width: 28rem;
    height: 34rem;
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
const LastBtn = styled.button`
  border: 1px solid #ededed;
  width: 15%;
  padding: 1rem;
  background-color: transparent;
  line-height: 2.3rem;
  font-weight: 500;
  display: block;
  margin: 0 auto;
  color: #777;
  @media only screen and (max-width: 1099px) {
    width: 50%;
  }
`;
const EmptyPara = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c9c8c8;
  font-size: 2.4rem;
  letter-spacing: 0.2rem;
  line-height: 1.5rem;
  @media only screen and (max-width: 1099px) {
    font-size: 2rem;
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
    setAllProducts(data.products);
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
      return item.title.toLowerCase().includes(val.toLowerCase());
    });
    setFilteredProducts(arr);
  };

  return (
    <>
      {isLoading && <FullPageLoader />}

      {!isLoading && (
        <>
          <Navbar />
          <MainBox id="productspageDiv">
            <span>Home / {path}</span>
            <HeadingAndSearch>
              <h1>{path}</h1>
            </HeadingAndSearch>

            <ResultAndFilter>
              <DetailPara>Showing all results</DetailPara>{" "}
              <FilterAndSearchBox>
                <Input
                  type="text"
                  id="search"
                  placeholder="Search products..."
                  onChange={onChangeHandler}
                />
                <Select name="searchFilter" id="searchFilter">
                  <option value="default" defaultValue>
                    Sort by price: popularity
                  </option>
                  <Option value="lowToHigh">Sort by price: low to high</Option>
                  <Option value="highToLow">Sort by price: high to low</Option>
                </Select>
              </FilterAndSearchBox>
            </ResultAndFilter>

            {!isLoading && allProducts && filteredProducts.length > 0 && (
              <>
                <ProductsDiv>
                  {allProducts &&
                    filteredProducts.map((item) => {
                      console.log(item);
                      const colors = item.color.split(",");
                      const image = item.images.split(" ")[0];

                      return (
                        <Link
                          to={`/product/${item.category}/${item.slug}/${item.id}`}
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
                <LastBtn>No more products to show</LastBtn>
              </>
            )}
            {!isLoading && allProducts && filteredProducts.length === 0 && (
              <EmptyPara data-aos="zoom-in">No products found....</EmptyPara>
            )}
          </MainBox>
          <Footer />
        </>
      )}
    </>
  );
};

export default Products;
