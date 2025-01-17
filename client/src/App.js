import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from './pages/IndexPages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from "./pages/CreatePost";
import EditPost from './pages/EditPost'; 
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage/>} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/edit/:id" element={<EditPost/>} />
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App; 
