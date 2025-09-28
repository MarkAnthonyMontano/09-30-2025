import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";

const FacultyEvaluation = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [studentProfessor, setStudentCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [answers, setAnswers] = useState({
    num1: "",
    num2: "",
    num3: "",
  });
  const [isReadOnly, setIsReadOnly] = useState(false);

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
        fetchCourseData(storedID);
        console.log("you are a", storedRole);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchCourseData = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student_course/${id}`
      );
      setStudentCourse(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectedCourse = async (event) => {
    const selected = event.target.value;
    setSelectedCourse(selected);

    const selectedProf = studentProfessor.find(
      (prof) => prof.course_id === selected
    );

    if (selectedProf) {
      await FetchAnswer(selectedProf);
    }
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const selectedProfessor = studentProfessor.find(
    (prof) => prof.course_id === selectedCourse
  );

  const SaveEvaluation = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/student/faculty_evaluation",
        {
          course_id: selectedProfessor?.course_id,
          prof_id: selectedProfessor?.prof_id,
          curriculum_id: selectedProfessor?.curriculum_id,
          active_school_year_id: selectedProfessor?.active_school_year_id,
          num1: answers.num1,
          num2: answers.num2,
          num3: answers.num3,
        }
      );
      alert(res.data.message);
      setIsReadOnly(true);
    } catch (err) {
      console.error("Error saving evaluation:", err);
      alert("Failed to save evaluation.");
    }
  };

  const FetchAnswer = async (prof) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student/faculty_evaluation/answer/${prof.course_id}/${prof.prof_id}/${prof.curriculum_id}/${prof.active_school_year_id}`
      );

      if (res.data && res.data.length > 0) {
        const evaluation = res.data[0];

        setAnswers({
          num1: evaluation.num1,
          num2: evaluation.num2,
          num3: evaluation.num3,
        });

        if (evaluation.eval_status === 1) {
          setIsReadOnly(true);
        } else {
          setIsReadOnly(false);
        }
      } else {
        setAnswers({ num1: "", num2: "", num3: "" });
        setIsReadOnly(false);
      }
    } catch (err) {
      console.error("Error fetching evaluation:", err);
      alert("Failed to get evaluation.");
    }
  };

   // 🔒 Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 🔒 Block DevTools shortcuts + Ctrl+P silently
  document.addEventListener('keydown', (e) => {
    const isBlockedKey =
      e.key === 'F12' || // DevTools
      e.key === 'F11' || // Fullscreen
      (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j')) || // Ctrl+Shift+I/J
      (e.ctrlKey && e.key.toLowerCase() === 'u') || // Ctrl+U (View Source)
      (e.ctrlKey && e.key.toLowerCase() === 'p');   // Ctrl+P (Print)

    if (isBlockedKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  });



  return (
    <Box
      sx={{
        p: 2,
        ml: "-2rem",
        paddingRight: 8,
        height: "calc(100vh - 150px)",
        overflowY: "auto",
      }}
    >
        <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
          
                  mb: 2,
                  px: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: 'maroon',
                    fontSize: '36px',
                  }}
                >
                FACULTY EVALUATION FORM
                </Typography>
        
              
        
        
              </Box>
              <hr style={{ border: "1px solid #ccc", width: "100%" }} />
        
              <br />
        

      {/* Course Select */}
      <FormControl sx={{ mt: 3, minWidth: "600px" }}>
        <InputLabel>Select Course</InputLabel>
        <Select
          label="Select Course"
          value={selectedCourse}
          onChange={handleSelectedCourse}
        >
          {studentProfessor.map((prof) => (
            <MenuItem key={prof.course_id} value={prof.course_id}>
              <Box style={{display: "flex", gap: '1rem'}}><Typography sx={{width: "100px", borderRight: '1px solid rgba(0,0,0,0.1)',}}>{prof.course_code}</Typography>{prof.course_description}</Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Show professor info */}
      {selectedProfessor && (
        <TextField disabled sx={{ mt: 3, ml: 2, minWidth: "500px" }}
          value={`Professor: ${selectedProfessor.fname} ${selectedProfessor.mname} ${selectedProfessor.lname}`}
        />
      )}

      {/* Show questions only if professor selected */}
      {selectedProfessor && (
        <Paper sx={{ mt: 4, p: 3, border: "2px solid maroon" }}>
          <Typography variant="h6" gutterBottom>
            Evaluation Questions
          </Typography>

          {/* Question 1 */}
          <Box sx={{ mt: 2 }}>
            <Typography>
              1. The professor explains the lessons clearly.
            </Typography>
            <RadioGroup
              row
              value={answers.num1}
              onChange={(e) => handleAnswerChange("num1", e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio disabled={isReadOnly} />}
                  label={val}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Question 2 */}
          <Box sx={{ mt: 2 }}>
            <Typography>
              2. The professor is approachable and respectful.
            </Typography>
            <RadioGroup
              row
              value={answers.num2}
              onChange={(e) => handleAnswerChange("num2", e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio disabled={isReadOnly} />}
                  label={val}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Question 3 */}
          <Box sx={{ mt: 2 }}>
            <Typography>
              3. The professor gives constructive feedback on student work.
            </Typography>
            <RadioGroup
              row
              value={answers.num3}
              onChange={(e) => handleAnswerChange("num3", e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio disabled={isReadOnly} />}
                  label={val}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Save button */}
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={SaveEvaluation}
            disabled={isReadOnly || !answers.num1 || !answers.num2 || !answers.num3}
          >
            Submit Evaluation
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default FacultyEvaluation;
