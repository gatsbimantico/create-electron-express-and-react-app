import React from 'react';

export const StartupConfigPrompter = () => {
    return (
        <div>
            <p>To setup the app we need the following:</p>
            <p>1. Install node and git</p>
            <p>2. Add the path to node /Users/[userName]/.nvm/versions/node/v10.18.1/bin/node</p>
            <p>3. Add the path where to persist data /Users/[userName]/.[appName]</p>
            <p>Done?</p>
            <p></p>
        </div>
    );
};
