import { Outlet } from "react-router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ExpConsentLayout from "../exp-consent-layout/ExpConsentLayout";

const PrivateRoute = () => {
  const [consent] = useLocalStorage<boolean>("exp-consent", false);

  if (consent) {
    return <Outlet />;
  }

  return <ExpConsentLayout />;
};

export default PrivateRoute;
