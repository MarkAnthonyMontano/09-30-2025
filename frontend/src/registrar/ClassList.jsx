import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container
} from "@mui/material";

const ClassList = () => {
  const { curriculum_id } = useParams();
  const [sections, setSections] = useState([]);

  const fetchSections = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/class_roster/${curriculum_id}`);
      setSections(response.data);
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [curriculum_id]);

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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="maroon" gutterBottom>
        Class Roster Sections
      </Typography>

      {sections.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          No sections found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link
                to={`/class_list/ccs/${curriculum_id}/${section.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: "maroon",
                    borderWidth: "3px",
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                      color="text.primary"
                    >
                      {section.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ClassList;
