import { useState } from "react";
import "./ExpConsentLayout.css";
import { useExperimentContext } from "../../hooks/useExperimentContext";

const ExpConsentLayout = () => {
  const [acceptConditions, setAcceptConditions] = useState<boolean>(false);
  const { setConsent, clearAll } = useExperimentContext();

  return (
    <div className="exp-consent-page">
      <div className="exp-consent container">
        <h1>Experiment Consent Form</h1>
        <div className="exp-consent-content">
          <p>
            <u>Voluntary participation in the project:</u>
            Once you have read and understood the information contained in the
            "Project Presentation" section, your signature on this form
            indicates that you agree to participate in the project, and this
            without any restrictions or external pressure. If you don't have the
            information that you need to make a decision, you should not
            hesitate to ask for more information from the contact persons (see
            below).
          </p>
          <p>
            <u>Withdrawal from the project at any time:</u>
            You are completely free to end your participation in the project at
            any time. All you have to do is let the contact persons know
            (below). You don’t have to provide any reasons for your withdrawal.
            Following your withdrawal from the project: Regarding the data
            concerning you which may have been collected before you withdraw
            from the project, the research team may continue to use such data
            for the time during which the data mentioned below is kept, unless
            you have objections which you should make known to the contact
            persons. In this case, the data concerning you will be destroyed.
          </p>
          <p>
            <u>Request for information during the project:</u>
            If you have any additional questions about the project or about your
            rights as a participant in this research, please do not hesitate to
            get in touch with the contact persons mentioned below.
          </p>
          <p>
            <u>Information concerning the principal results of the research</u>
            If you would like a written summary about the principal results of
            this research and their use, please ask the contact persons.
          </p>

          <p>Contact person : steven.costiou@inria.fr</p>

          <p className="user-consent">
            <input
              type="checkbox"
              checked={acceptConditions}
              onChange={() => setAcceptConditions(!acceptConditions)}
            />
            <span>
              I understood the conditions of the experiment and I accept them
            </span>
          </p>

          <div className="exp-consent-actions">
            <button className="btn-consent-no" onClick={clearAll}>
              I do not consent
            </button>
            <button
              className="btn-consent-yes outlined"
              disabled={!acceptConditions}
              onClick={() => setConsent(true)}
            >
              I consent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpConsentLayout;
