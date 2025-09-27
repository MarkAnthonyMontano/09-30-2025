import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, IconButton, Snackbar, Alert, Typography
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const API = "http://localhost:5000/api/email-templates";

export default function EmailTemplateManager() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ sender_name: "", is_active: true });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const load = async () => {
    try {
      const res = await axios.get(API);
      setRows(res.data || []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to load templates", "error");
    }
  };

  useEffect(() => { load(); }, []);

  const showSnackbar = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  const onAdd = () => {
    setEditing(null);
    setForm({ sender_name: "", is_active: true });
    setOpen(true);
  };

  const onEdit = (row) => {
    setEditing(row.template_id);
    setForm({ sender_name: row.sender_name, is_active: !!row.is_active });
    setOpen(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      showSnackbar("Template deleted");
      await load();
    } catch {
      showSnackbar("Failed to delete template", "error");
    }
  };

  const onSave = async () => {
    if (!form.sender_name.trim()) return showSnackbar("Sender name is required", "warning");

    try {
      if (editing) await axios.put(`${API}/${editing}`, { sender_name: form.sender_name, is_active: form.is_active });
      else await axios.post(API, { sender_name: form.sender_name, is_active: form.is_active });
      showSnackbar(editing ? "Template updated" : "Template created");
      setOpen(false);
      load();
    } catch {
      showSnackbar("Failed to save template", "error");
    }
  };

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
          EMAIL MANAGER
        </Typography>


      </Box>

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />
      <Button variant="contained" color="success" onClick={onAdd} sx={{ mb: 2 }}>Add Template</Button>
      <Paper sx={{ border: "2px solid maroon" }}>
        <Table size="small">
          <TableHead sx={{ background: "#6D2323" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Gmail Accounts:</TableCell>
              <TableCell sx={{ color: "white" }}>Active</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No templates found.</TableCell>
              </TableRow>
            ) : rows.map(r => (
              <TableRow key={r.template_id}>
                <TableCell>{r.sender_name}</TableCell>
                <TableCell>{r.is_active ? "Yes" : "No"}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(r)} color="primary"><Edit /></IconButton>
                  <IconButton onClick={() => onDelete(r.template_id)} color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Edit Template" : "Add Template"}</DialogTitle>
        <DialogContent>
          <TextField label="Sender Name" fullWidth sx={{ mt: 1, mb: 2 }}
            value={form.sender_name} onChange={e => setForm({ ...form, sender_name: e.target.value })} />
          <FormControlLabel
            control={<Switch checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={onSave} color="success" variant="contained">{editing ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
