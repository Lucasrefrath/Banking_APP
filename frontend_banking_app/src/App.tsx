import React from 'react';
import AuthProvider from "./auth/AuthProvider";
import "./index.css"
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
      <BrowserRouter>
        <AuthProvider />
      </BrowserRouter>
    );
}

export default App;
