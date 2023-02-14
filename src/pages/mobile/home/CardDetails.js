import { useDocument } from "../../../hooks/useDocument";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import "./CardDetails.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect from "react-select";
import { addItem } from "../../../redux/counter";

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

export default function CardDetails({ active, setActive, item }) {
  const { t } = useTranslation();
  const [price, setPrice] = useState(null);
  const [available, setAvailable] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const { error, document } = useDocument("cards", item.id);
  const { updateDocument } = useFirestore("cards");
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const handleAvailable = (e) => {
    setAvailable(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDocument(
      item.id,
      {
        price: price ? +price : +item.price,
        available: available ? available : item.available,
        category: category ? category.value : item.category,
        name: item.name,
      },
      photo
    );
    setAvailable('');
    setCategory('');
    setPrice(null);
    setPhoto(null);
  };

  const handleClick = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        details: item.details,
        imgURL: item.imgURL,
        count: 1,
        sum: item.price,
      })
    );
    setActive(false);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={active ? "card-details active" : "card-details"}>
      <div className="content">
        <div className="wrap">
          <RxCross2 className="back" onClick={() => setActive(false)} />
          <div>
            <img src={document.imgURL} alt="img" />
          </div>
          <h3>{t(document.name)}</h3>
          {item.available === "true" ? (
            <button
              className="btn"
              onClick={() => {
                handleClick(document);
              }}
            >
              {t("Add to cart for")} {document.price} GEL
            </button>
          ) : (
            <p>{t("not available now")}</p>
          )}
          {user && (
            <form className="edit" onSubmit={handleSubmit}>
              <label>
                <span>Edit price:</span>
                <input
                  type="number"
                  step="0.1"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label>
                <span>Edit category:</span>
                <ReactSelect
                  className="select2"
                  options={categories}
                  onChange={(options) => setCategory(options)}
                  required
                />
              </label>
              <label>
                <span>Edit available:</span>
                <select
                  value={available}
                  className="select"
                  onChange={handleAvailable}
                >
                  <option value="">select available</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label>
                <span>Edit photo:</span>
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>

              <button className="btn">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
