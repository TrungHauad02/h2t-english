import { Routes, Route } from "react-router-dom";
import * as Layouts from "layouts";
import * as Pages from "pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.HomePage />} />
      <Route element={<Layouts.StudentLayout />}>
        <Route path="/profile" element={<Pages.StudentProfilePage />} />
        <Route path="/history-test" element={<Pages.ListHistoryTestPage />} />
        <Route
          path="/history-test/:type/:id"
          element={<Pages.HistoryTestPage />}
        />
        <Route
          path="/history-test/toeic/:id"
          element={<Pages.HistoryToeicPage />}
        />
        <Route
          path="/history-test/:type/:id/review"
          element={<Pages.ReviewHistoryTestPage />}
        />

        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/register" element={<Pages.RegisterPage />} />
        <Route path="/forgot-password" element={<Pages.ResetPasswordPage />} />
        <Route path="/lesson/:type" element={<Pages.ListLessonPage />} />
        <Route path="/lesson/:type/:id" element={<Pages.LessonPage />} />
        <Route path="/routes" element={<Pages.ListRoutePage />} />
        <Route path="/routes/:id" element={<Pages.RoutePage />} />
        <Route
          path="/competition-test/:id"
          element={<Pages.CompetitionTestPage />}
        />
        <Route
          path="/competition-test"
          element={<Pages.ListCompetitionTestPage />}
        />
        <Route path="/test/:type" element={<Pages.ListTestPage />} />
        <Route path="/test/:type/:id" element={<Pages.TestPage />} />
        <Route path="/toeic" element={<Pages.LisToeicPage />} />
        <Route path="/toeic/:id" element={<Pages.ToeicPage />} />
      </Route>
      <Route path="/admin" element={<Layouts.AdminLayout />}>
        <Route index element={<Pages.ManageUserPage />} />
        <Route path="manage-student" element={<Pages.ManageStudentPage />} />
        <Route path="manage-teacher" element={<Pages.ManageTeacherPage />} />
        <Route
          path="manage-teacher/teacher-advance"
          element={<Pages.ManageTeacherAdvancePage />}
        />
        <Route path="error-log" element={<Pages.ErrorLogPage />} />
      </Route>
      <Route path="/teacher" element={<Layouts.TeacherLayout />}>
        <Route index element={<Pages.TeacherDashboardPage />} />
        <Route path="dashboard" element={<Pages.TeacherDashboardPage />} />
        <Route path="routes" element={<Pages.ManageRoutePage />} />
        <Route path="information" element={<Pages.InformationPage />} />
        <Route path="routes/:id" element={<Pages.DetailRoutePage />} />
        <Route
          path="routes/:routeId/topics/:id"
          element={<Pages.TopicDetailPage />}
        />
        <Route
          path="routes/:routeId/grammars/:id"
          element={<Pages.GrammarDetailPage />}
        />
        <Route
          path="routes/:routeId/readings/:id"
          element={<Pages.ReadingDetailPage />}
        />
        <Route
          path="routes/:routeId/writings/:id"
          element={<Pages.WritingDetailPage />}
        />
        <Route
          path="routes/:routeId/listenings/:id"
          element={<Pages.ListeningDetailPage />}
        />
        <Route
          path="routes/:routeId/speakings/:id"
          element={<Pages.SpeakingDetailPage />}
        />
        <Route
          path="routes/:routeId/test/:type/:id"
          element={<Pages.TestDetailPage />}
        />
      </Route>
      <Route path="/teacher-advance" element={<Layouts.TeacherAdvanceLayout />}>
        <Route index element={<Pages.ManageCompetitionPage />}
        />
        <Route
          path="competitions"
          element={<Pages.ManageCompetitionPage />}
        />
         <Route
          path="competitions/:id"
          element={<Pages.CompetitionDetailPage />}
        />
         <Route
          path="toeics"
          element={<Pages.ManageToeicPage />}
        />
        <Route
          path="toeics/:id"
          element={<Pages.ToeicDetailPage />}
        />
      </Route>
      <Route path="*" element={<Pages.ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
