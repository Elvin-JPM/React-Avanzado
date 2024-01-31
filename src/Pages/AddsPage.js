import { useEffect, useState } from "react";
import NoAddsYet from "../Components/NoAddsYet";
import Ads from "../Components/Ads";

import storage from "../api/storage";
import { getData } from "../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import Filters from "../Components/Filters.js";
import Header from "../Components/Header.js";
import Button from "../Components/Button.js";
import Confirm from "../Components/Confirm.js";

function AdsPage() {
  const [ads, setAds] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");

  const [name, setName] = useState("");
  const [tags, setTags] = useState([]); // tags
  const [adType, setAdType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleShow = () => {
    setShow(!show);
  };
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
    if (sessionToken || authToken) {
      const fetchData = async () => {
        try {
          const response = await getData("/v1/adverts", {
            headers: {
              Authorization: `Bearer ${authToken ? authToken : sessionToken}`,
            },
          });
          setAds(response);
          console.log(response);
        } catch (error) {}
      };

      fetchData();
    } else {
      navigate("/login");
    }
  }, [authToken, navigate, sessionToken]);

  const handleLogout = () => {
    storage.remove("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <Header>
        <NavLink to="/Adds/new">Create Add</NavLink>
        <NavLink to="/Adds">Adds</NavLink>
        {authToken || sessionToken ? (
          <Button text="Logout" handleClick={handleShow} />
        ) : (
          <Button text="Log in" />
        )}
      </Header>
      <Confirm
        show={show}
        handleShow={handleShow}
        notice={`Close session?`}
        btnText="Yes"
        handleAction={handleLogout}
      />
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
