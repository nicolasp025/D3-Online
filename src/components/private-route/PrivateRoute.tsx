import { Outlet } from "react-router";
import ExpConsentLayout from "../../layout/exp-consent/ExpConsentLayout";
import { useConsent } from "../../contexts/ConsentContext";

const PrivateRoute = () => {
  const { consent } = useConsent();

  if (consent) {
    return <Outlet />;
  }

  return <ExpConsentLayout />;
};

export default PrivateRoute;
