/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

const ItemTable = ({ items, setItems }) => {
  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };


  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ITEM</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>QUANTITY ACCEPTED</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UNIT</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>UNIT COST</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TOTAL COST</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.itemName}</TableCell>
              <TableCell>{item.quantityAccepted}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.unitCost}</TableCell>
              <TableCell>{item.totalCost}</TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary" onClick={() => deleteItem(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
