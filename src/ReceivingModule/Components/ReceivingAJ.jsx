// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemTable from './ItemTableAJ';
import { TextField, Button, Typography, Divider, Box, MenuItem, IconButton } from '@mui/material';
//import HomePage from './homepage.jsx';



const ReceivingReport = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantityAccepted, setQuantityAccepted] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnit] = useState('Pc');
  const [description, setDescription] = useState('');
  const [receivingReportNo, setReceivingReportNo] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);
  // Generate Receiving Report No when the component mounts
  useEffect(() => {
    const generateReportNo = () => {
      const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
      setReceivingReportNo(randomNum.toString());
    };
    generateReportNo();
  }, []);

  const addItem = () => {
    const totalCost = quantityAccepted * unitCost;
    setItems([...items, { itemName, quantityAccepted, unit, unitCost, totalCost, description }]);
    setItemName('');
    setQuantityAccepted('');
    setUnitCost('');
    setUnit('Pc');
    setDescription('');
  };

  const handleValidation = () => {
    navigate('/validation', { state: { items, receivingReportNo } });// Pass items array to ValidationPage
  };
  

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#263145',
          color: '#fff',
          padding: '10px 20px',
        }}
      >
        
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src="logo.png" alt="Logo" style={{ width: 30, height: 30 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
          Galanter & Jones SEA. INC.
        </Typography>
      </Box>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#263145' }} gutterBottom>
          RECEIVING REPORT
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <TextField
            label="Receiving Report No"
            variant="outlined"
            fullWidth
            value={receivingReportNo} 
            disabled
            InputProps={{
              readOnly: true, // Make it read-only
            }}
          />
          <TextField
            label="Date Received"
            type="date"
            variant="outlined"
            fullWidth
            value={currentDate}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <TextField label="Asset Type" variant="outlined" fullWidth />
          <TextField label="Department" variant="outlined" fullWidth />
          <TextField label="Mode of Acquisition" select fullWidth>
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="Donation">Donation</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField label="Others" variant="outlined" fullWidth />
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Quantity Accepted"
            variant="outlined"
            fullWidth
            value={quantityAccepted}
            onChange={(e) => setQuantityAccepted(Number(e.target.value))}
          />
          <TextField
            label="Unit Cost"
            variant="outlined"
            fullWidth
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
          />
          <TextField
            label="Unit"
            select
            variant="outlined"
            fullWidth
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <MenuItem value="Pc">Pc</MenuItem>
            <MenuItem value="Kg">Kg</MenuItem>
            <MenuItem value="Ltr">Ltr</MenuItem>
          </TextField>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#263145',
            color: 'white',
            borderRadius: '50px', // Makes the button pill-shaped
            paddingX: 5, // Optional: Adjust horizontal padding for a wider appearance
            paddingY: 1, // Optional: Adjust vertical padding for a better pill shape
            '&:hover': { backgroundColor: '#1e283b' },
          }}
          onClick={addItem}
        >
          Add
      </Button>

        <ItemTable items={items} setItems={setItems} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#263145',
              color: 'white',
              borderRadius: '50px', // Makes the button pill-shaped
              paddingX: 4, // Optional: Adjust horizontal padding for a wider appearance
              paddingY: 1, // Optional: Adjust vertical padding for a better pill shape
              '&:hover': { backgroundColor: '#1e283b' },
            }}
            onClick={handleValidation}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReceivingReport;