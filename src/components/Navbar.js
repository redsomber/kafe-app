import "./Navbar.css";
import Temple from "../assets/temple.svg";
import Menu from "../assets/menu.svg";
import Closer from "../assets/x.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useTranslation } from "react-i18next";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";

const itemId = "f8X6tMPSA90r68U8vt1w";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const { document } = useDocument("taps", itemId);
  const { updateDocument } = useFirestore("taps");
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleClick = () => {
    setMenuActive(!menuActive);
    logout();
  };
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <Link className="logo" to="/">
            <img src={Temple} alt="dojologo" />
            <span>Chveni Ezo</span>
          </Link>
        </li>
        <li className="logo menu">
          <select className="select" onChange={changeLanguage}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="ge">GE</option>
          </select>
          <img
            src={Menu}
            alt="menu"
            onClick={() => setMenuActive(!menuActive)}
            className={menuActive ? "hide" : "pic"}
          />
          <img
            src={Closer}
            alt="closer"
            onClick={() => setMenuActive(!menuActive)}
            className={menuActive ? "pic" : "hide"}
          />
        </li>
      </ul>
      <div className={menuActive ? "gmenu-active" : "gmenu"}>
        <div className="gmenu-content">
          <Link to="/about">
            <span
              onClick={() => {
                updateDocument(itemId, { count: ++document.count });
                setMenuActive(!menuActive);
              }}
            >
              {t("About Us")}
            </span>
          </Link>
          <Link to="/contacts">
            <span onClick={() => setMenuActive(!menuActive)}>
              {t("Contacts")}
            </span>
          </Link>
          {!user && (
            <>
              <Link to="/signup">
                <span onClick={() => setMenuActive(!menuActive)}>
                  {t("Signup")}
                </span>
              </Link>
              <Link to="/login">
                <span onClick={() => setMenuActive(!menuActive)}>
                  {t("Login")}
                </span>
              </Link>
            </>
          )}

          {user && (
            <Link to="/">
              <span onClick={handleClick}>{t("Logout")}</span>
            </Link>
          )}
          {user && (
            <Link to="/create">
              <span onClick={() => setMenuActive(!menuActive)}>
                {t("Create")}
              </span>
            </Link>
          )}
          {user && (
            <Link to="/orders">
              <span onClick={() => setMenuActive(!menuActive)}>
                {t("Orders")}
              </span>
            </Link>
          )}
          {user && (
            <Link to="/completed">
              <span onClick={() => setMenuActive(!menuActive)}>
                {t("Completed")}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
