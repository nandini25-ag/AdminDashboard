// App.js or wherever you set up your routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
