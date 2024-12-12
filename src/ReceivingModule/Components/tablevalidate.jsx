// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { collection, documentId, getDocs , query, where, arrayUnion, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from './firebase.js';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, Button, TableContainer, TextField, TableHead, Box, TableRow, Paper, Typography, Select, MenuItem } from '@mui/material';

const ValidationPage = () => {
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  const [purchaseOrderItems, setPurchaseOrderItems] = useState([]);
  const location = useLocation();
  const [receivingReportItems, setReceivingReportItems] = useState(location.state?.items || []);
  const receivingReportNo = location.state?.receivingReportNo || "";
  console.log(db);
  console.log(receivingReportItems);
  
  const handleFetch = async () => {
    if (!purchaseOrderNo) {
      alert("Please enter a Purchase Order No.");
      return;
    }

    try {
      const purchaseOrderRef = collection(db, "Purchase Order");
      const q = query(purchaseOrderRef, where(documentId(), "==", purchaseOrderNo));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const items2 = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPurchaseOrderItems(items2);
      } else {
        alert("No Purchase Order found!");
        setPurchaseOrderItems([]);
      }
    } catch (error) {
      console.error("Error searching for Purchase Order:", error);
    }
  };

  const handleSave = async () => {
    try {
      for (const item of receivingReportItems) {
        // Ensure the item has a receivingReportNo and other relevant data
        if (receivingReportNo && item.itemName) {
          // Save the item to the "Receiving Report" collection
          const reportRef = doc(db, "Receiving Report", receivingReportNo);
          await setDoc(
            reportRef,
            {
              items: arrayUnion({
                itemName: item.itemName,
                quantityAccepted: item.quantityAccepted,
                unit: item.unit,
                unitCost: item.unitCost,
                totalCost: item.totalCost,
                description: item.description,
                status: item.status,
              }),
            },
            { merge: true } // Merge data to avoid overwriting existing fields
          );
  
          // Save or update the item in the "Inventory" collection
          const inventoryRef = doc(db, "Inventory", item.itemName);
  
          // Fetch the current inventory data for the item
          const inventorySnap = await getDoc(inventoryRef);
          let currentStock = 0;
  
          if (inventorySnap.exists()) {
            const inventoryData = inventorySnap.data();
            currentStock = inventoryData.stock || 0; // Default to 0 if `stock` field is missing
          }
  
          // Calculate the updated stock
          const updatedStock = currentStock + (item.quantityAccepted || 0);
  
          // Update or create the item in the inventory
          await setDoc(
            inventoryRef,
            {
              stock: updatedStock,
              unit: item.unit,
              unitCost: item.unitCost,
              totalCost: updatedStock * item.unitCost, // Update total cost dynamically
              description: item.description,
            },
            { merge: true } // Merge data to avoid overwriting existing fields
          );
        }
      }
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };
  
  // Handle dropdown change for the first table
  const handleReceivingReportChange = (index, value) => {
    const updatedItems = [...receivingReportItems];
    updatedItems[index].status = value;
    setReceivingReportItems(updatedItems);
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#263145' }} gutterBottom>
        Validation Page
      </Typography>

      {/* First Table: Receiving Report Items */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#263145', mt: 2 }} gutterBottom>
        Receiving Report Items
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, marginBottom: 1, width:'18%', height:'10%'}}>
          <TextField
            label="Receiving Report No"
            variant="outlined"
            value={receivingReportNo}
            fullWidth
            disabled
            InputProps={{
              readOnly: true, // Make it read-only
            }}
          />
        </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Item Name</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Quantity Accepted</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Unit</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Unit Cost</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Total Cost</TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Description</TableCell>
              <TableCell sx={{ width: '20%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivingReportItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{item.itemName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.quantityAccepted}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.unit}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.unitCost}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.totalCost}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Select
                    value={item.status || ''}
                    onChange={(e) => handleReceivingReportChange(index, e.target.value)}
                    displayEmpty
                    sx={{ width: '150px', textAlign: 'center' }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      {/* Second Table: Purchase Order Items */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#263145', mt: 2, marginTop: 2}} gutterBottom>
        Purchase Order Items
      </Typography>
    

      <Box sx={{ display: 'flex', gap: 1, marginBottom: 1, width:'35%', height:'10%'}}>
          <TextField
            label="Purchasing Order No"
            variant="outlined"
            value={purchaseOrderNo}
            onChange={(e) => setPurchaseOrderNo(e.target.value)}
            fullWidth
          />
        <Button variant="contained" color="primary" onClick={handleFetch}
        sx={{
          backgroundColor: '#263145',
          color: 'white',
          borderRadius: '50px', 
          paddingX: 5, 
          paddingY: 1, 
          marginLeft: 5,
          '&:hover': { backgroundColor: '#1e283b' },
        }}>
          Search
        </Button>
        </Box>
      
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Item Name</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Quantity Ordered</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Unit</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Unit Cost</TableCell>
              <TableCell sx={{ width: '10%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Total Cost</TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold', color: 'white', backgroundColor: '#263145', textAlign: 'center' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrderItems.map((items2, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{items2.itemName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{items2.qty}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{items2.unit}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{items2.unitCost}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{items2.totalCost}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{items2.Description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
          sx={{
            position: 'absolute',
            bottom: 16, // Adjusts vertical spacing from the bottom
            right: 16, // Adjusts horizontal spacing from the right
          }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#263145',
              color: 'white',
              borderRadius: '50px',
              paddingX: 5,
              paddingY: 1,
              '&:hover': { backgroundColor: '#1e283b' },
            }}>
            Update Inventory
          </Button>
        </Box>
    </Paper>
  );
};

export default ValidationPage;
