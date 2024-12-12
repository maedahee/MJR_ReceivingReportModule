// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { collection, documentId, getDocs, query, where, updateDoc, getDoc, doc} from "firebase/firestore";
import { db } from '../firebase.js';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, Button, TableContainer, TextField, TableHead, Box, TableRow, Paper, Typography, Select, MenuItem } from '@mui/material';

const ValidationPage_Update = () => {
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  const [purchaseOrderItems, setPurchaseOrderItems] = useState([]);
  const location = useLocation();
  const [receivingReportItems, setReceivingReportItems] = useState(location.state?.items || []);
  const [receivingReportNo, setReceivingReportNo] = useState("");

  console.log(db);

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

  const handleFetchReceiving = async () => {
    if (!receivingReportNo) {
      alert("Please enter a Receiving Report No.");
      return;
    }
  
    try {
      const receivingReportRef = collection(db, "Receiving Report");
      const q = query(receivingReportRef, where(documentId(), "==", receivingReportNo));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Extract items from the matched document(s)
        const items = querySnapshot.docs.flatMap((doc) => {
          const docItems = doc.data().items || []; // Assume `items` is an array field
          return docItems.map((item) => ({
            ...item, // Spread item properties
            documentId: doc.id, // Include document ID for reference
          }));
        });
  
        console.log("Fetched Items:", items); // Debugging
        setReceivingReportItems(items); // Update state with extracted items
      } else {
        alert("No Receiving Report found!");
        setReceivingReportItems([]);
      }
    } catch (error) {
      console.error("Error searching for Receiving Report:", error);
    }
  };
  

  const handleSave = async () => {
    try {
      // Group items by their parent document IDs
      const updatesByDocument = receivingReportItems.reduce((acc, item) => {
        if (!acc[item.documentId]) acc[item.documentId] = [];
        acc[item.documentId].push(item);
        return acc;
      }, {});
  
      // Iterate over each document in the "Receiving Report"
      for (const [documentId, items] of Object.entries(updatesByDocument)) {
        console.log("Updating document ID:", documentId);
  
        const docRef = doc(db, "Receiving Report", documentId);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const existingData = docSnapshot.data();
          const updatedItems = existingData.items.map((existingItem) => {
            const updatedItem = items.find((item) => item.id === existingItem.id);
            return updatedItem ? { ...existingItem, status: updatedItem.status } : existingItem;
          });
  
          // Update the "items" array in Firestore
          await updateDoc(docRef, { items: updatedItems });
          console.log("Document updated successfully:", documentId);
        } else {
          console.error("Document not found for ID:", documentId);
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

      <Box sx={{ display: 'flex', gap: 1, marginBottom: 1, width:'35%', height:'10%'}}>
      <TextField
            label="Receiving Report No"
            variant="outlined"
            value={receivingReportNo}
            onChange={(e) => setReceivingReportNo(e.target.value)}
            fullWidth
          />
        <Button variant="contained" color="primary" onClick={handleFetchReceiving}
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
            Save Changes
          </Button>
        </Box>
      </TableContainer>
    </Paper>
  );
};

export default ValidationPage_Update;
