import { Navigate, Route, Routes } from "react-router";
import DebugLayout from "./layout/debug/DebugLayout";
import GlobalLayout from "./layout/global/GlobalLayout";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NotepadLayout from "./layout/notepad/NotepadLayout";
import ExitLayout from "./layout/exit/ExitLayout";
import QueryLayout from "./layout/query/QueryLayout";
import SettingsLayout from "./layout/settings/SettingsLayout";
import TreeLayout from "./layout/tree/TreeLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<DebugLayout />} />
          <Route path="query" element={<QueryLayout />} />
          <Route path="notepad" element={<NotepadLayout />} />
          <Route path="settings" element={<SettingsLayout />} />
          <Route path="exit" element={<ExitLayout />} />
          <Route path="tree" element={<TreeLayout />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
