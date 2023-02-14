import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFirestore } from "../../../hooks/useFirestore";
import "./Contacts.css";

export default function Contacts() {
  const [feedback, setFeedback] = useState("");
  const { addDocument, response } = useFirestore("feedbacks");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ feedback });
  };

  useEffect(() => {
    if (response.success) {
      setFeedback("");
    }
  }, [response.success]);

  return (
    <div className="contacts">
      <h3>{t('Administrator')}:</h3>
      <br />
      <p>+995 574-16-95-16</p>
      <br />

      <p>
        {t('You can also give feedback, report a bug on the site or thank the staff ^^')}
      </p>
      <form onSubmit={handleSubmit} className="about-submit">
        <label>
          <span>{t('Your feedback')}:</span>
          <textarea
            type="text"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
            required
          />
        </label>
        <button className="btn">{t('Submit')}</button>
      </form>
    </div>
  );
}
