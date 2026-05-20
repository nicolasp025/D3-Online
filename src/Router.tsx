import { Route, Routes } from "react-router";
import DebugLayout from "./components/debug-layout/DebugLayout";
import GlobalLayout from "./components/global-layout/GlobalLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<DebugLayout />} />
        <Route path="settings" element={<>Settings page</>} />
      </Route>
    </Routes>
  );
};

export default Router;
