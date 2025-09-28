import React, { useState, useEffect, useRef } from "react";
import '../styles/TempStyles.css';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Avatar
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CertificateOfRegistration from "../student/CertificateOfRegistration";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



const StudentDashboard = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [personData, setPerson] = useState({
    student_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    profile_image: '',
  });
  const [studentDetails, setStudent] = useState({
    program_description: '',
    section_description: '',
    program_code: '',
    year_level: '',
  });
  const [sy, setActiveSY] = useState({
    current_year: '',
    next_year: '',
    semester_description: ''
  });
  const [courseCount, setCourseCount] = useState({
    initial_course: 0,
    passed_course: 0,
    failed_course: 0,
    inc_course: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("person_id");

    if (storedUser && storedRole && storedID) {
      setUser(storedUser);
      setUserRole(storedRole);
      setUserID(storedID);

      if (storedRole !== "student") {
        window.location.href = "/faculty_dashboard";
      } else {
        fetchPersonData(storedID);
        fetchStudentDetails(storedID);
        fetchTotalCourse(storedID);
        console.log("you are an student");
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchPersonData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student/${id}`);
      setPerson(res.data);
    } catch (error) {
      console.error(error)
    }
  };

  const fetchTotalCourse = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/course_count/${id}`);
      console.log("course count:", res.data);
      setCourseCount(res.data || { initial_course: 0 });
    } catch (error) {
      console.error(error)
    }
  };

  const fetchStudentDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student_details/${id}`);
      setStudent(res.data);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/active_school_year`)
      .then((res) => setActiveSY(res.data[0] || {}))
      .catch((err) => console.error(err));
  }, []);

  // Course status value
  const passed = courseCount?.passed_course || 0;
  const failed = courseCount?.failed_course || 0;
  const incomplete = courseCount?.inc_course || 0;
  const total = courseCount?.initial_course || 0;

  // percentages (normalize values to 0–100)
  const passedPercent = total > 0 ? (passed / total) * 100 : 0;
  const failedPercent = total > 0 ? (failed / total) * 100 : 0;
  const incompletePercent = total > 0 ? (incomplete / total) * 100 : 0;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const divToPrintRef = useRef();

  const printDiv = () => {
    const divToPrint = divToPrintRef.current;
    if (divToPrint) {
      const newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }

            html, body {
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
            
              font-family: Arial, sans-serif;
              overflow: hidden;
            }

            .print-container {
              width: 110%;
              height: 100%;

              box-sizing: border-box;
   
              transform: scale(0.90);
              transform-origin: top left;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            button {
              display: none;
            }

            .student-table {
              margin-top: 5px !important;
            }
          </style>
        </head>
        <body onload="window.print(); setTimeout(() => window.close(), 100);">
          <div class="print-container">
            ${divToPrint.innerHTML}
          </div>
        </body>
      </html>
    `);
      newWin.document.close();
    } else {
      console.error("divToPrintRef is not set.");
    }
  };



  const [date, setDate] = useState(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const year = date.getFullYear();
  const month = date.getMonth();

  // Get today's date in Manila timezone (UTC+8)
  const now = new Date();
  const manilaDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  const today = manilaDate.getDate();
  const thisMonth = manilaDate.getMonth();
  const thisYear = manilaDate.getFullYear();

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in the month
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Build weeks array
  const weeks = [];
  let currentDay = 1 - firstDay;

  while (currentDay <= totalDays) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDay > 0 && currentDay <= totalDays) {
        week.push(currentDay);
      } else {
        week.push(null);
      }
      currentDay++;
    }
    weeks.push(week);
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  const [holidays, setHolidays] = useState({});

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/PH`);
        const lookup = {};
        res.data.forEach(h => {
          lookup[h.date] = h;
        });
        setHolidays(lookup);
      } catch (err) {
        console.error("❌ Failed to fetch PH holidays:", err);
        setHolidays({});
      }
    };

    fetchHolidays();
  }, [year]);  // 👈 refetch when year changes

  const [openImage, setOpenImage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements/student");
        setAnnouncements(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);




  return (
    <Box sx={{ p: 4, marginLeft: "-2rem", paddingRight: 8, height: "calc(100vh - 150px)", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ display: "none" }}>
        <CertificateOfRegistration ref={divToPrintRef} student_number={String(personData.student_number || '')} />
      </div>

      <Grid container spacing={3}>
        {/* Student Information */}
        <Grid item xs={12}>
          <Card sx={{
            borderRadius: 1, boxShadow: 3, p: 1, border: "2px solid maroon", height: "260px", transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,

            },
            marginLeft: "10px"
          }}>
            <CardContent>
              {/* Header Row */}
              <Stack
                direction="row"
                alignItems="center"

                justifyContent="space-between" // Pushes date to right
                mb={2}
              >
                {/* Left side: Avatar + Name */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  {!personData?.profile_image ? (
                    <PersonIcon sx={{ color: "maroon" }} fontSize="large" />
                  ) : (
                    <Avatar
                      src={`http://localhost:5000/uploads/${personData.profile_image}`}
                      sx={{ width: 80, height: 80, border: "2px solid maroon" }}
                    />
                  )}
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="maroon">
                      Welcome back! {personData.last_name}, {personData.first_name} {personData.middle_name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Student No. : {personData.student_number}
                    </Typography>
                  </Box>
                </Stack>

                {/* Right side: Date */}
                <Typography
                  variant="body3"
                  color="#000000"
                  sx={{ fontWeight: 500, marginTop: "-10px" }}
                >
                  Date: {formattedDate}
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* Student Details */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Program
                  </Typography>
                  <Typography fontWeight={500}>
                    {studentDetails.program_description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    School Year
                  </Typography>
                  <Typography fontWeight={500}>
                    {sy.current_year}-{sy.next_year}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography fontWeight={500}>Regular</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Year Level
                  </Typography>
                  <Typography fontWeight={500}>{studentDetails.year_level}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Semester
                  </Typography>
                  <Typography fontWeight={500}>{sy.semester_description}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Section
                  </Typography>
                  <Typography fontWeight={500}>
                    {studentDetails.program_code}-{studentDetails.section_description}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>



        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            margin: 0,
            marginLeft: "17px",

            display: "flex",
            flexDirection: "row", // Force 1 row
            justifyContent: "space-between", // Spread them evenly
            flexWrap: "nowrap", // Prevent wrapping
          }}
        >
          {/* Calendar */}
          <Grid item sx={{ flex: "1 1 33%" }}>
            <Card
              sx={{
                border: "2px solid maroon",
                boxShadow: 3,
                p: 2,
                height: "375px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ p: 0, width: "100%" }}>
                {/* Header with month + year + arrows */}
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    backgroundColor: "maroon",
                    color: "white",
                    borderRadius: "6px 6px 0 0",
                    padding: "4px 8px",
                  }}
                >
                  <Grid item>
                    <IconButton size="small" onClick={handlePrevMonth} sx={{ color: "white" }}>
                      <ArrowBackIos fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {date.toLocaleString("default", { month: "long" })} {year}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" onClick={handleNextMonth} sx={{ color: "white" }}>
                      <ArrowForwardIos fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>

                {/* Days of Week */}
                <Divider />
                <Grid container spacing={0.5} sx={{ mt: 1 }}>
                  {days.map((day, idx) => (
                    <Grid item xs key={idx}>
                      <Typography variant="body2" align="center" sx={{ fontWeight: "bold" }}>
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* Dates */}
                {weeks.map((week, i) => (
                  <Grid container spacing={0.5} key={i}>
                    {week.map((day, j) => {
                      if (!day) {
                        return <Grid item xs key={j}></Grid>;
                      }

                      const isToday = day === today && month === thisMonth && year === thisYear;
                      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const isHoliday = holidays[dateKey];

                      return (
                        <Grid item xs key={j}>
                          <Typography
                            variant="body2"
                            align="center"
                            sx={{
                              color: isToday ? "white" : "black",
                              backgroundColor: isToday
                                ? "maroon"
                                : isHoliday
                                  ? "#E8C999"
                                  : "transparent",
                              borderRadius: "50%",
                              width: 45,
                              height: 38,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: isHoliday ? "bold" : "500",
                              margin: "0 auto",
                            }}
                            title={isHoliday ? isHoliday.localName : ""}
                          >
                            {day}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Donut Chart */}
          <Grid item sx={{ flex: "1 1 33%", }}>
            <Card
              sx={{
                border: "2px solid maroon",
                borderRadius: 3,
                boxShadow: 3,

                p: 2,
                height: "375px",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Course Status
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <svg width="200" height="200" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#eee" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="green"
                      strokeWidth="3"
                      strokeDasharray={`${passedPercent} ${100 - passedPercent}`}
                      strokeDashoffset="25"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="red"
                      strokeWidth="3"
                      strokeDasharray={`${failedPercent} ${100 - failedPercent}`}
                      strokeDashoffset={25 - passedPercent}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="orange"
                      strokeWidth="3"
                      strokeDasharray={`${incompletePercent} ${100 - incompletePercent}`}
                      strokeDashoffset={25 - passedPercent - failedPercent}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="4">
                      {courseCount.initial_course} Courses
                    </text>
                  </svg>
                </Box>

                <Stack direction="row" spacing={3} justifyContent="center">
                  <Typography sx={{ fontSize: "14px" }} color="success.main">
                    Passed: {passed}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }} color="error.main">
                    Failed: {failed}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }} color="warning.main">
                    Incomplete: {incomplete}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <Typography sx={{ fontSize: "14px" }} color="success.main">
                    Course Completed: 11
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }} color="warning.main">
                    Course Currently taken: 8
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Announcements */}
          <Grid item sx={{ flex: "1 1 33%" }}>
            <Card
              sx={{
                borderRadius: 3,
                marginLeft: "10px",
                boxShadow: 3,
                p: 2,
                height: "375px",
                display: "flex",
                border: "2px solid #800000",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
                  Announcements
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {announcements.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" align="center">
                    No active announcements.
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: 220, overflowY: "auto" }}>
                    {announcements.map((a) => (
                      <Box
                        key={a.id}
                        sx={{
                          mb: 2,
                          p: 1,
                          width: "100%",
                          borderRadius: 2,
                          border: "1px solid #ddd",
                          backgroundColor: "#fff8f6",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ color: "maroon", fontWeight: "bold" }}>
                          {a.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {a.content}
                        </Typography>

                        {a.file_path && (
                          <>
                            <img
                              src={`http://localhost:5000/uploads/${a.file_path}`}
                              alt={a.title}
                              style={{
                                width: "100%",
                                maxHeight: "120px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                marginBottom: "6px",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenImage(`http://localhost:5000/uploads/${a.file_path}`)}
                            />

                            <Dialog
                              open={Boolean(openImage)}
                              onClose={() => setOpenImage(null)}
                              fullScreen
                              PaperProps={{
                                style: {
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                  boxShadow: "none",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <Box
                                onClick={() => setOpenImage(null)}
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  zIndex: 1,
                                }}
                              />

                              <IconButton
                                onClick={() => setOpenImage(null)}
                                sx={{
                                  position: "absolute",
                                  top: 20,
                                  left: 20,
                                  backgroundColor: "white",
                                  width: 70,
                                  height: 70,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  zIndex: 2,
                                  "&:hover": { backgroundColor: "#f5f5f5" },
                                }}

                              >
                                <KeyboardBackspaceIcon sx={{ fontSize: 50, color: "black" }} />
                              </IconButton>

                              <Box
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                  position: "relative",
                                  zIndex: 2,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                              >
                                <img
                                  src={openImage}
                                  alt="Preview"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "90%",
                                    objectFit: "contain",
                                  }}
                                />
                              </Box>
                            </Dialog>
                          </>
                        )}

                        <Typography variant="caption" color="text.secondary">
                          Expires: {new Date(a.expires_at).toLocaleDateString("en-US")}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={5} sx={{ mt: "-20px" }}>
        {/* Certificate of Registration */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              marginLeft: "10px",
              flexDirection: "column",
              border: "2px solid maroon",
              backgroundColor: "#fffaf5",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 170,
              width: "100%",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <SchoolIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Certificate of Registration
              </Typography>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ backgroundColor: "maroon" }}
                onClick={printDiv}
              >
                Download (Student's Copy)
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Fees */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              border: "2px solid maroon",
              backgroundColor: "#fffaf5",
              minHeight: 170,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fees
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </Box >
  );
};

export default StudentDashboard;

