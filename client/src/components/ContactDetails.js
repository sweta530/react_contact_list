import './contactStyle.css';
import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function ContactDetails({ open, onClose, contact }) {

    if (!contact || Object.keys(contact).length === 0) {
        return null; // Return null or any placeholder content
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'rgb(230, 230, 230)',
                    },
                }}
            >
                <DialogContent>
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
                                        <td>{contact.address ? contact.address : "Not Available"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={onClose}>close</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}