import { Routes, Route } from "react-router-dom";
import * as Layouts from "layouts";
import * as Pages from "pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layouts.StudentLayout />}>
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/register" element={<Pages.RegisterPage />} />
        <Route path="/" element={<Pages.HomePage />} />
      </Route>
      <Route path="*" element={<Pages.ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
