import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
} from '@mui/material';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
const PageCRUD = () => {
    // Container styles for consistent layout
    const containerStyle = {
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '75px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
    };

    const formStyle = {
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        border: '4px solid #000000',
    };

    // State variables
    const [pages, setPages] = useState([]);
    const [currentPageId, setCurrentPageId] = useState(null);
    const [pageDescription, setPageDescription] = useState('');
    const [pageGroup, setPageGroup] = useState('');
    const [hasAccess, setHasAccess] = useState(null);

    const navigate = useNavigate();

 
    const fetchPages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pages');
            setPages(response.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pageData = {
            page_description: pageDescription,
            page_group: pageGroup,
        };

        try {
            if (currentPageId) {
                await axios.put(`http://localhost:5000/api/pages/${currentPageId}`, pageData);
            } else {
                await axios.post('http://localhost:5000/api/pages', pageData);
            }

            fetchPages();
            resetForm();
        } catch (error) {
            console.error('Error saving page:', error);
        }
    };

    const resetForm = () => {
        setCurrentPageId(null);
        setPageDescription('');
        setPageGroup('');
    };

    const handleEdit = (page) => {
        setCurrentPageId(page.id);
        setPageDescription(page.page_description);
        setPageGroup(page.page_group);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/pages/${id}`);
            fetchPages();
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };

    const mainColor = '#000000';

  



    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <Container maxWidth="md" sx={{ my: 5 }}>
                    <CssBaseline />
                    <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fefefe', borderRadius: 2, border: '4px solid black' }}>
                        <Typography variant="h4" fontWeight="bold" align="center" color="black" gutterBottom>
                            Page CRUD Management
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label="Page Description"
                                variant="outlined"
                                fullWidth
                                value={pageDescription}
                                onChange={(e) => setPageDescription(e.target.value)}
                                required
                            />
                            <TextField
                                label="Page Group"
                                variant="outlined"
                                fullWidth
                                value={pageGroup}
                                onChange={(e) => setPageGroup(e.target.value)}
                                required
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: mainColor,
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        '&:hover': { bgcolor: `${mainColor}CC` }
                                    }}
                                    aria-label={currentPageId ? 'Update Record' : 'Create Record'}
                                >
                                    <IoMdAddCircle size={20} />
                                    {currentPageId ? 'Update' : 'Create'}
                                </Button>
                                <Button variant="contained" color="secondary" onClick={resetForm}>
                                    Reset
                                </Button>
                            </Box>
                        </form>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 3, mt: 4, backgroundColor: '#fafafa', borderRadius: 2, border: '4px solid black' }}>
                        <Typography variant="h4" fontWeight="bold" align="center" color="black" gutterBottom>
                            Pages List
                        </Typography>
                        <List>
                            {pages.map((page) => (
                                <React.Fragment key={page.id}>
                                    <ListItem
                                        secondaryAction={
                                            <Box>
                                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(page)} sx={{ color: '#006400' }}>
                                                    <FaRegEdit />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(page.id)} color="error">
                                                    <MdDelete />
                                                </IconButton>
                                            </Box>
                                        }
                                    >
                                        <ListItemText
                                            primary={page.page_description}
                                            secondary={`Group: ${page.page_group}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Container>
            </div>
        </div>
    );
};

export default PageCRUD;
