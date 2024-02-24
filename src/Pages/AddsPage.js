import { useEffect, useState } from "react";
import NoAddsYet from "../Components/NoAddsYet";
import Ads from "../Components/Ads";

import Filters from "../Components/Filters.js";
import Header from "../Components/Header.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, loadAds } from "../store/actions.js";
import { getAds } from "../store/selectors.js";

function AdsPage() {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [adType, setAdType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(loadAds());
    dispatch(getAllTags());
  }, [dispatch]);

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
    if (selectedTags.includes(value)) {
      // If the option is already selected, remove it from the array
      setSelectedTags(selectedTags.filter((option) => option !== value));
    } else {
      // If the option is not selected, add it to the array
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleAdTypeChange = (event) => {
    setAdType(event.target.value);
  };

  return (
    <div>
      <Header />
      <Filters
        name={name}
        minPrice={minPrice}
        maxPrice={maxPrice}
        adType={adType}
        selectedTags={selectedTags}
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
          selectedTags={selectedTags}
        />
      ) : (
        <NoAddsYet />
      )}
    </div>
  );
}

export default AdsPage;
