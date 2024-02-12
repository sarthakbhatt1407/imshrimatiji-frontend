import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
moment().format();
const MainDiv = styled.div`
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  height: fit-content;
  padding: 3rem;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 2rem 0;
    text-align: center;
  }
  @media only screen and (max-width: 949px) {
    grid-template-columns: 1fr;

    padding: 0;
    h3 {
    }
  }
`;

const AddressFormBox = styled.div``;

const ItemsAndPriceTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 2rem;
  /* background-color: red; */
  height: 100%;
  max-height: 100%;
  @media only screen and (max-width: 1220px) {
    justify-content: start;
    align-items: start;
    padding: 1rem;
  }
`;

const ProductsTable = styled.table`
  width: 80%;
  border: 1px solid #dadada;
  height: fit-content;
  thead {
    background-color: #f1f2f2;
    tr {
      td {
        padding: 1rem;
        color: #5e5e5e;
        text-transform: capitalize;
        font-size: 1.5rem;
        font-weight: bold;
        &:first-child {
          text-align: center;
        }
        @media only screen and (max-width: 1220px) {
          font-size: 1.2rem;
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #e5e5e5;
      td {
        padding: 1rem;
        font-size: 1.5rem;
        color: black;
        text-transform: capitalize;
        a {
          color: black;
          text-decoration: none;
        }
        button {
          border: none;
          padding: 0.2rem 1rem;
          margin: 0 1rem;
          border-radius: 50%;
        }
        svg {
          color: #b5b5b5;
          margin: 0 0.5rem;
          transform: scale(1.4);
          transform: all 0.5s;
          &:hover {
            color: black;
            cursor: pointer;
          }
        }
      }
      @media only screen and (max-width: 1220px) {
        td {
          font-size: 1.6rem;
          color: #000000;

          span {
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1220px) {
    width: 100%;
  }
`;

const ProductImgTextBox = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  gap: 2rem;
  div {
    p {
      color: #8e8e8e;
    }
  }
  img {
    width: 6rem;
    border-radius: 0.4rem;
    display: inline;
    margin-right: 1rem;
  }
  p {
    text-transform: capitalize;
    display: inline;
    font-size: 1.5rem;
    color: #424242;
    font-weight: bold;
  }
  @media only screen and (max-width: 1220px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    text-align: center;

    p {
      font-size: 1.25rem;
    }
    img {
      width: 7rem;
      margin-right: 0;
    }
  }
`;

const PriceTotalTable = styled.table`
  width: 80%;
  border: 1px solid #dadada;

  height: 10vh;
  @media only screen and (max-width: 1220px) {
    width: 100%;
  }
  thead {
    background-color: #f1f2f2;
    color: black;
    font-size: 1.9rem;
    font-weight: bold;

    tr {
      td {
        padding: 1rem;
        letter-spacing: 0.09rem;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 1rem 2rem;
        div {
          border-bottom: 1px solid #dadada;
          display: flex;
          gap: 2rem;
          padding: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.08rem;
        }
        button {
          background-color: black;
          color: white;
          text-transform: uppercase;
          width: 100%;
          padding: 1.5rem 1rem;
          font-size: 1.5rem;
          border: none;
        }
      }
    }
  }
`;

const CheckoutPage = () => {
  const [userAddress, setUserAddress] = useState(null);
  const userName = useSelector((state) => state.userName);
  const userEmail = useSelector((state) => state.userEmail);
  const userContact = useSelector((state) => state.userContact);
  const userId = useSelector((state) => state.userId);
  const cartItems = useSelector((state) => state.cartItems.reverse());
  const cartTotalAmount = useSelector((state) => state.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    const fetcher = async () => {
      const reslt = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/get-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      const data = await reslt.json();
      console.log(data);
      setUserAddress(data.address);
    };
    fetcher();
    return () => {};
  }, [userId]);

  const obj = {
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    cityPincode: "",
    addressState: "",
    addressCountry: "",
  };
  const [inpFields, setInpFields] = useState(obj);
  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    setInpFields({ ...inpFields, [id]: val });
  };

  const addresAdder = async () => {
    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/add-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inpFields,
          userId: userId,
        }),
      }
    );
    const data = await reslt.json();
    console.log(data);
  };

  const getSelectValueHandler = (e) => {
    const value = e.target.value;
    userAddress.map((add) => {
      if (add.addressId === value) {
        setInpFields({ ...add });
      }
    });
  };

  const pincodeHandler = async (e) => {
    setInpFields({
      ...inpFields,
      cityPincode: e.target.value,
      city: "",
      addressState: "",
      addressCountry: "",
    });

    if (e.target.value.length === 6) {
      const reslt = await fetch(
        `${process.env.REACT_APP_BASE_URL}/shipping/check-delivery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pinCode: e.target.value,
          }),
        }
      );
      const data = await reslt.json();
      console.log(data);
      if (data.available) {
        setInpFields({
          ...inpFields,
          cityPincode: e.target.value,
          city: data.data[0].city,
          addressState: data.data[0].state,
          addressCountry: "India",
        });
      }
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  //function will get called when clicked on the pay button.
  const displayRazorpayPaymentSdk = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addresAdder();
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
    }

    const orderRes = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            cartTotalAmount < 999
              ? Number(cartTotalAmount + 99).toString()
              : cartTotalAmount.toString(),
          userEmail,
          userContact,
          userName,
        }),
      }
    );
    const data = await orderRes.json();

    const createdOrders = [];

    var date = moment().add(10, "d").toDate();

    const dateArr = date.toString().split(" ");

    const expectedDate = dateArr[2] + " " + dateArr[1] + ", " + dateArr[3];
    cartItems.map(async (item) => {
      let obj = {
        userId: userId,
        address: "dehradun uk",
        quantity: item.quantity,
        price: item.price,
        orderPrice: Number(item.quantity) * Number(item.price),
        productId: item.productId,
        shippingCharges: cartTotalAmount < 999 ? 99 : 0,
        secretKey: process.env.REACT_APP_SECRET_KEY,
        paymentOrderId: data.order_id,
        image: item.image,
        size: item.size,
        expectedDelivery: expectedDate,
        orderTitle: item.title,
        category: item.category,
        slug: item.slug,
        addressLine1: inpFields.addressLine1,
        addressLine2: inpFields.addressLine2,
        city: inpFields.city,
        addressState: inpFields.addressState,
        addressCountry: "India",
        color: item.color,
        cityPincode: inpFields.cityPincode,
      };
      const orderCreator = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/new-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...obj }),
        }
      );
      const d = await orderCreator.json();
      console.log(d);
      createdOrders.push(d.createdOrder);
      console.log(createdOrders);
    });

    var options = {
      key: data.key_id,
      amount: data.amount,
      currency: "INR",
      name: data.product_name,
      description: data.description,
      order_id: data.order_id,
      email: userEmail,
      contact: userContact,
      handler: async function (response) {
        createdOrders.map(async (order) => {
          if (!order.paymentOrderId) {
            return;
          }
          const paymentVerifier = await fetch(
            `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier/${order.paymentOrderId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await paymentVerifier.json();
          console.log(data);
          if (data.captured === false) {
            const orderPaymentUpdater = await fetch(
              `${process.env.REACT_APP_BASE_URL}/order/payment-updater`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: order._id,
                  orderPaymentStatus: false,
                  paymentMethod: "",
                }),
              }
            );
            const ds = await orderPaymentUpdater.json();
            console.log(ds);
          }
          if (data.captured) {
            const orderPaymentUpdater = await fetch(
              `${process.env.REACT_APP_BASE_URL}/order/payment-updater`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: order._id,
                  orderPaymentStatus: data.captured,
                  paymentMethod: data.method,
                }),
              }
            );
            const ds = await orderPaymentUpdater.json();
            console.log(ds);
          }
        });
        dispatch({ type: "clearCart" });

        navigate("/success");
      },
      theme: {
        color: "#32a86d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Navbar />

      <MainDiv>
        <AddressFormBox>
          <div className="container" data-aos="fade-right" data-aos-once="true">
            <div className="row">
              <div className="col-xs-12">
                <form className="form-horizontal">
                  <h3>Address</h3>
                  {userAddress && userAddress.length > 0 && (
                    <div className="form-group">
                      <label
                        htmlFor="inputFullName"
                        className="col-sm-2 control-label"
                      >
                        Select Address
                      </label>

                      <div className="col-sm-10">
                        <FormControl sx={{ m: 1, minWidth: 80, maxWidth: 250 }}>
                          <InputLabel id="demo-simple-select-label">
                            Address
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Address"
                            onChange={getSelectValueHandler}
                          >
                            {userAddress &&
                              userAddress.map((add) => {
                                return (
                                  <MenuItem
                                    key={add.addressId}
                                    value={add.addressId}
                                  >
                                    {add.fullName +
                                      ", " +
                                      add.addressLine1 +
                                      ", " +
                                      add.addressLine2 +
                                      ", " +
                                      add.city +
                                      "-" +
                                      add.cityPincode +
                                      ", " +
                                      add.addressState}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  )}
                  <div className="form-group">
                    <label
                      htmlFor="inputFullName"
                      className="col-sm-2 control-label"
                    >
                      Full Name
                    </label>

                    <div className="col-sm-10">
                      <input
                        type="text"
                        onChange={onChangeHandler}
                        className="form-control"
                        id="fullName"
                        name="full-name"
                        placeholder="Full Name"
                        value={inpFields.fullName}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <p className="col-sm-offset-2 col-sm-10 help-block">
                      Street address, P.O. box, company name, c/o
                    </p>
                    <label
                      htmlFor="inputAddressLine1"
                      className="col-sm-2 control-label"
                    >
                      Address Line 1
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="addressLine1"
                        onChange={onChangeHandler}
                        name="address-line1"
                        placeholder="Address Line 1"
                        value={inpFields.addressLine1}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <p className="col-sm-offset-2 col-sm-10 help-block">
                      Apartment, suite , unit, building, floor, etc.
                    </p>
                    <label
                      htmlFor="inputAddressLine2"
                      className="col-sm-2 control-label"
                    >
                      Address Line 2
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="addressLine2"
                        name="address-line2"
                        onChange={onChangeHandler}
                        placeholder="Address Line 2"
                        value={inpFields.addressLine2}
                      />
                    </div>
                  </div>{" "}
                  <div className="form-group">
                    <label
                      htmlFor="inputZipPostalCode"
                      className="col-sm-2 control-label"
                    >
                      Zip / Postal Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        id="inputZipPostalCode"
                        name="cityPincode"
                        value={inpFields.cityPincode}
                        placeholder="Pincode"
                        onChange={pincodeHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputCityTown"
                      className="col-sm-2 control-label"
                    >
                      City / Town
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        id="inputCityTown"
                        name="city"
                        placeholder="City / Town"
                        value={inpFields.city}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputStateProvinceRegion"
                      className="col-sm-2 control-label"
                    >
                      State
                    </label>
                    <div className="col-sm-10">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="inputStateProvinceRegion"
                        name="addressState"
                        placeholder="State"
                        value={inpFields.addressState}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="selectCountry"
                      className="col-sm-2 control-label"
                    >
                      Country
                    </label>
                    <div className="col-sm-10">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="inputZipPostalCode"
                        name="addressCountry"
                        placeholder="Country"
                        value={inpFields.addressCountry}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AddressFormBox>
        <ItemsAndPriceTable data-aos="fade-left" data-aos-once="true">
          <ProductsTable>
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item.productId + Math.random() * 20}>
                    <td>
                      <Link
                        to={`/product/${item.category}/${item.slug}/${item.productId}`}
                        state={{ productId: `${item.productId}` }}
                      >
                        <ProductImgTextBox>
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${item.image}`}
                            alt=""
                          />
                          <p>
                            <div>
                              <span>{item.title} </span>
                              <span>({item.color})</span>
                            </div>
                            <div>
                              <p>Size : </p>
                              {item.size}
                            </div>
                          </p>
                        </ProductImgTextBox>
                      </Link>
                    </td>
                    <td>₹ {Number(item.price).toLocaleString("en-IN")}</td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </ProductsTable>
          <PriceTotalTable>
            <thead>
              <tr>
                <td colSpan={2}>Cart Total</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <span>Subtotal</span>
                    <span>₹ {cartTotalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <span>Subtotal</span>
                    <span>₹ {cartTotalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={displayRazorpayPaymentSdk}>
                    proceed to checkout
                  </button>
                </td>
              </tr>
            </tbody>
          </PriceTotalTable>
        </ItemsAndPriceTable>
      </MainDiv>
      <Footer />
    </>
  );
};

export default CheckoutPage;
