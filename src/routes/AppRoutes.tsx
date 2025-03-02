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
        <Route path="/route" element={<Pages.ListRoutePage />} />
        <Route path="/route/:id" element={<Pages.RoutePage />} />
        <Route path="/test/:type" element={<Pages.ListTestPage />} />
        <Route path="/test/:type/:id" element={<Pages.TestPage />} />
      </Route>
      <Route path="/admin" element={<Layouts.AdminLayout />}>
        <Route index element={<Pages.ManageUserPage />} />
        <Route path="manage-student" element={<Pages.ManageStudentPage />} />
        <Route path="manage-teacher" element={<Pages.ManageTeacherPage />} />
      </Route>
      <Route path="*" element={<Pages.ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
