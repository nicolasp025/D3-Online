import { Route, Routes } from "react-router";
import DebugLayout from "./components/debug-layout/DebugLayout";
import GlobalLayout from "./components/global-layout/GlobalLayout";
import PrivateRoute from "./components/private-route/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<DebugLayout />} />
          <Route path="settings" element={<>Settings page</>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
