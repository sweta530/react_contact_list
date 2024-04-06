import { useEffect, useState } from 'react';
import './contactStyle.css';
import { useContact } from './ContactContext';
import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import EditContact from './EditContact';

export default function ContactDetails() {
    const { selectedContactId } = useContact();
    const [contact, setContact] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        getContact()
    }, [selectedContactId])


    const handleAddContactClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    async function getContact() {
        try {
            if (selectedContactId) {
                let result = await fetch("http://localhost:5000/api/contact/" + selectedContactId);
                result = await result.json();
                setContact(result.data[0]);
            }
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }

    if (contact.length <= 0) {
        return
    }

    return (
        <>
            <div className='contact-detail-container' >
                <div className='header'>
                    {
                        contact.profile_image ?
                            <Avatar alt={contact.first_name} src={contact.profile_image} sx={{ width: 80, height: 80 }} />
                            :
                            <Avatar sx={{ bgcolor: deepPurple[600], width: 80, height: 80, fontSize: 46 }}>{contact.first_name[0]}{contact.last_name ? contact.last_name[0] : null}</Avatar>
                    }
                    <h2 className='head'>{contact.first_name + " " + contact.last_name}</h2>
                    <h4 className='head'>{contact.email}</h4>
                </div>
                <div className='main-content'>
                    <table className='contact_detail-table'>
                        <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{contact.first_name + " " + contact.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{contact.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{contact.phone}</td>
                            </tr>
                            <tr>
                                <td>Company</td>
                                <td>{contact.company}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{contact.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Button variant='contained' onClick={handleAddContactClick}>Edit Contact</Button>
            </div>
            <EditContact open={dialogOpen} id={contact._id} onClose={handleCloseDialog} />

        </>
    )
}