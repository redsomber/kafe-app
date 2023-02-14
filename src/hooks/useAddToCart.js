import { useState } from "react";

export const useAddToCart = () => {
    const [orders, setOrders] = useState([])

    const addToOrder = (item) => {
        return setOrders([...orders, item]);
      };
    return { orders, addToOrder };
  };