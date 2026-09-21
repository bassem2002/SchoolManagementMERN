import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Connexion from "../pages/Connexion";
import Footer from "../composants/Footer";

import { ToastContainer } from "react-toastify";
import AddUser from "../pages/admin/usersManagement/AddUser";
import UpdateUser from "../pages/admin/usersManagement/UpdateUser";
import ListUsers from "../pages/admin/usersManagement/ListUsers";
import GenericLayout from "../layout/GenericLayout";
import CreateGroup from "../pages/admin/groupsManagement/CreateGroup";
import ListGroups from "../pages/admin/groupsManagement/ListGroups";
import UpdateGroup from "../pages/admin/groupsManagement/UpdateGroup";
import AddDocument from "../pages/teacher/documents_management/AddDocument";
import DocumentsList from "../pages/teacher/documents_management/DocumentsList";
import UpdateDocument from "../pages/teacher/documents_management/UpdateDocument";
import CreateMatiere from "../pages/admin/matiereManagement/CreateMatiere";
import ListMatiere from "../pages/admin/matiereManagement/ListMatiere";
import UpdateMatiere from "../pages/admin/matiereManagement/UpdateMatiere";
import AddLesson from "../pages/admin/lessonsManagement/AddLesson";
import ListLessons from "../pages/admin/lessonsManagement/ListLessons";
import UpdateLesson from "../pages/admin/lessonsManagement/UpdateLesson";
import Calendar from "../pages/admin/AdminCalendar/Calendar";
import TeacherCalendar from "../pages/teacher/calendar/TeacherCalendar";
import StudentCalendar from "../pages/student/calendar/StudentCalendar";
import SubjectStudent from "../pages/student/documents/SubjectStudent";
import SubjectDocuments from "../pages/student/documents/SubjectDocuments";
import ProtectedRoutes from "../layout/ProtectedRoutes";
import Unauthorized401 from "../pages/Unauthorized";
import Contact from "../pages/Contact";
import Filieres from "../pages/Filieres";
import Equipe from "../pages/Equipe";
import VieScolaire from "../pages/VieScolaire";
import TeacherSubjects from "../pages/teacher/subjects/TeacherSubjects";
import AddRoom from "../pages/admin/roomsManagement/AddRoom";
import ListRooms from "../pages/admin/roomsManagement/ListRooms";
import UpdateRoom from "../pages/admin/roomsManagement/UpdateRoom";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

function AppRouter() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Equipe" element={<Equipe />} />
        <Route path="/vie-scolaire" element={<VieScolaire />} />
        <Route path="/Filieres" element={<Filieres />} />
        <Route path="/unauthorized" element={<Unauthorized401 />} />
        <Route path="/connexion" element={<Connexion />} />

        {/* 🔐 ADMIN uniquement */}
        <Route
          path="/add_user"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              <GenericLayout>
                <AddUser />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update_user/:id"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <UpdateUser />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin_dashboard"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <AdminDashboard />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/list_users"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <ListUsers />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/create_group"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              <GenericLayout>
                <CreateGroup />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/list_groups"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <ListGroups />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/update_group/:id"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <UpdateGroup />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/add_document"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher"]}>
              <GenericLayout>
                <AddDocument />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              <GenericLayout>
                <Profile user={user} />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/documents_list"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              {" "}
              <GenericLayout>
                <DocumentsList />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/Update_document/:id"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher"]}>
              {" "}
              <GenericLayout>
                <UpdateDocument />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/teacher_calendar"
          element={
            <ProtectedRoutes allowedRoles={"teacher"}>
              <GenericLayout>
                <TeacherCalendar />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/Create_matiere"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <CreateMatiere />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        {/*  rooms admin  */}
        <Route
          path="/create_room"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <AddRoom />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/list_rooms"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <ListRooms />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update_room/:id"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <UpdateRoom />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/List_matiere"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              <GenericLayout>
                <ListMatiere />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/Update_matiere/:id"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher"]}>
              <GenericLayout>
                <UpdateMatiere />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/add_lesson"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <AddLesson />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/list_lessons"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              {" "}
              <GenericLayout>
                <ListLessons />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Update_lesson/:id"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              <GenericLayout>
                <UpdateLesson />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin_calendar"
          element={
            <ProtectedRoutes allowedRoles={"admin"}>
              {" "}
              <GenericLayout>
                <Calendar />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/student_calendar"
          element={
            <ProtectedRoutes allowedRoles={"student"}>
              {" "}
              <GenericLayout>
                <StudentCalendar />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/student_subjects"
          element={
            <ProtectedRoutes allowedRoles={"student"}>
              {" "}
              <GenericLayout>
                <SubjectStudent />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/subject_documents/:id"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              {" "}
              <GenericLayout>
                <SubjectDocuments />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/teacher_subjects"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher"]}>
              {" "}
              <GenericLayout>
                <TeacherSubjects />
              </GenericLayout>
            </ProtectedRoutes>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default AppRouter;
