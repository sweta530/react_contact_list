import '../App.css';
import Contact from './Contact';

export default function MainContent() {
    return (
        <>
            <div className='contact-container'>
                <div className='contact-listing' >
                    <Contact />
                </div>
                <div className='contact-details' ></div>
            </div>
        </>
    )
}