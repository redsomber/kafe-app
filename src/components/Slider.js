import { useTranslation } from "react-i18next";
import "./Slider.css";

export default function Slider() {
  const links = document.querySelectorAll(".nav-scroller__item");
  const nav = document.querySelector(".nav-scroller__items");
  const { t } = useTranslation();

  const centerActiveLink = () => {
    const activeLink = nav.querySelector(".active");
    const navWidth = nav.offsetWidth;
    const activeLinkWidth = activeLink.offsetWidth;
    const activeLinkLeft = activeLink.offsetLeft;

    nav.scrollTo({
      left: activeLinkLeft - navWidth / 2 + activeLinkWidth / 2,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", () => {
    links.forEach((link) => {
      const href = link.getAttribute("href");
      const section = document.querySelector(href);
      if (section) {
        if (
          section.offsetTop <= window.pageYOffset + 50 &&
          section.offsetTop + section.offsetHeight > window.pageYOffset + 50
        ) {
          links.forEach((link) => link.classList.remove("active"));
          link.classList.add("active");
          centerActiveLink();
        }
      }
    });
  });

  return (
    <div className="nav-scroller">
      <nav className="nav-scroller__items">
        <a className="nav-scroller__item" href="#first">
          {t("First Dishes")}
        </a>
        <a className="nav-scroller__item" href="#second">
          {t("Hot Dishes")}
        </a>
        <a className="nav-scroller__item" href="#garners">
          {t("Garners")}
        </a>
        <a className="nav-scroller__item" href="#barbecue">
          {t("Barbecue")}
        </a>
        <a className="nav-scroller__item" href="#salads">
          {t("Salads")}
        </a>
        <a className="nav-scroller__item" href="#bakery">
          {t("Bakery")}
        </a>
        <a className="nav-scroller__item" href="#sauses">
          {t("Sauses")}
        </a>
        <a className="nav-scroller__item" href="#drinks">
          {t("Drinks")}
        </a>
        <a className="nav-scroller__item" href="#drinks2">
          {t("Alcohol Drinks")}
        </a>
      </nav>
    </div>
  );
}
