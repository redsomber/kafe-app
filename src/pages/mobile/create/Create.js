import { useEffect } from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import { useFirestore } from "../../../hooks/useFirestore";
import "./Create.css";

const categories = [
  { value: "firstdishes", label: "First dishes" },
  { value: "salads", label: "Salads" },
  { value: "garners", label: "Garners" },
  { value: "bakery", label: "Bakery" },
  { value: "barbecue", label: "Barbecue" },
  { value: "sauses", label: "Sauses" },
  { value: "hotdishes", label: "Hot dishes" },
  { value: "drinks", label: "Drinks" },
  { value: "adrinks", label: "Alcohol drinks" },
];

export default function Create() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState(null);
  const { addDocument, response } = useFirestore("cards");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Select category");
      return;
    }

    const card = {
      name,
      price: +price,
      category: category.value,
      available: "true",
    };

    addDocument(card, image);
  };

  const handleFileChange = (e) => {
    setImage(null);
    let selected = e.target.files[0];

    if (!selected) {
      setFormError("Select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setFormError("Selected file must be an image");
      return;
    }
    if (!selected.size > 500000) {
      setFormError("Image file size must be less than 500kb");
      return;
    }

    setFormError(null);
    setImage(selected);
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setPrice("");
      setCategory();
      setImage();
    }
  }, [response.success]);

  return (
    <div children className="create-form">
      <h2>Create food card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Card name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Price:</span>
          <input
            type="number"
            step="0.1"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </label>
        <label>
          <span>Category:</span>
          <ReactSelect
            className="select"
            options={categories}
            onChange={(options) => setCategory(options)}
            required
          />
        </label>
        <label>
          <span>Image:</span>
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button className="btn">Add Card</button>
        {formError && <div className="error">{formError}</div>}
      </form>
    </div>
  );
}
