// eslint-disable-next-line no-unused-vars
import React from "react";
import DataTable from "./tablevalidate.jsx";
import { Box, Typography, IconButton } from "@mui/material";
import '/src/ReceivingModule/Components/Style.css';
import '/src/ReceivingModule/Components/ValidationPage.css';

const ValidationPage = () => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '1800px', // Limit the maximum width
      margin: '0 auto', // Center the page content
      padding: '20px', // Add padding for inner spacing
      minHeight: '75vh', // Ensure full height
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Header Section */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center', // Vertical alignment
        backgroundColor: '#263145',
        color: '#fff',
        padding: '10px 20px',
        marginBottom: 2,
      }}
    >
      <IconButton edge="start" color="inherit" aria-label="menu">
        <img
          src="logo.png" // Replace with the actual path to your logo
          alt="Logo"
          style={{ width: 30, height: 30 }}
        />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
        Galanter & Jones SEA. INC.
      </Typography>
    </Box>

    {/* Main Content */}
    <Box sx={{ flex: 1 }}> {/* Flex 1 allows this area to take up remaining space */}
      <DataTable />
    </Box>

    {/* Footer Section with Button */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Align button to the right
        marginTop: 'auto', // Push this section to the bottom
      }}
    >
    </Box>
  </Box>
);

export default ValidationPage;
