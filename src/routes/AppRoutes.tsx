import { Routes, Route } from "react-router-dom";
import * as Layouts from "layouts";
import * as Pages from "pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layouts.StudentLayout />}>
        <Route path="/" element={<Pages.HomePage />} />
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/register" element={<Pages.RegisterPage />} />
        <Route path="/lesson/:type" element={<Pages.ListLessonPage />} />
        <Route path="/lesson/:type/:id" element={<Pages.LessonPage />} />
        <Route path="/test/:type" element={<Pages.ListTestPage />} />
      </Route>
      <Route element={<Layouts.AdminLayout />}>
        <Route path="/admin" element={<Pages.ManageUserPage />}/>
      </Route>
      <Route path="*" element={<Pages.ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
