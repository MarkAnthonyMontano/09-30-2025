import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';

// COMPONENTS FOLDER
import Unauthorized from './components/Unauthorized';
import Register from './components/Register';
import Login from './components/Login';
import LoginEnrollment from './components/LoginEnrollment';
import ApplicantForgotPassword from './components/ApplicantForgotPassword';
import RegistrarForgotPassword from './components/RegistrarForgotPassword';
import RegistrarResetPassword from './components/RegistrarResetPassword';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideBar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterProf from './components/RegisterProf';
import PageCRUD from './components/PageCRUD';
import UserPageAccess from './components/UserPageAccess';

// PAGES FOLDER
import CourseManagement from './pages/CourseManagement';
import DepartmentManagement from './pages/DepartmentDashboard';
import AdmissionDashboardPanel from './pages/AdmissionDashboard';
import SystemDashboardPanel from './pages/SystemDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard'; //For Professors & Faculty Members
import RegistrarDashboard from './pages/RegistrarDashboard'; // For SuperAdmin & Admin
import ApplicantDashboard from './pages/ApplicantDashboard';
import AccountDashboard from './pages/AccountDashboard';
import ScheduleFilterer from './pages/SchedulePlottingFilter';
import HistoryLogs from './pages/HistoryLogs';

// FACULTY FOLDER
import GradingSheet from './faculty/GradingSheet';
import FacultyWorkload from './faculty/FacultyWorkload';
import FacultyMasterList from './faculty/FacultyMasterlist';
import FacultyStudentClassList from './faculty/FacultyStudentClassList';
import FacultySchedule from './faculty/FacultySchedule';
import FacultyStudentList from './faculty/FacultyStudentList';
import FacultyResetPassword from './faculty/FacultyResetPassword';


// REGISTRAR FOLDER
import SearchCertificateOfRegistration from './registrar/SearchCertificateOfRegistration';
import AdminECATApplicationForm from './registrar/AdminECATApplicationForm';
import AdminPersonalDataForm from './registrar/AdminPersonalDataForm';
import AdminOfficeOfTheRegistrar from './registrar/AdminOfficeOfTheRegistrar';
import AdminDashboard1 from './registrar/AdminDashboard1';
import AdminDashboard2 from './registrar/AdminDashboard2';
import AdminDashboard3 from './registrar/AdminDashboard3';
import AdminDashboard4 from './registrar/AdminDashboard4';
import AdminDashboard5 from './registrar/AdminDashboard5';
import ApplicantList from './registrar/ApplicantList';
import ApplicantListAdmin from './registrar/ApplicantListAdmin';
import StudentRequirements from './registrar/StudentRequirements';
import ExaminationProfile from './registrar/ExaminationProfile';
import RegistrarExaminationProfile from './registrar/RegistrarExaminationProfile';
import AssignScheduleToApplicants from './registrar/AssignScheduleToApplicants';
import AssignEntranceExam from './registrar/AssignEntranceExam';
import ProctorApplicantList from './registrar/ProctorApplicantList';
import ApplicantScoring from './registrar/ApplicantScoring';
import QualifyingExamScore from './registrar/QualifyingExamScore';
import MedicalClearance from './registrar/MedicalClearance';
import MedicalProfile from './registrar/MedicalProfile';
import InterviewerApplicantList from './registrar/InterviewerApplicantList';
import AssignInterviewExam from './registrar/AssignInterviewExam';
import AssignScheduleToApplicantsInterviewer from './registrar/AssignScheduleToApplicantsInterviewer';
import ClassList from './registrar/ClassList';
import ClassRoster from './registrar/ClassRoster';
import ProfessorListPerSection from './registrar/ProfessorListPerClass';
import DepartmentRegistration from './registrar/DprtmntRegistration';
import DepartmentRoom from './registrar/DprtmntRoom';
import DepartmentProf from './registrar/DprtmntProf';
import ProgramTagging from './registrar/ProgramTagging';
import CoursePanel from './registrar/CoursePanel';
import ProgramPanel from './registrar/ProgramPanel';
import CurriculumPanel from './registrar/CurriculumPanel';
import SectionPanel from './registrar/SectionPanel';
import DepartmentSection from './registrar/DepartmentSection';
import StudentProfileForm from './registrar/StudentProfile';
import YearLevelPanel from './registrar/YearLevelPanel';
import YearPanel from './registrar/YearPanel';
import YearUpdateForm from './registrar/YearUpdateForm';
import SemesterPanel from './registrar/SemesterPanel';
import SchoolYearPanel from './registrar/SchoolYearPanel';
import SchoolYearActivatorPanel from './registrar/SchoolYearActivatorPanel';
import RequirementsForm from './registrar/RequirementsForm';
import StudentNumbering from './registrar/StudentNumbering';
import StudentNumberingPerCollege from './registrar/StudentNumberingPerCollege';
import CourseTagging from './registrar/CourseTagging';
import ChangeGradingPeriod from './registrar/ChangeYearGradPer';
import ScheduleChecker from './registrar/ScheduleChecker';
import RoomRegistration from './registrar/RoomRegistration';


