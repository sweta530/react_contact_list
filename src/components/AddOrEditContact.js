import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddOrEditContact({ open, onClose, id }) {
    const contactInitialData = {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        profile_image: null
    }
    const [formData, setFormData] = useState(contactInitialData);
    const [formError, setFormError] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id !== "") {
            setIsEdit(true);
            getContact();
        }
    }, []);

    function clearForm() {
        setFormError("");
        setFormData(contactInitialData);
    }

    async function getContact() {
        console.log(id, 5555);
        try {
            let result = await fetch("http://localhost:5000/api/contact/" + id);
            result = await result.json();
            setFormData(result.data[0]);
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "profileImage") {
            // If it's a file input, use files[0] as the value
            setFormData(prevState => ({
                ...prevState,
                profile_image: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateForm = (formData) => {
        const { first_name: firstName, phone, email, company } = formData;

        if (!firstName || !phone || !email || !company) {
            throw new Error("Please fill all mandatory fields");
        }
        if (phone.length < 10 || !/^\d+$/.test(phone)) {
            throw new Error("Please enter a valid phone number");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Please enter a valid email address");
        }
    };


    const addContact = async (event) => {
        event.preventDefault();

        try {
            // Trim all data before sending to the API
            const trimmedFormData = {};
            for (let key in formData) {
                // If it's a string, trim it; otherwise, keep the original value
                trimmedFormData[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
            }

            validateForm(trimmedFormData);

            const formDataToSend = new FormData();
            for (let key in trimmedFormData) {
                formDataToSend.append(key, trimmedFormData[key]);
            }

            if (isEdit) {
                const response = await fetch('http://localhost:5000/api/contact/' + id, {
                    method: 'PUT',
                    body: formDataToSend
                });
                if (!response.ok) {
                    throw new Error('Failed to Edit contact');
                }
            } else {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    body: formDataToSend
                });
                if (!response.ok) {
                    throw new Error('Failed to add contact');
                }
            }
            clearForm();
            onClose();
        } catch (error) {
            setFormError(error.message);
        }
    };


    return (
        <>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Contact-Details</DialogTitle>
                <DialogContent>
                    <div className='contact-form'>
                        <label>First Name <span>*</span> </label>
                        <input type='text' name="first_name" value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <label>Last Name </label>
                        <input type='text' name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <label>Phone No <span>*</span></label>
                        <input type='text' name="phone" value={formData.phone} onChange={handleChange} minLength={10} />
                    </div>
                    <div className='contact-form'>
                        <label>Email <span>*</span></label>
                        <input type='email' name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <label>Company <span>*</span></label>
                        <input type='text' name="company" value={formData.company} onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <label>Address </label>
                        <input type='text' name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <label>Profile Image</label>
                        <input type='file' accept="image/*" name="profileImage" onChange={handleChange} />
                    </div>
                    <div className='contact-form'>
                        <span>{formError}</span>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={addContact} type='submit'>Add Contact</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
