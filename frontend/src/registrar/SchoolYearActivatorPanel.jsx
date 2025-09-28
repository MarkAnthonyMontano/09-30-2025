import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography, Box

} from '@mui/material';


const SchoolYearActivatorPanel = () => {
    const [schoolYears, setSchoolYears] = useState([]);

    const fetchSchoolYears = async () => {
        try {
            const res = await axios.get("http://localhost:5000/school_years");
            setSchoolYears(res.data);
        } catch (error) {
            console.error("Error fetching school years:", error);
        }
    };

    const toggleActivator = async (schoolYearId, currentStatus) => {
        try {
            const updatedStatus = currentStatus === 1 ? 0 : 1;

            if (updatedStatus === 1) {
                // Deactivate all others first
                await axios.put("http://localhost:5000/school_years/deactivate_all");
            }

            // Update the selected school year
            await axios.put(`http://localhost:5000/school_years/${schoolYearId}`, {
                activator: updatedStatus,
            });

            fetchSchoolYears(); // Refresh after change
        } catch (error) {
            console.error("Error updating activator:", error);
        }
    };

    useEffect(() => {
        fetchSchoolYears();
    }, []);

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
        SCHOOL YEAR ACTIVATOR PANEL
        </Typography>

      


      </Box>
      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />

            <table className="w-full border border-gray-300" style= {{border: "2px solid maroon", textAlign: "center"}} >
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>Year Level</th>
                        <th className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>Semester</th>
                        <th className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>Status</th>
                        <th className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {schoolYears.map((sy) => (
                        <tr key={sy.id}>
                            <td className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>
                                {`${sy.year_description}-${parseInt(sy.year_description) + 1}`}
                            </td>
                            <td className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>{sy.semester_description}</td>
                            <td className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>{sy.astatus === 1 ? "Active" : "Inactive"}</td>
                            <td className="p-2 border" style= {{border: "2px solid maroon", textAlign: "center"}}>
                                <button
                                    className={`px-3 py-1 rounded text-white w-full ${
                                        sy.astatus === 1 ? "bg-red-600" : "bg-green-600"
                                    }`}
                                    onClick={() => toggleActivator(sy.id, sy.astatus)}
                                >
                                    {sy.astatus === 1 ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export default SchoolYearActivatorPanel;
