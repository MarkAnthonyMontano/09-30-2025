import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";

const YearLevelPanel = () => {
  const [yearLevelDescription, setYearLevelDescription] = useState("");
  const [yearLevelList, setYearLevelList] = useState([]);

  useEffect(() => {
    fetchYearLevelList();
  }, []);

  const fetchYearLevelList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_year_level");
      setYearLevelList(res.data);
    } catch (err) {
      console.error("Failed to fetch year levels:", err);
    }
  };

  const handleAddYearLevel = async () => {
    if (!yearLevelDescription.trim()) {
      alert("Year level description is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/years_level", {
        year_level_description: yearLevelDescription,
      });
      setYearLevelDescription("");
      fetchYearLevelList();
    } catch (err) {
      console.error("Error adding year level:", err);
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
         YEAR LEVEL PANEL
        </Typography>




      </Box>
      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mt: 4,
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "#fff",
            border: "2px solid maroon",
            boxShadow: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom color="maroon">
            Add Year Level
          </Typography>
          <TextField
            fullWidth
            label="Year Level Description"
            value={yearLevelDescription}
            onChange={(e) => setYearLevelDescription(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "maroon", ":hover": { bgcolor: "#800000" } }}
            onClick={handleAddYearLevel}
          >
            Save
          </Button>
        </Box>

        {/* Display Section */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "#fff",
            boxShadow: 2,
            borderRadius: 2,
                border: "2px solid maroon",
            overflowY: "auto",
            maxHeight: 500,
          }}
        >
          <Typography variant="h6" gutterBottom color="maroon">
            Registered Year Levels
          </Typography>
          <Box sx={{ overflowY: "auto", maxHeight: 400 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f1f1" }}>
                  <th style={styles.tableCell}>Year Level ID</th>
                  <th style={styles.tableCell}>Year Level Description</th>
                </tr>
              </thead>
              <tbody>
                {yearLevelList.map((level, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{level.year_level_id}</td>
                    <td style={styles.tableCell}>
                      {level.year_level_description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  tableCell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  },
};

export default YearLevelPanel;
