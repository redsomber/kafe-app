import { useState } from "react";
import { useCollection } from "../../../hooks/useCollections";
import { useFirestore } from "../../../hooks/useFirestore";
import "./Orders.css";

export default function Orders() {
  const [active, setActive] = useState(false);
  const [item, setItem] = useState(null);
  const { deleteDocument, updateDocument } = useFirestore("orders");

  const { documents } = useCollection("orders");

  return (
    <div className="orders-menu">
      {documents &&
        documents.map((orders) => {
          if (!orders.status) {
            return (
              <article key={orders.id} className="orders">
                <p>id: {orders.id}</p>
                <div className="items">
                  <p>Orders:</p>
                  {orders.items.map((item) => (
                    <div key={item.id} className="order-dtes">
                      <img src={item.imgURL} alt="img" />
                      <div>
                        <p>{item.name}</p>
                        <p>Price {item.price} GEL, Count: {item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>Order amount: {orders.totalCount}</p>
                <p>Table number: {orders.table}</p>
                {orders.status ? <p>Status: ACCEPTED</p> : <p>Status: not accepted</p>}
                <button
                  className="btn"
                  onClick={() => {
                    updateDocument(orders.id, { status: !orders.status });
                  }}
                >
                  Ready
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setItem(orders.id);
                    setActive(true);
                  }}
                >
                  Delete
                </button>
              </article>
            );
          } else {
            return null;
          }
        })}
      <div
        className={active ? "delete-window active" : "delete-window"}
        onClick={() => {
          setActive(false);
        }}
      >
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <h3>Delete order?</h3>
          <p>id: {item}</p>
          <button
            className="btn"
            onClick={() => {
              setActive(false);
              deleteDocument(item);
            }}
          >
            Yes
          </button>
          <button className="btn" onClick={() => setActive(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
