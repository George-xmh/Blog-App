import './App.css';
import Post from "./Post";
import Header from "./Header";
import {Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from './pages/IndexPages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App; 
