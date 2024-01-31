import { useEffect, useState } from "react";
import storage from "../api/storage";
import { postData } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function CreateAddPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [radioOption, setRadioOption] = useState(""); // Selling or buying
  const [selectedOptions, setSelectedOptions] = useState([]); // tags
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [btnEnabled, setBtnEnabled] = useState(false);
  // const [show, setShow] = useState(false);

  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");
  const enabled =
    name.length !== "" &&
    selectedOptions.length > 0 &&
    price !== "" &&
    radioOption !== "";

  useEffect(() => {
    setBtnEnabled(enabled);
  }, [enabled]);

  // const handleShow = () =>
  // {
  //   setShow(!show);
  // }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Handler function for name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  // Handler function for radio button change
  const handleRadioChange = (event) => {
    setRadioOption(event.target.value);
    console.log(event.target.value);
  };

  // Handler function for checkbox change
  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      // If the option is already selected, remove it from the array
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      // If the option is not selected, add it to the array
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCreateAdd = (event) => {
    event.preventDefault();
    if (authToken || sessionToken) {
      try {
        const postAdd = async () => {
          const response = await postData(
            "/v1/adverts",
            {
              name: name,
              sale: radioOption === "For sale" ? true : false,
              price: price,
              tags: selectedOptions,
              photo: selectedImage,
            },
            {
              Authorization: `Bearer ${authToken ? authToken : sessionToken}`,
              "Content-Type": "multipart/form-data",
            }
          );
          console.log("Response from create Add: ", response);
          const data = await response.data;
          navigate(`/adds/${data.id}`);
        };
        postAdd();
      } catch (error) {}
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <form>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        ></input>

        <br></br>

        <label>Selling or buying:</label>
        <label>
          <input
            type="radio"
            id="for_sale"
            value="for_sale"
            checked={radioOption === "for_sale"}
            onChange={handleRadioChange}
          />
          For sale
        </label>
        <label>
          <input
            type="radio"
            id="looking_to_buy"
            value="looking_to_buy"
            checked={radioOption === "looking_to_buy"}
            onChange={handleRadioChange}
          />
          Looking to buy
        </label>
        <br></br>
        <label>Tags:</label>

        <div>
          <input
            type="checkbox"
            id="Motor"
            value="Motor"
            checked={selectedOptions.includes("Motor")}
            onChange={() => handleCheckboxChange("Motor")}
          />
          <label htmlFor="Motor">Motor</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Work"
            value="Work"
            checked={selectedOptions.includes("Work")}
            onChange={() => handleCheckboxChange("Work")}
          />
          <label htmlFor="Work">Work</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Lifestyle"
            value="Lifestyle"
            checked={selectedOptions.includes("Lifestyle")}
            onChange={() => handleCheckboxChange("Lifestyle")}
          />
          <label htmlFor="Lifestyle">Lifestyle</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Electronics"
            value="Electronics"
            checked={selectedOptions.includes("Electronics")}
            onChange={() => handleCheckboxChange("Electronics")}
          />
          <label htmlFor="Electronics">Electronics</label>
        </div>

        <label>Precio: </label>
        <input
          type="number"
          value={price}
          required
          onChange={handlePriceChange}
        ></input>

        <br></br>

        <label htmlFor="imageInput">Select an Image:</label>
        <input
          type="file"
          id="imageInput"
          required
          accept="image/*" // Specify that only image files are allowed
          onChange={handleImageChange}
        />
        <p>Selected Options: {selectedOptions.join(", ")}</p>
        <input
          type="submit"
          value="Create"
          onClick={handleCreateAdd}
          disabled={!btnEnabled}
        ></input>
      </form>
    </div>
  );
}

export default CreateAddPage;
