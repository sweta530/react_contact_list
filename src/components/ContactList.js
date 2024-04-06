import * as React from 'react';
import { useState, useEffect } from 'react';
import './contactStyle.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useContact } from './ContactContext';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const { setSelectedContactId } = useContact(); // Use context

    useEffect(() => {
        getAllContacts();
    }, [setSelectedContactId]);

    const handleRowClick = (contactId) => {
        setSelectedContactId(contactId); // Set selectedContactId using context
    };

    async function getAllContacts() {
        try {
            let result = await fetch("http://localhost:5000/api/contact");
            result = await result.json();
            setContacts(result.data);
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }

    async function deleteContact(id) {
        try {
            let result = await fetch("http://localhost:5000/api/contact/" + id,
                {
                    method: 'DELETE',
                })
            result = await result.json();
            console.log("contact deleted successfully", result);
            getAllContacts();
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }

    return (
        <>
            <table className="table-container">
                <thead>
                    <tr>
                        <th></th>
                        <th>Basic Info</th>
                        <th>Company</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact._id} onClick={() => handleRowClick(contact._id)}>
                            <td>
                                <input type='checkbox' style={{ width: "20px", height: "20px" }} />
                            </td>
                            <td>
                                <div className='basic-info-container'>
                                    {
                                        contact.profile_image ?
                                            <Avatar alt={contact.first_name} src={contact.profile_image} sx={{ width: 48, height: 48 }} />
                                            :
                                            <Avatar sx={{ bgcolor: deepPurple[500], width: 48, height: 48 }}>{contact.first_name[0]}{contact.last_name ? contact.last_name[0] : null}</Avatar>
                                    }
                                    <div className='basic-info-text'>
                                        <h4>{contact.first_name + " " + contact.last_name}</h4>
                                        <h5>{contact.email}</h5>
                                    </div>
                                </div>

                            </td>
                            <td>{contact.company}</td>
                            <td>
                                <IconButton aria-label="delete" onClick={() => { deleteContact(contact._id) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}