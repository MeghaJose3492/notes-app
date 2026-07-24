import './App.css';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import ViewNotes from './ViewNotes';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes" element={<ViewNotes />} />
      <Route path="/" element={<Login />} />
      </Routes>
    </div>
    

  );
}

export default App;
