import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";
import '../styles/Print.css'
import CertificateOfRegistration from './CertificateOfRegistration';
import { Search } from "@mui/icons-material";
import { FcPrint } from "react-icons/fc";

const SearchCertificateOfRegistration = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [debouncedStudentNumber, setDebouncedStudentNumber] = useState("");


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
              margin-top: -15px !important;
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

  useEffect(() => {
    if (studentNumber.trim().length >= 9) { // adjust min length if needed
      const delayDebounce = setTimeout(() => {
        setDebouncedStudentNumber(studentNumber);
      }, 500); // half-second debounce

      return () => clearTimeout(delayDebounce);
    }
  }, [studentNumber]);




  return (
    <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 1, backgroundColor: 'transparent' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mt: 2,
          mb: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "maroon",
            fontSize: "36px",
          }}
        >
          Search Certificate of Registration
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Enter Student Number"
          size="small"
          value={studentNumber}

          onChange={(e) => setStudentNumber(e.target.value)}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          sx={{ width: { xs: "100%", sm: "425px" }, mt: { xs: 2, sm: 0 } }}
        />
      </Box>

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <button
        onClick={printDiv}
        style={{
          marginBottom: "1rem",
          padding: "10px 20px",
          border: "2px solid black",
          backgroundColor: "#f0f0f0",
          color: "black",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#d3d3d3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FcPrint size={20} />
          Print Certificate of Grades
        </span>
      </button>

      <CertificateOfRegistration ref={divToPrintRef} student_number={debouncedStudentNumber}/>
    </Box>
  );
};

export default SearchCertificateOfRegistration;
