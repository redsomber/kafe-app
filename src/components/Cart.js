import "./Cart.css";
import { TbShoppingCart } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const items = useSelector((state) => state.counter);
  const navigate = useNavigate();
  
  const { t } = useTranslation();

  return (
    Object.values(items).length >= 1 && (
      <div className="cart" onClick={() => navigate("/cart")}>
        <p className="count">{Object.values(items).length}</p>
        <div>
          <p>{t("Go to Cart")}</p>
          <TbShoppingCart className="cart-icon" />
        </div>
      </div>
    )
  );
}
