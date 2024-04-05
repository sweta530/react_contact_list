import * as React from 'react';
import { useState, useEffect } from 'react';
import './contactlist.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        getAllLocalStorageItems()
    }, []);

    const getAllLocalStorageItems = () => {
        const localStorageItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if (value) {
                localStorageItems.push({ key, value: JSON.parse(value) });
            }
        }
        setContacts(localStorageItems);
        console.log(contacts);
    };

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
                        <tr key={contact.key}>
                            <td>
                                <input type='checkbox' style={{ width: "20px", height: "20px" }} />
                            </td>
                            <td>
                                <div className='basic-info-container'>
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{contact.value.firstName[0] + contact.value.lastName[0]}</Avatar>
                                    <div className='basic-info-text'>
                                        <h4>{contact.value.firstName + " " + contact.value.lastName}</h4>
                                        <h5>{contact.value.email}</h5>
                                    </div>
                                </div>

                            </td>
                            <td>{contact.value.company}</td>
                            <td>
                                <DeleteIcon />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}