import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReceivingReport from './ReceivingModule/Components/ReceivingAJ';
import ValidationPage_Update from './ReceivingModule/Components/UPDATE_RECEIVING/ValidationPage_Update';
import Home from './ReceivingModule/Components/Home';
import ValidationPage from '/src/ReceivingModule/Components/ValidationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-entry" element={<ReceivingReport />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/update-entry" element={<ValidationPage_Update />} />
      </Routes>
    </Router>
  );
};

export default App;