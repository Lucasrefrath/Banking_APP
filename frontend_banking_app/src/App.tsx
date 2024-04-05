import React from 'react';

const App = () => {

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/open', {
                method: 'GET',
            });
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            <button onClick={handleLogin}>LogIn</button>
        </div>
    );
}

export default App;
