import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CardDetails from "../pages/mobile/home/CardDetails";
import { addItem, decCount, incCount } from "../redux/counter";
import "./CardList.css";

export default function CardList({ cards }) {
  const { t } = useTranslation();
  const [modalActive, setModalActive] = useState(false);
  const [item, setItem] = useState(null);
  const items = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleCardClick = (item) => {
    setItem(item);
    setModalActive(true);
  };

  const handleSubmit = (e, item) => {
    e.stopPropagation();
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        imgURL: item.imgURL,
        count: 1,
        sum: item.price,
      })
    );
  };

  return (
    <>
      {cards.map((item) => (
        <article
          key={item.id}
          onClick={() => handleCardClick(item)}
          className="card"
        >
          <div className="descritpion">
            <h3>{t(item.name)}</h3>
            {item.available === "true" ? (
              <button
                className="btn price"
                onClick={(e) => {
                  handleSubmit(e, item);
                }}
              >
                {item.price} GEL
              </button>
            ) : (
              <p className="available">{t("not available now")}</p>
            )}

            {items[item.id] && (
              <div className="add">
                <button
                  className="minus"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(decCount({ id: item.id }));
                  }}
                >
                  -
                </button>
                <p>{items[item.id].count}</p>
                <button
                  className="plus"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(incCount({ id: item.id }));
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <div className="image">
            <img src={item.imgURL} alt="img" />
          </div>
        </article>
      ))}
      {item && (
        <CardDetails
          active={modalActive}
          setActive={setModalActive}
          item={item}
        />
      )}
    </>
  );
}
