import '../App.css';
import Contact from './Contact';
import ContactDetails from './ContactDetails';
import { ContactProvider } from './ContactContext';

export default function MainContent() {
    return (
        <>
            <ContactProvider>
                <div className='contact-container'>
                    <div className='contact-listing' >
                        <Contact />
                    </div>
                    <div className='contact-details' >
                        <ContactDetails />
                    </div>
                </div>
            </ContactProvider>
        </>
    )
}