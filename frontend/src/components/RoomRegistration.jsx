import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";

const RoomRegistration = () => {
  const [roomName, setRoomName] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchRoomList();
  }, []);

  const fetchRoomList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/room_list");
      setRoomList(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const handleAddRoom = async () => {
    if (!roomName.trim() || !buildingName.trim())
      return alert("Room name and building name are required");

    try {
      await axios.post("http://localhost:5000/room", {
        room_name: roomName,
        building_name: buildingName
      });
      setRoomName("");
      setBuildingName("");
      fetchRoomList();
    } catch (err) {
      console.error("Error adding room:", err);
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
          ROOM REGISTRATION
        </Typography>




      </Box>
      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />


      <Grid container spacing={4}>
        {/* Form Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, border: "2px solid maroon", borderRadius: 2, }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#800000", }}>
              Register New Room
            </Typography>
            <Typography fontWeight={500}>
              Building Name:
            </Typography>
            <TextField
              fullWidth
              label="Building Name"
              variant="outlined"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography fontWeight={500}>
              Room Name:
            </Typography>
            <TextField
              fullWidth
              label="Room Name"

              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              sx={{ mb: 2, }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleAddRoom}
              sx={{
                backgroundColor: "#800000",
                "&:hover": { backgroundColor: "#a00000" },
              }}
            >
              Save
            </Button>
          </Paper>
        </Grid>

        {/* Room List Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, border: "2px solid maroon", borderRadius: 2, }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#800000" }}>
              Registered Rooms
            </Typography>

            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Room ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Building</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Room Name</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomList.map((room, index) => (
                    <TableRow key={index}>
                      <TableCell>{room.room_id}</TableCell>
                      <TableCell>{room.building_description || "N/A"}</TableCell>
                      <TableCell>{room.room_description}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomRegistration;
