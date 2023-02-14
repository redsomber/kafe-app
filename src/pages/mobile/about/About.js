import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFirestore } from "../../../hooks/useFirestore";
import "./About.css";

export default function About() {
  const [contact, setContact] = useState("");
  const { addDocument, response } = useFirestore("contacts");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ contact });
  };

  useEffect(() => {
    if (response.success) {
      setContact("");
    }
  }, [response.success]);

  return (
    <div className="about">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;
        {t(
          `Get your business online with professional and stunning website creation services at unbeatable prices.`
        )}
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;
        {t(
          `Our team will design a custom website tailored to your brand and goals without breaking the bank. With a user-friendly interface and mobile responsiveness, you'll be able to reach and engage with your customers easily. Plus, with 24/7 support, you can focus on growing your business while we handle the technical side.`
        )}
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;
        {t(
          `Don't miss this opportunity to boost your online presence at an affordable cost. Get started today and see your vision come to life! ^^`
        )}
      </p>

      <br />
      <h4>Telegram:</h4>
      <h3>@riviute</h3>
      <br />
      <h4>WhatsApp: </h4>
      <h3>+995 577-06-40-77</h3>
      <form onSubmit={handleSubmit} className="about-submit">
        <label>
          <span>Your contact:</span>
          <p>(telegram/number/email)</p>
          <input
            type="text"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
