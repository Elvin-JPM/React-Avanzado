import { getTags } from "../store/selectors";
import { useSelector } from "react-redux";

function Filters({
  name,
  minPrice,
  maxPrice,
  selectedTags,
  adType,
  onNameChange,
  onMinPriceChange,
  onMaxPriceChange,
  onTagsChange,
  onAdTypeChange,
}) {
  const allTags = useSelector(getTags);

  return (
    <div>
      <form>
        <p>Filters: </p>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onNameChange}
        ></input>
        <label htmlFor="for-sale">Type: </label>
        <select name="for-sale" value={adType} onChange={onAdTypeChange}>
          <option></option>
          <option>For sale</option>
          <option>Looking to buy</option>
        </select>
        <label htmlFor="max-price">Max Price: </label>
        <input
          type="number"
          name="max-price"
          value={maxPrice}
          onChange={onMaxPriceChange}
        ></input>
        <label htmlFor="min-price">Min Price: </label>
        <input
          type="number"
          name="min-price"
          value={minPrice}
          onChange={onMinPriceChange}
        ></input>

        <label>Tags:</label>

        {allTags.map((tag, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={tag}
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => onTagsChange(tag)}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Filters;
