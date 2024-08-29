import "../../components/Admin/AdminStyles.css";
import withAdminAuth from "../../components/Admin/AdminAuthentication";

import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllHiringManagers, post, put, deleteById } from "../../handlers/HiringManagerAPIHandler";
import { getAllUsers } from "../../handlers/UserAPIHandler";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";
import { GoBackButton } from "../../components/Admin/GoBackButton";

function HiringManagerment() {
	let blankItem = { 
		id: -1, 
		user: {
			id: "",
			username: "",
			password: "",
			type: ""
		}, 
		name: "", 
		email: "", 
		department: "",
		phone: "" 
	};

	const [items, setHiringManagers] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
    const [users, setUsers] = useState([]);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getAllHiringManagers(setHiringManagers);
        getAllUsers(setUsers, "hiring_manager");
	}, [formObject]);

	let onDeleteClick = function () {
		console.log("in onDeleteClick()");
		let postOpCallback = () => {
			setFormObject(blankItem);
		};

		if (formObject.id >= 0) {
			deleteById(formObject.id, postOpCallback);
		} else {
			setFormObject(blankItem);
		}

		rowSelectionHandler();
	};

	const validateFormObject = (formObject) => {
		const errors = [];
	
		if (!formObject.user.username) errors.push("User Username cannot be null.");
		if (!["admin", "candidate", "hiring_manager"].includes(formObject.user.type)) {
			errors.push("User type must be either 'admin', 'candidate', or 'hiring_manager'.");
		}
	
		if (!formObject.user.password) errors.push("User Password cannot be empty.");
		
		if (!formObject.fullName) errors.push("Full Name cannot be empty.");
    	if (!formObject.email || !/\S+@\S+\.\S+/.test(formObject.email)) errors.push("Email must be a valid email address.");
    	if (!formObject.address) errors.push("Address cannot be empty.");
		if (!formObject.department) errors.push("Department cannot be empty.");
    	if (!formObject.resume) errors.push("Resume cannot be empty.");
	
		return errors;
	};

	let onSaveClick = function () {
		console.log("in onSaveClick()");

		let postOpCallback = () => {
			setFormObject(blankItem);
		};

		// add validation ofr formObject to fit the schema
		const validationErrors = validateFormObject(formObject);

		if (validationErrors.length > 0) {
			// console.log("Validation Errors:", validationErrors);
			alert("Validation Errors:\n" + validationErrors.join("\n"));
			return; 
		}

		if (items.some(item => item.user.id === formObject.user.id && item.id !== formObject.id)) {
			alert("Hiring manager with the same user id already exists!");
			return;
		}

		if (formObject.id === -1) {
			post(formObject, postOpCallback);
		} else {
			put(formObject, postOpCallback);
		}

		rowSelectionHandler();
	};

	let onCancelClick = function () {
		console.log("in onCancelClick()");

		setFormObject(blankItem);
		rowSelectionHandler();
	};

	const handleListClick = function (item) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === item.id;

		setFormObject(isAlreadySelected ? blankItem : item);
		rowSelectionHandler(isAlreadySelected ? null : item);
	};

	const handleInputChange = function (event) {
		console.log("in handleInputChange()");
		const { name, value } = event.target;

		if (name === "user") {
			const userId = parseInt(value);
			const selectedUser = users.find(user => user.id === userId);
			setFormObject({ ...formObject, [name]: selectedUser });
			return;
		}
		
		setFormObject({ ...formObject, [name]: value });
	};

	return (
        <Box sx={{ p: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12} md={9}>
					<div style={{ 
						marginBottom: "15px", 
						float: "left",
						width: '100%',
						display: 'flex'
					}}>
						<GoBackButton />
						<Typography variant="h6" style={{ marginLeft: "15px" }}>Hiring Manager Management Page</Typography>
					</div>

                    <GenericListComponent
                        data={items}
                        handleListClick={handleListClick}
                        sx={{ width: '100%' }}
                    />
                </Grid2>

                <Grid2 item xs={12} md={3}>
                    <GenericEditorForm
                        mode={mode}
                        handleInputChange={handleInputChange}
                        formObject={formObject}
                        onDeleteClick={onDeleteClick}
                        onSaveClick={onSaveClick}
                        onCancelClick={onCancelClick}
                        users={users}
                    />
                </Grid2>
            </Grid2>
        </Box>
	);
}

export default withAdminAuth(HiringManagerment);