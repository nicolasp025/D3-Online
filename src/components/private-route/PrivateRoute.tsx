import { Outlet } from "react-router";
import ExpConsentLayout from "../../layout/exp-consent/ExpConsentLayout";
import ExpStartLayout from "../../layout/exp-start/ExpStartLayout";
import { useExperimentContext } from "../../hooks/useExperimentContext";

const PrivateRoute = () => {
  const { consent, url1, url2, userID } = useExperimentContext();

  if (consent && url1 && url2 && userID) {
    return <Outlet />;
  }

  if (!consent) {
    return <ExpConsentLayout />;
  }

  return <ExpStartLayout />;
};

export default PrivateRoute;
