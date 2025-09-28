import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from '@mui/material';

const YearPanel = () => {
  const [yearDescription, setYearDescription] = useState("");
  const [years, setYears] = useState([]);

  const fetchYears = async () => {
    try {
      const res = await axios.get("http://localhost:5000/year_table");
      setYears(res.data);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!yearDescription.trim()) return;

    try {
      await axios.post("http://localhost:5000/years", {
        year_description: yearDescription,
      });
      setYearDescription("");
      fetchYears();
    } catch (error) {
      console.error("Error saving year:", error);
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
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: 2,

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
         YEAR PANEL
        </Typography>




      </Box>
      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />


      <Box sx={styles.container}>
        {/* Form Section */}
        <Box sx={styles.formSection}>
          <Box sx={styles.formGroup}>
            <Typography sx={styles.label}>Year Description:</Typography>
            <input
              type="text"
              placeholder="Enter year (e.g., 2026)"
              value={yearDescription}
              onChange={(e) => setYearDescription(e.target.value)}
              style={styles.input}
            />
          </Box>
          <button onClick={handleSubmit} style={styles.button}>Save</button>
        </Box>

        {/* Display Section */}
        <Box sx={styles.displaySection}>
          <Typography sx={styles.label}>Saved Years</Typography>

          <Box sx={styles.scrollableTableContainer}>

            <ul style={styles.list}>
              {years.map((year) => (
                <li key={year.year_id} style={styles.listItem}>
                  {year.year_description} {year.status === 1 ? "(Active)" : ""}
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1,
  
  },
  formSection: {
    width: '100%',
    maxWidth: '48%',
      border: "2px solid maroon",
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  displaySection: {
    width: '100%',
    maxWidth: '48%',
    padding: '20px',
      border: "2px solid maroon",
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: "maroon",
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'maroon',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  scrollableTableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '10px',
  },
};

export default YearPanel;
