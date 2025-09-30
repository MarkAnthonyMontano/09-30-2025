import { CollectionsBookmark } from "@mui/icons-material";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdmissionDashboardPanel = () => {
  return (
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>
      <div className="p-2 px-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div className="relative">
          <Link to={'/super_admin_applicant_list'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              ADMISSION PROCESS FOR SUPERADMIN
            </button>
          </Link>
        </div>


        <div className="relative">
          <Link to={'/applicant_list_admin'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              APPLICATION PROCESS FOR COLLEGE
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/super_admin_dashboard1'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              INFORMATION
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/readmission'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              READMISSION
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/student_requirements'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              DOCUMENTS SUBMITTED
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/assign_entrance_exam'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              ASSIGN ENTRANCE EXAM
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/assign_schedule_applicant'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              ASSIGN SCHEDULE TO APPLICANTS
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/examination_profile'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              EXAMINATION PERMIT
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/proctor_applicant_list'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              PROCTOR APPLICANT LIST
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/applicant_scoring'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              ENTRANCE EXAMINATION SCORES
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/qualifying_exam_scores'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              QUALIFYING / INTEVIEW EXAMINATION SCORES
            </button>
          </Link>
        </div>




        <div className="relative mb-5">
          <Link to={'/assign_interview_exam'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              ROOM SCHEDULING INTERVIEW EXAM
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/assign_schedule_applicants_interview'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              APPLICANTS INTERVIEW SCHEDULING
            </button>
          </Link>
        </div>

        <div className="relative mb-5">
          <Link to={'/interviewer_applicant_list'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              INTERVIEWER APPLICANTS LIST
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/medical_clearance'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              MEDICAL CLEARANCE
            </button>
          </Link>
        </div>

           <div className="relative">
          <Link to={'/medical_clearance'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              MEDICAL CLEARANCE
            </button>
          </Link>
        </div>


           <div className="relative">
          <Link to={'/medical_profile'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              MEDICAL PROFILE
            </button>
          </Link>
        </div>

       

        <div className="relative">
          <Link to={'/class_roster'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              CLASS LIST
            </button>
          </Link>
        </div>



        <div className="relative">
          <Link to={'/admin_dashboard1'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              TRANSFER FORM
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/student_numbering'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              STUDENT NUMBERING PANEL
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/student_numbering_per_college'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              STUDENT NUMBERING PER COLLEGE
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/course_tagging'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              COURSE TAGGING FORM
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/search_cor'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              SEARCH STUDENT COR
            </button>
          </Link>
        </div>

        <div className="relative">
          <Link to={'/draft_load_form'}>
            <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-12 w-enough">
              <CollectionsBookmark className="text-maroon-500 text-2xl" />
            </div>
            <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 h-32 font-medium mr-4 mt-20 ml-8 flex items-end justify-center">
              PAYMENT MODULE
            </button>
          </Link>
        </div>

     

      </div>
    </Box>
  );
};

export default AdmissionDashboardPanel;
