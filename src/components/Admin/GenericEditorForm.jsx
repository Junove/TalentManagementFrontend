import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function GenericEditorForm({
    mode,
    formObject,
    handleInputChange,
    onDeleteClick,
    onSaveClick,
    onCancelClick,
    users
}) {
    return (
        <Box sx={{ p: 3, border: '3px solid #d04646', borderRadius: 5 }}>
            <Typography 
                variant="h5" 
                component="div" 
                sx={{ fontWeight: 'bold' }} 
                gutterBottom
            >
                {mode}
            </Typography>
            
            <Grid2 container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                {Object.keys(formObject).map((field) => {
                    if (field === "id" ) {
                        return null;
                    }

                    // DATE_LISTED
                    if (field === "date_listed" ) {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Listed"
                                    value={formObject.date_listed ? dayjs(formObject.date_listed) : null}
                                    onChange={(date) => {
                                        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : null;
                                        handleInputChange({ target: { name: "date_listed", value: formattedDate } });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        );
                    }
                    
                    // DATE_CLOSED
                    if (field === "date_closed" ) {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Closed"
                                    value={formObject.date_closed ? dayjs(formObject.date_closed) : null}
                                    onChange={(date) => {
                                        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : null;
                                        handleInputChange({ target: { name: "date_closed", value: formattedDate } });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        );
                    }
                    
                    // MANAGER_ID
                    if (field === "manager_id" ) {
                        return (       
                            <FormControl fullWidth sx={{ minWidth: 300 }}>
                                <InputLabel id="select-manager-label">Manager ID</InputLabel>
                                <Select
                                    label="Manager ID"
                                    name="manager_id"
                                    labelId="select-manager_id-label"
                                    id="select-manager_id"
                                    onChange={handleInputChange}
                                    value={formObject.manager_id || ""}
                                    defaultValue=""
                                    sx={{ textAlign: 'left' }}
                                >
                                    {users.map((user) => (
                                        <MenuItem 
                                            key={user.id} 
                                            value={user.id}
                                        >
                                            {user.id} ({user.name})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }
                    
                    // <SOMETHING>.USER (Containers user object USER.ID, USER.USERNAME, USER.PASSWORD, USER.TYPE)
                    if (field === "user") {
                        return (       
                            <FormControl fullWidth sx={{ minWidth: 300 }}>
                                <InputLabel id="select-user-label">User</InputLabel>
                                <Select
                                    label="User"
                                    name="user"
                                    labelId="select-user-label"
                                    id="select-user"
                                    onChange={handleInputChange}
                                    value={formObject.user.id || ""}
                                    defaultValue=""
                                    sx={{ textAlign: 'left' }}
                                >
                                    {users.map((user) => (
                                        <MenuItem 
                                            key={user.id} 
                                            value={user.id}
                                        >
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }

                    // USER.TYPE
                    if (field === "type") {
                        return (
                            <FormControl fullWidth sx={{ minWidth: 300 }}>
                                <InputLabel id="select-role-label">Role Type</InputLabel>
                                <Select
                                    label="Role Type"
                                    name="type"
                                    labelId="select-role-label"
                                    id="select-role"
                                    onChange={handleInputChange}
                                    value={formObject.type}
                                    sx={{ textAlign: 'left' }}
                                >
                                    <MenuItem value="user">Default User</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                    <MenuItem value="candidate">Candidate</MenuItem>
                                    <MenuItem value="hiring_manager">Hiring Manager</MenuItem>
                                </Select>
                            </FormControl>
                        );
                    }

                    // JOB_LISTING.LISTING_STATUS
                    if (field === "listing_status") {
                        return (
                            <FormControl fullWidth sx={{ minWidth: 300 }}>
                                <InputLabel id="select-status-label">Listing Status</InputLabel>
                                <Select
                                    label="Listing Status"
                                    name="listing_status"
                                    labelId="select-status-label"
                                    id="select-status"
                                    onChange={handleInputChange}
                                    value={formObject.listing_status}
                                    sx={{ textAlign: 'left' }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                </Select>
                            </FormControl>
                        );
                    }

                    return (
                        <Grid2 item xs={12} key={field}>
                            <TextField
                                fullWidth
                                multiline
                                label={field.split("_").map((word) => 
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                ).join(" ")}
                                name={field}
                                placeholder={field}
                                onChange={handleInputChange}
                                value={formObject[field]}
                            />
                        </Grid2>
                    );
                })}
            </Grid2>
            
            <Box sx={{ mt: 2, gap: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#d04646' }}
                    onClick={onDeleteClick}
                    disableElevation
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSaveClick}
                    disableElevation
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#d04646' }}
                    onClick={onCancelClick}
                    disableElevation
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
