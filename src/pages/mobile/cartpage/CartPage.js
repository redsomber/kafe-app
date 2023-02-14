import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../../hooks/useFirestore";
import { decCount, incCount, resetState } from "../../../redux/counter";
import "./CartPage.css";

export default function CartPage() {
  const [table, setTable] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addDocument } = useFirestore("orders");
  const items = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const totalCount = Object.values(items)
    .reduce((acc, item) => acc + item.sum, 0)
    .toFixed(2);

  const handleClick = async () => {
    setError(null);
    if (table) {
      const orderArr = Object.values(items).map((item) => {
        return {
          id: item.id,
          count: item.count,
          name: item.name,
          price: item.price,
          imgURL: item.imgURL,
        };
      });

      const order = { items: orderArr, status: false, totalCount, table };
      const doc = await addDocument(order);
      dispatch(resetState());
      navigate(`/orders/${doc}`)
    } else {
      setError("Set current table");
    }
  };

  return (
    <div className="cart-page">
      {Object.values(items).map((item) => (
        <article key={item.id} className="cart-card">
          <div className="cart-main">
            <img src={item.imgURL} alt="img" />
            <h3>{t(item.name)}</h3>
          </div>

          <div className="cart-price">
            <p>{item.sum.toFixed(2)} GEL</p>
            <div className="add">
              <button
                className="minus"
                onClick={() => dispatch(decCount({ id: item.id }))}
              >
                -
              </button>
              <p>{item.count}</p>
              <button
                className="plus"
                onClick={() => dispatch(incCount({ id: item.id }))}
              >
                +
              </button>
            </div>
          </div>
        </article>
      ))}
      {Object.values(items).length >= 1 ? (
        <div>
          <div className="summary">
            {t("Summary")} <span>{totalCount} GEL</span>
          </div>
          <select
            value={table}
            className="select"
            onChange={(e) => setTable(e.target.value)}
          >
            <option value="">{t('select table')}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {error && <div className="error">{t(error)}</div>}
          <button className="order-btn" onClick={handleClick}>
            {t("Place an order")}
          </button>
        </div>
      ) : (
        <div className="empty">
          <p>{t("Cart is empty")}</p>
          <button className="order-btn" onClick={() => navigate("/")}>
            {t("Go to menu")}
          </button>
        </div>
      )}
    </div>
  );
}
