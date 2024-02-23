import { useNavigate, useParams } from "react-router-dom";
import storage from "../api/storage";
import { useEffect, useState } from "react";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "../Components/Ad.module.css";
import Header from "./Header";
import { getAd } from "../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { adDelete, adDetail, loadAds } from "../store/actions";

export default function Ad() {
  const navigate = useNavigate();
  const params = useParams();
  const ad = useSelector(getAd(params.id));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //////////// delete later /////////////

  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");
  const token = authToken || sessionToken;

  //////////////////////////////////////

  useEffect(() => {
    try {
      dispatch(adDetail(params.id));
    } catch (error) {
      console.log("error at ad.js: ", error.message);
      navigate("/notFound");
    }
  }, [dispatch, params.id, navigate]);

  const handleShow = () => {
    setShow(!show);
  };

  if (typeof ad === "undefined") {
    return;
  }

  const handleDeleteClick = async () => {
    dispatch(adDelete(ad));
    // const response = await deleteData(`/v1/adverts/${ad.id}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // console.log("Response... :", response, ad.id);
    // if (response) {
    //   console.log(`$Item deleted`);
    //   navigate("/Adds");
    // } else {
    //   console.error("Failed to delete item");
    // }
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
