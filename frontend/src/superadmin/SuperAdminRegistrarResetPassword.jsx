import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const SuperAdminRegistrarResetPassword = () => {
    //-------------------------------- PAGE ACCESS SCRIPT UPPER PART START --------------------------------//

    const [hasAccess, setHasAccess] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const pageId = 1;

        if (!userId) {
            setHasAccess(false);
            return;
        }

        const checkAccess = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/page_access/${userId}/${pageId}`
                );
                setHasAccess(response.data?.hasAccess || false);
            } catch (error) {
                console.error("Error checking access:", error);
                setHasAccess(false);
            }
        };

        checkAccess();
    }, []);

    //--------------------------------- PAGE ACCESS SCRIPT UPPER PART END ---------------------------------//

    const [searchQuery, setSearchQuery] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resetMsg, setResetMsg] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        const fetchInfo = async () => {
            if (!searchQuery) {
                setUserInfo(null);
                setSearchError("");
                return;
            }
            setLoading(true);
            setResetMsg("");
            setSearchError("");
            try {
                const res = await axios.post(
                    "http://localhost:5000/superadmin-get-registrar",
                    { email: searchQuery }
                );
                setUserInfo(res.data);
            } catch (err) {
                setSearchError(err.response?.data?.message || "No registrar found.");
                setUserInfo(null);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(fetchInfo, 600);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const handleReset = async () => {
        if (!userInfo) return;
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:5000/forgot-password-registrar",
                { email: searchQuery }
            );
            setResetMsg(res.data.message);
        } catch (err) {
            setSearchError(
                err.response?.data?.message || "Error resetting password"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = parseInt(e.target.value, 10);
        setUserInfo((prev) => ({ ...prev, status: newStatus }));

        try {
            await axios.post("http://localhost:5000/superadmin-update-status-registrar", {
                email: userInfo.email,
                status: newStatus,
            });
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    //-------------------------------- PAGE ACCESS SCRIPT LOWER PART START --------------------------------//

    const containerStyle = {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    };

    // Loading state
    if (hasAccess === null) {
        return <div>Loading access information...</div>;
    }

    if (!hasAccess) {
        return (
            <div style={containerStyle}>
                <div>
                    <h1 style={{ color: "#b71c1c", marginBottom: "10px", marginTop: "-120px" }}>
                        Unauthorized Access
                    </h1>
                    <p style={{ fontSize: "16px", color: "#333" }}>
                        You do not have access to this page. <br />
                        Please contact the administrator.
                    </p>
                </div>
            </div>
        );
    }

    //--------------------------------- PAGE ACCESS SCRIPT LOWER PART END ---------------------------------//

    return (
        <Box p={3}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 2,
                    px: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "maroon", fontSize: "36px" }}
                >
                    REGISTRAR PASSWORD RESET
                </Typography>

                <TextField
                    size="small"
                    placeholder="Search Email Address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ mr: 1 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: { xs: "100%", sm: "425px" }, mt: { xs: 2, sm: 0 } }}
                />
            </Box>

            {searchError && <Typography color="error">{searchError}</Typography>}
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Paper sx={{ p: 3, border: "2px solid maroon" }}>
                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                    gap={2}
                >
                    <TextField
                        label="User ID"
                        value={userInfo?.user_id || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Email"
                        value={userInfo?.email || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Full Name"
                        value={userInfo?.fullName || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        select
                        label="Status"
                        value={userInfo?.status ?? ""}
                        fullWidth
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                    </TextField>
                </Box>

                <Box mt={3}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleReset}
                        disabled={!userInfo || loading}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </Button>
                </Box>
            </Paper>

            {resetMsg && (
                <Typography sx={{ mt: 2 }} color="green">
                    {resetMsg}
                </Typography>
            )}
        </Box>
    );
};

export default SuperAdminRegistrarResetPassword;