// APPLICANT FOLDER
import Dashboard1 from './applicant/Dashboard1';
import Dashboard2 from './applicant/Dashboard2';
import Dashboard3 from './applicant/Dashboard3';
import Dashboard4 from './applicant/Dashboard4';
import Dashboard5 from './applicant/Dashboard5';
import RequirementUploader from './applicant/RequirementUploader';
import PersonalDataForm from './applicant/PersonalDataForm';
import ECATApplicationForm from './applicant/ECATApplicationForm';
import AdmissionFormProcess from './applicant/AdmissionFormProcess';
import AdmissionServices from './applicant/AdmissionServices';
import OfficeOfTheRegistrar from './applicant/OfficeOfTheRegistrar';
import ExamPermit from "./applicant/ExamPermit";
import ApplicantResetPassword from './applicant/ApplicantResetPassword';

// STUDENT FOLDER
import StudentSchedule from './student/StudentSchedule';
import StudentGradingPage from './student/StudentGrade';
import StudentFacultyEvaluation from './student/StudentFacultyEval';
import StudentDashboard1 from './student/StudentDashboard1';
import StudentDashboard2 from './student/StudentDashboard2';
import StudentDashboard3 from './student/StudentDashboard3';
import StudentDashboard4 from './student/StudentDashboard4';
import StudentDashboard5 from './student/StudentDashboard5';
import StudentResetPassword from './student/StudentResetPassword';
import CertificateOfRegistration from './student/CertificateOfRegistration';
import StudentECATApplicationForm from './student/StudentECATApplicationForm';
import StudentOfficeOfTheRegistrar from './student/StudentOfficeOfTheRegistrar';
import StudentPersonalDataForm from './student/StudentPersonalDataForm';
import StudentAdmissionServices from './student/StudentAdmissionServices';
import StudentAdmissionFormProcess from './student/StudentAdmissionFormProcess';


