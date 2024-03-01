import React from 'react';

export const LogsContext = React.createContext();

export const LogsProvider = ({ children }) => {
    const [logs, setLogs ] = React.useState({currentPage: 1, logs: []});

    return (
        <LogsContext.Provider value={[logs, setLogs]}>
            {children}
        </LogsContext.Provider>
    );
};

