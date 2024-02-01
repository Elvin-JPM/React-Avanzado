import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getData } from "../api/api";
import storage from "../api/storage";
import { useEffect, useState } from "react";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "../Components/Ad.module.css";
import Header from "./Header";
import { getAd } from "../store/selectors";
import { useSelector } from "react-redux";

export default function Ad() {
  const navigate = useNavigate();
  const params = useParams();
  const ad = useSelector(getAd(params.id));
  // const [ad, setAd] = useState("");
  const [show, setShow] = useState(false);
  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");

  //useEffect(() => {
  //   if (sessionToken || authToken) {
  //     try {
  //       const fetchData = async () => {
  //         const response = await getData(`/v1/adverts/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${authToken ? authToken : sessionToken}`,
  //           },
  //         });
  //         console.log(response);
  //         setAd(response);
  //       };

  //       fetchData();
  //     } catch (error) {}
  //   } else {
  //     navigate("/login");
  //   }
  // }, [authToken, id, navigate, sessionToken]);

  // if (typeof ad === "undefined") {
  //   navigate("/notFound");
  //   return;
  // }

  const handleShow = () => {
    setShow(!show);
  };

  const handleDeleteClick = async () => {
    const response = await deleteData(`/v1/adverts/${ad.id}`, {
      headers: {
        Authorization: `Bearer ${authToken ? authToken : sessionToken}`,
      },
    });
    console.log("Response... :", response, ad.id);
    if (response) {
      console.log(`$Item deleted`);
      navigate("/Adds");
    } else {
      console.error("Failed to delete item");
    }
  };

  return (
    <>
      <Header />
      <div className={show ? styles.adHidden : ""}>
        <p>Name: {ad.name}</p>
        <p>Price: {ad.price}</p>
        <p>Tags: {ad.tags}</p>
        <img src={`${ad.photo}`} alt="product"></img>
        <Button text="Delete" handleClick={handleShow} />
      </div>
      <Confirm
        show={show}
        adId={ad.id}
        handleShow={handleShow}
        handleAction={handleDeleteClick}
        notice={`You sure you want to delete this item?`}
        btnText="Delete"
      />
    </>
  );
}
