import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [selectedContactId, setSelectedContactId] = useState(null);

    return (
        <ContactContext.Provider value={{ selectedContactId, setSelectedContactId }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    return useContext(ContactContext);
};
