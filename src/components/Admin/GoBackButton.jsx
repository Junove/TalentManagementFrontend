import React, { useEffect, useState } from 'react';
// mui button
import { Button } from '@mui/material';

export function GoBackButton() {
    return (
        <Button
            variant="contained"
            className="button"
            style={{ 
                backgroundColor: "#d04646", 
                fontWeight: "bold"
            }}
            onClick={() => window.location.href = "/admin" }
        >
            Go Back
        </Button>
    );
}