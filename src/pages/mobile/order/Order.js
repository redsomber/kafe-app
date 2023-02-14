import { useParams } from "react-router-dom";
import { useDocument } from "../../../hooks/useDocument";

export default function Order() {
  const { id } = useParams();
  const { document, error } = useDocument("orders", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="orders-menu">
      <article className="orders">
        <p>id: {document.id}</p>
        <div className="items">
          <p>Orders:</p>
          {document.items.map((item) => (
            <div key={item.id} className="order-dtes">
              <img src={item.imgURL} alt="img" />
              <div>
                <p>{item.name}</p>
                <p>
                  Price {item.price} GEL, Count: {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p>Order amount: {document.totalCount}</p>
        <p>Table number: {document.table}</p>
        {document.status ? <p>Status: ACCEPTED</p> : <p>Status: not accepted</p>}
      </article>
    </div>
  );
}
