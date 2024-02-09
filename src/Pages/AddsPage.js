import { useEffect, useState } from "react";
import NoAddsYet from "../Components/NoAddsYet";
import Ads from "../Components/Ads";

import storage from "../api/storage";
import { getData } from "../api/api";
import { useNavigate } from "react-router-dom";
import Filters from "../Components/Filters.js";
import Header from "../Components/Header.js";
import { useDispatch, useSelector } from "react-redux";
import { adsLoaded, loadAds } from "../store/actions.js";
import { getAds } from "../store/selectors.js";

function AdsPage() {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);

  const [name, setName] = useState("");
  const [tags, setTags] = useState([]); // tags
  const [adType, setAdType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Handler function for name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };
  // Handler function for radio button change

  // Handler function for checkbox change
  const handleTagsChange = (value) => {
    if (tags.includes(value)) {
      // If the option is already selected, remove it from the array
      setTags(tags.filter((option) => option !== value));
    } else {
      // If the option is not selected, add it to the array
      setTags([...tags, value]);
    }
  };

  const handleAdTypeChange = (event) => {
    setAdType(event.target.value);
  };

  useEffect(() => {
    dispatch(loadAds());
  }, []);

  return (
    <div>
      <Header />
      <Filters
        name={name}
        minPrice={minPrice}
        maxPrice={maxPrice}
        adType={adType}
        tags={tags}
        onNameChange={handleNameChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onTagsChange={handleTagsChange}
        onAdTypeChange={handleAdTypeChange}
      />
      {ads.length > 0 ? (
        <Ads
          adsList={ads}
          name={name}
          minPrice={minPrice}
          maxPrice={maxPrice}
          adType={adType}
          tags={tags}
        />
      ) : (
        <NoAddsYet />
      )}
    </div>
  );
}

export default AdsPage;