// SUPERADMIN FOLDER
import EmailTemplateManager from './superadmin/EmailTemplateManager';
import Announcement from './superadmin/Announcement';
import SuperAdminApplicantList from './superadmin/SuperAdminApplicantList';
import SuperAdminDashboard1 from './superadmin/SuperAdminDashboard1';
import SuperAdminDashboard2 from './superadmin/SuperAdminDashboard2';
import SuperAdminDashboard3 from './superadmin/SuperAdminDashboard3';
import SuperAdminDashboard4 from './superadmin/SuperAdminDashboard4';
import SuperAdminDashboard5 from './superadmin/SuperAdminDashboard5';
import SuperAdminApplicantResetPassword from './superadmin/SuperAdminApplicantResetPassword';
import SuperAdminStudentResetPassword from './superadmin/SuperAdminStudentResetPassword';
import SuperAdminFacultyResetPassword from './superadmin/SuperAdminFacultyResetPassword';
import SuperAdminRegistrarPassword from './superadmin/SuperAdminRegistrarResetPassword';
import Notifications from './superadmin/Notifications';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    fetchAuthentication();
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const keys = JSON.parse(localStorage.getItem("dashboardKeys") || "{}");


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <header>
          <Navbar isAuthenticated={isAuthenticated} />
        </header>

        <div className="flex">
          {isAuthenticated && (
            <article className='min-w-[21rem] min-h-screen flex'>
              <SideBar setIsAuthenticated={setIsAuthenticated} style={{ height: '100%' }} />
            </article>
          )}

          <main className='w-full'>
            <Routes>
              <Route path="/" element={<LoginEnrollment setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login_applicant" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login" element={<LoginEnrollment setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />

              <Route path="/applicant_forgot_password" element={<ApplicantForgotPassword />} />
              <Route path="/applicant_reset_password" element={<ProtectedRoute><ApplicantResetPassword /></ProtectedRoute>} />

              <Route path="/registrar_forgot_password" element={<RegistrarForgotPassword />} />
              <Route path="/registrar_reset_password" element={<ProtectedRoute><RegistrarResetPassword /></ProtectedRoute>} />

              <Route path="/student_reset_password" element={<ProtectedRoute><StudentResetPassword /></ProtectedRoute>} />
              <Route path="/faculty_reset_password" element={<ProtectedRoute><FacultyResetPassword /></ProtectedRoute>} />
              <Route path="/superadmin_applicant_reset_password" element={<ProtectedRoute><SuperAdminApplicantResetPassword /></ProtectedRoute>} />
              <Route path="/superadmin_student_reset_password" element={<ProtectedRoute><SuperAdminStudentResetPassword /></ProtectedRoute>} />
              <Route path="/superadmin_faculty_reset_password" element={<ProtectedRoute><SuperAdminFacultyResetPassword /></ProtectedRoute>} />
              <Route path="/superadmin_registrar_reset_password" element={<ProtectedRoute><SuperAdminRegistrarPassword /></ProtectedRoute>} />


              <Route path="/registrar_dashboard" element={<ProtectedRoute><RegistrarDashboard /></ProtectedRoute>} />
              <Route path="/faculty_dashboard" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
              <Route path="/applicant_dashboard" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
              <Route path="/register_prof" element={<ProtectedRoute><RegisterProf /></ProtectedRoute>} />

              <Route path="/room_registration" element={<ProtectedRoute><RoomRegistration /></ProtectedRoute>} />
              <Route path="/course_management" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
              <Route path="/program_tagging" element={<ProtectedRoute><ProgramTagging /></ProtectedRoute>} />
              <Route path="/course_panel" element={<ProtectedRoute><CoursePanel /></ProtectedRoute>} />
              <Route path="/program_panel" element={<ProtectedRoute><ProgramPanel /></ProtectedRoute>} />
              <Route path="/department_section_panel" element={<ProtectedRoute><DepartmentSection /></ProtectedRoute>} />
              <Route path="/curriculum_panel" element={<ProtectedRoute><CurriculumPanel /></ProtectedRoute>} />
              <Route path="/department_registration" element={<ProtectedRoute><DepartmentRegistration /></ProtectedRoute>} />
              <Route path="/section_panel" element={<ProtectedRoute><SectionPanel /></ProtectedRoute>} />
              <Route path="/professor_registration" element={<ProtectedRoute><DepartmentProf /></ProtectedRoute>} />
              <Route path="/student_profile_form" element={<ProtectedRoute><StudentProfileForm /></ProtectedRoute>} />
              <Route path="/year_level_panel" element={<ProtectedRoute><YearLevelPanel /></ProtectedRoute>} />
              <Route path="/year_panel" element={<ProtectedRoute><YearPanel /></ProtectedRoute>} />
              <Route path="/year_update_panel" element={<ProtectedRoute><YearUpdateForm /></ProtectedRoute>} />
              <Route path="/semester_panel" element={<ProtectedRoute><SemesterPanel /></ProtectedRoute>} />
              <Route path="/school_year_panel" element={<ProtectedRoute><SchoolYearPanel /></ProtectedRoute>} />
              <Route path="/school_year_activator_panel" element={<ProtectedRoute><SchoolYearActivatorPanel /></ProtectedRoute>} />
              <Route path="/history_logs" element={<ProtectedRoute><HistoryLogs /></ProtectedRoute>} />
              <Route path="/requirements_form" element={<ProtectedRoute><RequirementsForm /></ProtectedRoute>} />
              <Route path="/admission_dashboard" element={<ProtectedRoute><AdmissionDashboardPanel /></ProtectedRoute>} />
              <Route path="/department_dashboard" element={<ProtectedRoute><DepartmentManagement /></ProtectedRoute>} />
              <Route path="/system_dashboard" element={<ProtectedRoute><SystemDashboardPanel /></ProtectedRoute>} />
              <Route path="/account_dashboard" element={<ProtectedRoute><AccountDashboard /></ProtectedRoute>} />
              <Route path="/student_numbering" element={<ProtectedRoute><StudentNumbering /></ProtectedRoute>} />
              <Route path="/student_numbering_per_college" element={<ProtectedRoute><StudentNumberingPerCollege /></ProtectedRoute>} />
              <Route path="/course_tagging" element={<ProtectedRoute><CourseTagging /></ProtectedRoute>} />
              <Route path="/schedule_checker/:dprtmnt_id" element={<ProtectedRoute><ScheduleChecker /></ProtectedRoute>} />
              <Route path="/change_grade_period" element={<ProtectedRoute><ChangeGradingPeriod /></ProtectedRoute>} />
              <Route path="/department_room" element={<ProtectedRoute><DepartmentRoom /></ProtectedRoute>} />
              <Route path="/search_cor" element={<ProtectedRoute><SearchCertificateOfRegistration /></ProtectedRoute>} />
              <Route path="/cor" element={<ProtectedRoute><CertificateOfRegistration /></ProtectedRoute>} />
              <Route path="/select_college" element={<ProtectedRoute><ScheduleFilterer /></ProtectedRoute>} />

              <Route path="/assign_entrance_exam" element={<ProtectedRoute><AssignEntranceExam /></ProtectedRoute>} />
              <Route path="/assign_schedule_applicant" element={<ProtectedRoute><AssignScheduleToApplicants /></ProtectedRoute>} />
              <Route path="/applicant_scoring" element={<ProtectedRoute><ApplicantScoring /></ProtectedRoute>} />

              <Route path="/assign_interview_exam" element={<ProtectedRoute><AssignInterviewExam /></ProtectedRoute>} />
              <Route path="/assign_schedule_applicants_interview" element={<ProtectedRoute><AssignScheduleToApplicantsInterviewer /></ProtectedRoute>} />
              <Route path="/interviewer_applicant_list" element={<ProtectedRoute><InterviewerApplicantList /></ProtectedRoute>} />


              <Route path="/grading_sheet" element={<ProtectedRoute><GradingSheet /></ProtectedRoute>} />
              <Route path="/faculty_workload" element={<ProtectedRoute><FacultyWorkload /></ProtectedRoute>} />
              <Route path="/faculty_masterlist" element={<ProtectedRoute><FacultyMasterList /></ProtectedRoute>} />
              <Route path="/subject_masterlist/:subject_id/:department_section_id/:school_year_id" element={<ProtectedRoute><FacultyStudentClassList /></ProtectedRoute>} />
              <Route path="/faculty_schedule" element={<ProtectedRoute><FacultySchedule /></ProtectedRoute>} />
              <Route path="/class_list/:course_id/:department_section_id/:school_year_id" element={<ProtectedRoute><FacultyStudentList /></ProtectedRoute>} />

              <Route path="/student_dashboard" element={<ProtectedRoute allowedRoles={'student'}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student_schedule" element={<ProtectedRoute allowedRoles={'student'}><StudentSchedule /></ProtectedRoute>} />
              <Route path="/grades_page" element={<ProtectedRoute><StudentGradingPage allowedRoles={'student'} /></ProtectedRoute>} />
              <Route path="/student_faculty_evaluation" element={<ProtectedRoute allowedRoles={'student'}><StudentFacultyEvaluation /></ProtectedRoute>} />

              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/applicant_list" element={<ProtectedRoute><ApplicantList /></ProtectedRoute>} />
              <Route path="/applicant_list_admin" element={<ProtectedRoute><ApplicantListAdmin /></ProtectedRoute>} />
              <Route path="/super_admin_applicant_list" element={<ProtectedRoute><SuperAdminApplicantList /></ProtectedRoute>} />
              <Route path="/proctor_applicant_list" element={<ProtectedRoute><ProctorApplicantList /></ProtectedRoute>} />
              <Route path="/medical_clearance" element={<ProtectedRoute><MedicalClearance /></ProtectedRoute>} />
              <Route path="/medical_profile" element={<ProtectedRoute><MedicalProfile /></ProtectedRoute>} />

              <Route path="/qualifying_exam_scores" element={<ProtectedRoute><QualifyingExamScore /></ProtectedRoute>} />



              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

              <Route path="/admin_dashboard1" element={<ProtectedRoute><AdminDashboard1 /></ProtectedRoute>} />
              <Route path="/admin_dashboard2" element={<ProtectedRoute><AdminDashboard2 /></ProtectedRoute>} />
              <Route path="/admin_dashboard3" element={<ProtectedRoute><AdminDashboard3 /></ProtectedRoute>} />
              <Route path="/admin_dashboard4" element={<ProtectedRoute><AdminDashboard4 /></ProtectedRoute>} />
              <Route path="/admin_dashboard5" element={<ProtectedRoute><AdminDashboard5 /></ProtectedRoute>} />


              <Route path="/student_dashboard1" element={<ProtectedRoute><StudentDashboard1 allowedRoles={'student'} /></ProtectedRoute>} />
              <Route path="/student_dashboard2" element={<ProtectedRoute><StudentDashboard2 allowedRoles={'student'} /></ProtectedRoute>} />
              <Route path="/student_dashboard3" element={<ProtectedRoute><StudentDashboard3 allowedRoles={'student'} /></ProtectedRoute>} />
              <Route path="/student_dashboard4" element={<ProtectedRoute><StudentDashboard4 allowedRoles={'student'} /></ProtectedRoute>} />
              <Route path="/student_dashboard5" element={<ProtectedRoute><StudentDashboard5 allowedRoles={'student'} /></ProtectedRoute>} />

              <Route path="/super_admin_dashboard1" element={<ProtectedRoute><SuperAdminDashboard1 /></ProtectedRoute>} />
              <Route path="/super_admin_dashboard2" element={<ProtectedRoute><SuperAdminDashboard2 /></ProtectedRoute>} />
              <Route path="/super_admin_dashboard3" element={<ProtectedRoute><SuperAdminDashboard3 /></ProtectedRoute>} />
              <Route path="/super_admin_dashboard4" element={<ProtectedRoute><SuperAdminDashboard4 /></ProtectedRoute>} />
              <Route path="/super_admin_dashboard5" element={<ProtectedRoute><SuperAdminDashboard5 /></ProtectedRoute>} />

              <Route
                path="/applicant_dashboard"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ApplicantDashboard />
                  </ProtectedRoute>
                }
              />

              {keys.step1 && (
                <Route
                  path={`/dashboard/${keys.step1}`}
                  element={
                    <ProtectedRoute allowedRoles={['applicant']}>
                      <Dashboard1 />
                    </ProtectedRoute>
                  }
                />
              )}
              {keys.step2 && (
                <Route
                  path={`/dashboard/${keys.step2}`}
                  element={
                    <ProtectedRoute allowedRoles={['applicant']}>
                      <Dashboard2 />
                    </ProtectedRoute>
                  }
                />
              )}
              {keys.step3 && (
                <Route
                  path={`/dashboard/${keys.step3}`}
                  element={
                    <ProtectedRoute allowedRoles={['applicant']}>
                      <Dashboard3 />
                    </ProtectedRoute>
                  }
                />
              )}
              {keys.step4 && (
                <Route
                  path={`/dashboard/${keys.step4}`}
                  element={
                    <ProtectedRoute allowedRoles={['applicant']}>
                      <Dashboard4 />
                    </ProtectedRoute>
                  }
                />
              )}
              {keys.step5 && (
                <Route
                  path={`/dashboard/${keys.step5}`}
                  element={
                    <ProtectedRoute allowedRoles={['applicant']}>
                      <Dashboard5 />
                    </ProtectedRoute>
                  }
                />
              )}

              <Route
                path="/requirements_uploader"
                element={
                  <ProtectedRoute allowedRoles={["applicant"]}>
                    <RequirementUploader />
                  </ProtectedRoute>
                }
              />

              <Route path="/student_requirements" element={<ProtectedRoute ><StudentRequirements /></ProtectedRoute>} />
              <Route path="/admin_ecat_application_form" element={<ProtectedRoute allowedRoles={['registrar', 'applicant']}><AdminECATApplicationForm /></ProtectedRoute>} />
              <Route path="/admin_personal_data_form" element={<ProtectedRoute allowedRoles={['registrar']} ><AdminPersonalDataForm /></ProtectedRoute>} />
              <Route path="/admin_office_of_the_registrar" element={<ProtectedRoute allowedRoles={['registrar']}><AdminOfficeOfTheRegistrar /></ProtectedRoute>} />

              <Route
                path="/personal_data_form"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <PersonalDataForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/ecat_application_form"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ECATApplicationForm />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/admission_form_process"
                element={
                  <ProtectedRoute allowedRoles={['applicant', 'registrar', 'student']}>
                    <AdmissionFormProcess />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admission_services"
                element={
                  <ProtectedRoute allowedRoles={['applicant', 'registrar']}>
                    <AdmissionServices />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/office_of_the_registrar"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <OfficeOfTheRegistrar />
                  </ProtectedRoute>
                }
              />

              <Route path="/class_roster" element={<ProtectedRoute ><ClassRoster /></ProtectedRoute>} />
              <Route path="/class_roster/class_list/ccs/:curriculum_id" element={<ProtectedRoute ><ClassList /></ProtectedRoute>} />
              <Route path="/class_list/ccs/:curriculum_id/:dstID" element={<ProtectedRoute><ProfessorListPerSection /></ProtectedRoute>} />
              <Route path="/email_template_manager" element={<ProtectedRoute><EmailTemplateManager /></ProtectedRoute>} />
              <Route path="/announcement" element={<ProtectedRoute><Announcement /></ProtectedRoute>} />
              <Route path="/exam-permit/:applicant_number" element={<ExamPermit />} />

              <Route path="/student_ecat_application_form" element={<ProtectedRoute allowedRoles={['student',]}><StudentECATApplicationForm /></ProtectedRoute>} />
              <Route path="/student_personal_data_form" element={<ProtectedRoute allowedRoles={['student']} ><StudentPersonalDataForm /></ProtectedRoute>} />
              <Route path="/student_office_of_the_registrar" element={<ProtectedRoute allowedRoles={['student']}><StudentOfficeOfTheRegistrar /></ProtectedRoute>} />
              <Route path="/student_admission_services" element={<ProtectedRoute allowedRoles={['student']} ><StudentAdmissionServices /></ProtectedRoute>} />
              <Route path="/student_form_process" element={<ProtectedRoute allowedRoles={['student', 'registrar', 'applicant']}><StudentAdmissionFormProcess /></ProtectedRoute>} />
              <Route path="/examination_profile" element={<ExaminationProfile />} />
              <Route path="/examination_profile/:applicantNumber" element={<ExaminationProfile />} />

              <Route path="/registrar_examination_profile" element={<ProtectedRoute><RegistrarExaminationProfile /></ProtectedRoute>} />


              <Route path="/page_crud" element={<ProtectedRoute pageId={2}><PageCRUD /></ProtectedRoute>} />
              <Route path="/user_page_access" element={<ProtectedRoute pageId={1}><UserPageAccess /></ProtectedRoute>} />

            </Routes>
          </main>
        </div>

        <footer>
          <Footer />
        </footer>

      </Router>
    </ThemeProvider>
  )
}

export default App