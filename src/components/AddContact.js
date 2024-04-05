
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import '../App.css';

export default function AddContact({ open, onClose }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        clearForm()
    }, [])

    function clearForm() {
        setFormError("");
        setFirstName("");
        setAddress("");
        setCompany("");
        setEmail("");
        setLastName("");
        setPhone("");
    }

    const addContact = (event) => {
        event.preventDefault();
        let id = Date.now();
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedPhone = phone.trim();
        const trimmedEmail = email.trim();
        const trimmedCompany = company.trim();
        const trimmedAddress = address.trim();

        if (!trimmedFirstName || !trimmedPhone || !trimmedEmail || !trimmedCompany) {
            setFormError("Please fill all mandatory fields");
            return;
        }
        if (trimmedPhone.length < 10 || !/^\d+$/.test(trimmedPhone)) {
            setFormError("Please enter a valid phone number");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setFormError("Please enter a valid email address");
            return;
        }

        setFormError("");
        let data = { firstName: trimmedFirstName, lastName: trimmedLastName, phone: trimmedPhone, email: trimmedEmail, company: trimmedCompany, address: trimmedAddress };
        localStorage.setItem(id, JSON.stringify(data));
        onClose();
    };

    return (
        <>
            <Dialog
                fullWidth={'sm'}
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Contact-Details</DialogTitle>
                <DialogContent>
                    <div className='contact-form'>
                        <label>First Name <span>*</span> </label>
                        <input type='text' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    </div>
                    <div className='contact-form'>
                        <label>Last Name </label>
                        <input type='text' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <div className='contact-form'>
                        <label>Phone No <span>*</span></label>
                        <input type='text' value={phone} onChange={(e) => { setPhone(e.target.value) }} minLength={10} />
                    </div>
                    <div className='contact-form'>
                        <label>Email <span>*</span></label>
                        <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='contact-form'>
                        <label>Company <span>*</span></label>
                        <input type='text' value={company} onChange={(e) => { setCompany(e.target.value) }} />
                    </div>
                    <div className='contact-form'>
                        <label>Address </label>
                        <input type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
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
