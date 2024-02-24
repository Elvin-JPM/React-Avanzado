import BtnCreateAdd from "./BtnCreateAdd.js";
import styles from "./Ads.module.css";
import { Link } from "react-router-dom";

function Adds({ adsList, name, minPrice, maxPrice, adType, selectedTags }) {
  console.log("selected tags at Ads.js:", selectedTags);
  return (
    <div>
      {adsList.map((ad) =>
        (name === "" || ad.name.includes(name.toLowerCase())) &&
        (minPrice === "" || Number(minPrice) <= Number(ad.price)) &&
        (maxPrice === "" || Number(maxPrice) >= Number(ad.price)) &&
        (adType === "" ||
          (ad.sale ? "For sale" : "Looking to buy") === adType) &&
        (selectedTags.length === 0 ||
          selectedTags.some((filterTag) =>
            ad.tags.map((str) => str.toLowerCase()).includes(filterTag)
          )) ? (
          <Link className={styles.link} to={`/adds/${ad.id}`} key={ad.id}>
            <div className={styles.card}>
              <p>Name: {ad.name}</p>
              <p>For Sale: {ad.sale ? "For Sale" : "Looking to buy"}</p>
              <p>Price: {ad.price}</p>
              <p>Tags: {ad.tags.join(",")}</p>
              <img src={`${ad.photo}`} alt="product"></img>
            </div>
          </Link>
        ) : (
          ""
        )
      )}
      <BtnCreateAdd />
    </div>
  );
}

export default Adds;
