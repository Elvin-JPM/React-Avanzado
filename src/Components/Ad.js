import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "../Components/Ad.module.css";
import Header from "./Header";
import { getAd } from "../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { adDelete, adDetail } from "../store/actions";

export default function Ad() {
  const navigate = useNavigate();
  const params = useParams();
  const ad = useSelector(getAd(params.id));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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
