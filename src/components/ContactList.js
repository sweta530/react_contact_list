import * as React from 'react';
import { useState, useEffect } from 'react';
import './contactStyle.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import ContactDetails from './ContactDetails';
import AddOrEditContact from './AddOrEditContact';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Button } from '@mui/material';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [infoContact, setInfoContact] = useState({});
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editID, setEditID] = useState("");
    const [addContactDialogOpen, setAddDialogOpen] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        getAllContacts()
    }, [])
    useEffect(() => {
        const filtered = contacts.filter(contact =>
            contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
    }, [searchTerm, contacts]);

    const handleInfoDialog = (contact) => {
        setInfoContact(contact)
        setInfoDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setInfoContact({});
        setEditID("");
        setEditDialogOpen(false);
        setInfoDialogOpen(false);
        setAddDialogOpen(false);
        getAllContacts();
    };

    const handleEditDialog = (id) => {
        setEditID(id)
        setEditDialogOpen(true);
    };

    const handleAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCheckboxChange = (event, contactId) => {
        if (event.target.checked) {
            setSelectedContacts(prevSelected => [...prevSelected, contactId]);
        } else {
            setSelectedContacts(prevSelected => prevSelected.filter(id => id !== contactId));
            setSelectAll(false); // If any individual checkbox is unchecked, uncheck the master checkbox
        }
    };

    const handleMasterCheckboxChange = (event) => {
        setSelectAll(event.target.checked);
        if (event.target.checked) {
            const allContactIds = contacts.map(contact => contact._id);
            setSelectedContacts(allContactIds);
        } else {
            setSelectedContacts([]);
        }
    };
    // Function to handle deleting selected contacts
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedContacts.map(async id => {
                await deleteContact(id);
            }));
            setSelectedContacts([]);
            setSelectAll(false); // Reset master checkbox
        } catch (error) {
            console.error("Error deleting contacts:", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = contacts.filter(contact =>
            contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
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
            <div className='contact-container'>
                <div className='contact-header-container'>
                    <div className='contact-header'>
                        <PermContactCalendarIcon color="primary" sx={{ fontSize: 46 }} />
                        <h1 style={{ margin: 0 }}>Contacts</h1>
                    </div>
                    <Button variant='contained' onClick={handleAddDialog}>Add Contact</Button>
                </div>

                <input type='text' placeholder='Search' className='search-input icon'
                    onChange={handleSearch} value={searchTerm} />

                <div className='contact-list-table'>
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox' style={{ width: "20px", height: "20px" }}
                                        onChange={handleMasterCheckboxChange}
                                        checked={selectAll} />
                                    {(selectedContacts.length === 0) ? null :
                                        <IconButton aria-label="delete" onClick={handleDeleteSelected}
                                            sx={{ width: 20, height: 20 }} >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                </th>
                                <th>Basic Info</th>
                                <th>Phone</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact) => (
                                <tr key={contact._id} >
                                    <td>
                                        <input
                                            type='checkbox'
                                            style={{ width: "20px", height: "20px" }}
                                            onChange={(event) => handleCheckboxChange(event, contact._id)}
                                            checked={selectedContacts.includes(contact._id)}
                                        />
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
                                    <td>{contact.phone}</td>
                                    <td>{contact.company}</td>
                                    <td>
                                        <IconButton aria-label="Info" onClick={() => handleInfoDialog(contact)}>
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton aria-label="Edit" onClick={() => handleEditDialog(contact._id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => deleteContact(contact._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {addContactDialogOpen &&
                    <AddOrEditContact open={addContactDialogOpen} onClose={handleCloseDialog} id="" />
                }

                {infoDialogOpen &&
                    <ContactDetails open={infoDialogOpen} onClose={handleCloseDialog} contact={infoContact} />
                }

                {editDialogOpen &&
                    <AddOrEditContact open={editDialogOpen} onClose={handleCloseDialog} id={editID} />
                }
            </div>
        </>
    );
}