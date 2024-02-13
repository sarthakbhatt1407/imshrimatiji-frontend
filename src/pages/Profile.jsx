import React, { useEffect, useState } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import Footer from "../component/Footer/Footer";
import {
  AccountCircle,
  LocalShipping,
  LocationOn,
  Settings,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../data";
import { useSelector } from "react-redux";

const OuterBox = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #f7f7f7;
  padding: 2rem 20rem;
  @media only screen and (max-width: 1099px) {
    padding: 1rem;
  }
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  p {
    margin-top: 2rem;
    text-transform: capitalize;
    color: #777;
    font-size: 1.6rem;

    span {
      color: #bf526a;
    }
  }
  h1 {
    text-transform: capitalize;
    font-size: 5rem;
    font-weight: 400;
    margin-bottom: 4rem;
    color: black;
  }
  @media only screen and (max-width: 1099px) {
    gap: 0;
    h1 {
      font-size: 4rem;
    }
  }
`;
const LinksAndDetailsBox = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 2fr; */
  display: flex;
  gap: 5rem;
  @media only screen and (max-width: 1099px) {
    flex-direction: column;
  }
`;
const LinksBox = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: start;
  background-color: white;
  button {
    width: 25rem;
    padding: 2rem;
    background-color: transparent;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 1.6rem;
    gap: 1rem;
    border: none;
    transition: all 1s;
    svg {
      transform: scale(1.7);
    }
    &:hover {
      background-color: #dcdcdc;
    }
    @media only screen and (max-width: 1099px) {
      width: fit-content;
      font-size: 1.4rem;
      padding: 2rem 1rem;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 1099px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
  }
`;

const DetailsBox = styled.div`
  width: 100%;
  box-shadow: 0.2rem 0.2rem 1rem #d5d5d5;
  border-radius: 0.8rem;
  padding: 3rem;
  background-color: white;
  height: 100%;
  @media only screen and (max-width: 1099px) {
    padding: 2rem;
  }
`;

const MyDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  i {
    margin: 3rem 0;
  }
  h3 {
    font-size: 2.9rem;
  }
  p {
    padding-bottom: 0.7rem;
    color: black;
    font-size: 2rem;
    border-bottom: 1px solid #e9e6e6;
  }
`;

const UserInformationBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  span {
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 1099px) {
    grid-template-columns: 1fr 2.4fr;
    span {
      font-size: 1.4rem;
    }
  }
`;
const InfoBox = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;
const LabelInputBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    color: #828282;
    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: 0.09rem;
  }
  input {
    border: none;
    box-shadow: 0.2rem 0.2rem 1rem #d5d5d5;
    padding: 1rem;
    width: 100%;
    text-transform: capitalize;
  }
  @media only screen and (max-width: 1099px) {
    label {
      font-size: 1.3rem;
    }
  }
`;

const MyAddressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    font-size: 2.9rem;
  }
`;
const AllAddressBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  @media only screen and (max-width: 1099px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem 3rem;
  /* background-color: #f3f2f2; */
  box-shadow: 0.2rem 0.2rem 1rem #d5d5d5;
  h4 {
    font-weight: 400;
  }
  span {
    color: #777777;
    i {
      font-style: normal;
      color: black;
      letter-spacing: 0.09rem;
    }
  }
  button {
    width: 7rem;
    border: none;
    background-color: ${colors.mainColor};
    color: white;
    border-radius: 1rem;
    padding: 0.5rem;
  }
  @media only screen and (max-width: 1099px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const AddressTag = styled.div`
  border-bottom: 2px solid #e7e7e7cc;
  padding-bottom: 0.3rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: #cecece;
  font-weight: 500;
  width: fit-content;
`;
const Profile = () => {
  const [currentActive, setCurrentActive] = useState("mydetails");
  const [userAddress, setUserAddress] = useState(null);
  const userName = useSelector((state) => state.userName);
  const userEmail = useSelector((state) => state.userEmail);
  const userContact = useSelector((state) => state.userContact);
  const userSince = useSelector((state) => state.userSince);
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();

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
      console.log(data.address);
      setUserAddress(data.address);
    };
    fetcher();
    return () => {};
  }, []);

  const activeHandler = (e) => {
    setCurrentActive(e.target.id);
  };

  const iconHandler = (e) => {
    setCurrentActive(e.target.parentElement.id);
  };

  return (
    <>
      <Navbar />
      <OuterBox>
        <MainBox>
          <p>
            Home / <span>My Account</span>
          </p>
          <h1>My Account</h1>
          <LinksAndDetailsBox>
            <LinksBox>
              {currentActive === "mydetails" && (
                <button
                  style={{ backgroundColor: "#eeeeee" }}
                  id="mydetails"
                  onClick={activeHandler}
                >
                  <AccountCircle onClick={iconHandler} /> My details
                </button>
              )}
              {!(currentActive === "mydetails") && (
                <button id="mydetails" onClick={activeHandler}>
                  <AccountCircle onClick={iconHandler} /> My details
                </button>
              )}
              {currentActive === "myaddress" && (
                <button
                  style={{ backgroundColor: "#eeeeee" }}
                  onClick={activeHandler}
                  id="myaddress"
                >
                  <LocationOn onClick={iconHandler} /> My address book
                </button>
              )}
              {!(currentActive === "myaddress") && (
                <button onClick={activeHandler} id="myaddress">
                  <LocationOn onClick={iconHandler} /> My address book
                </button>
              )}

              <button
                onClick={() => {
                  navigate(`/account/${userId}/orders`);
                }}
              >
                <LocalShipping /> My orders
              </button>
              {/* <button id="accountsett">
                <Settings /> Account settings
              </button> */}
            </LinksBox>
            <DetailsBox>
              {/*  */}
              {currentActive === "mydetails" && (
                <MyDetailsBox data-aos="fade-up" data-aos-once="true">
                  <h3>My details</h3>
                  <p>Personal Information</p>
                  <UserInformationBox>
                    <span>User Information</span>
                    <InfoBox>
                      <LabelInputBox>
                        <label htmlFor="">Name</label>
                        <input type="text" disabled value={userName} />
                      </LabelInputBox>

                      <LabelInputBox>
                        <label htmlFor="">Contact Number</label>
                        <input type="text" disabled value={userContact} />
                      </LabelInputBox>
                      <LabelInputBox>
                        <label htmlFor="">User Since</label>
                        <input type="text" disabled value={userSince} />
                      </LabelInputBox>
                    </InfoBox>
                  </UserInformationBox>
                  <p>Email</p>
                  <UserInformationBox>
                    <span>Email</span>
                    <InfoBox>
                      <LabelInputBox>
                        <label htmlFor="">Email</label>
                        <input
                          style={{ textTransform: "none" }}
                          type="text"
                          disabled
                          value={userEmail}
                        />
                      </LabelInputBox>
                    </InfoBox>
                  </UserInformationBox>
                  <i>
                    <span>
                      *Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellat accusamus temporibus quas ea? Molestiae fugit
                      odit, minima necessitatibus omnis ab impedit, quisquam ad
                      eligendi perspiciatis nisi illum recusandae? Laborum odio
                      eius ab labore possimus, voluptates libero doloremque
                      ratione porro at?
                    </span>
                  </i>
                </MyDetailsBox>
              )}
              {currentActive === "myaddress" && userAddress && (
                <MyAddressBox data-aos="fade-up" data-aos-once="true">
                  <h3>My address</h3>
                  <AllAddressBox>
                    {userAddress &&
                      userAddress.map((address) => {
                        return (
                          <AddressBox
                            data-aos="fade-in"
                            data-aos-once="true"
                            key={address.addressId}
                          >
                            <AddressTag>{address.city}</AddressTag>
                            <h4>{address.fullName}</h4>
                            <span>{address.addressLine1}</span>
                            <span>{address.addressLine2}</span>

                            <span>
                              {address.city} - {address.cityPincode}
                            </span>
                            <span>
                              {address.addressState}, {address.addressCountry}
                            </span>
                            <span>
                              P. <i>{address.contactNum}</i>
                            </span>
                            <button>Delete</button>
                          </AddressBox>
                        );
                      })}
                  </AllAddressBox>
                </MyAddressBox>
              )}
            </DetailsBox>
          </LinksAndDetailsBox>
        </MainBox>
      </OuterBox>
      <Footer />
    </>
  );
};

export default Profile;
