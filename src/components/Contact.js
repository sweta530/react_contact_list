
import React, { useState } from 'react';
import '../App.css';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Button } from '@mui/material';
import ContactList from './ContactList';
import AddContact from './AddContact';

export default function Contact() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddContactClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <div className='flex-div'>
                <PermContactCalendarIcon color="primary" sx={{ fontSize: 46 }} />
                <h1 style={{ margin: 0 }}>Contacts</h1>
            </div>
            <div className='flex-div'>
                <input type='text' placeholder='Search' className='search-input icon' />
                <Button variant='contained' onClick={handleAddContactClick}>Add Contact</Button>
            </div>
            <div className='contact-list-table'>
                <ContactList />
            </div>
            <AddContact open={dialogOpen} onClose={handleCloseDialog} />
        </>
    );
}
