import React from 'react';
import ReactDOM from 'react-dom';
import WingsCafeInventorySystem from './WingsCafeInventorySystem';
import firebase from './firebase';

const App = () => {
    return (
        <>
            <WingsCafeInventorySystem />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;