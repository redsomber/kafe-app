import "./Home.css";
import Slider from "../../../components/Slider";
import { useCollection } from "../../../hooks/useCollections";
import CardList from "../../../components/CardList";
import Cart from "../../../components/Cart";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { documents: cards } = useCollection("cards");
  const { t } = useTranslation();

  return (
    <>
      <div className="home">
        <Slider />
        <div>
          <section>
            <h2 className="pspace" id="first">
              {t("First Dishes").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "firstdishes")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="second">
              {t("Hot Dishes").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "hotdishes")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="garners">
              {t("Garners").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "garners")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="barbecue">
              {t("Barbecue").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "barbecue")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="salads">
              {t("Salads").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "salads")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="bakery">
              {t("Bakery").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "bakery")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="sauses">
              {t("Sauses").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "sauses")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="drinks">
              {t("Drinks").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "drinks")}
              />
            )}
          </section>
          <section>
            <h2 className="pspace" id="drinks2">
              {t("Alcohol Drinks").toUpperCase()}
            </h2>
            {cards && (
              <CardList
                cards={cards.filter((card) => card.category === "adrinks")}
              />
            )}
          </section>
        </div>
      </div>
      <Cart />
    </>
  );
}
