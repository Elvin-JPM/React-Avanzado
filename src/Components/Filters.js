function Filters({
  name,
  minPrice,
  maxPrice,
  tags,
  adType,
  onNameChange,
  onMinPriceChange,
  onMaxPriceChange,
  onTagsChange,
  onAdTypeChange,
}) {
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

        <div>
          <input
            type="checkbox"
            id="Motor"
            value="Motor"
            checked={tags.includes("Motor")}
            onChange={() => onTagsChange("Motor")}
          />
          <label htmlFor="Motor">Motor</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Work"
            value="Work"
            checked={tags.includes("Work")}
            onChange={() => onTagsChange("Work")}
          />
          <label htmlFor="Work">Work</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Lifestyle"
            value="Lifestyle"
            checked={tags.includes("Lifestyle")}
            onChange={() => onTagsChange("Lifestyle")}
          />
          <label htmlFor="Lifestyle">Lifestyle</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Electronics"
            value="Electronics"
            checked={tags.includes("Electronics")}
            onChange={() => onTagsChange("Electronics")}
          />
          <label htmlFor="Electronics">Electronics</label>
        </div>
      </form>
    </div>
  );
}

export default Filters;
