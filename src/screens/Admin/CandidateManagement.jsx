import "../../components/Admin/AdminStyles.css";
import withAdminAuth from "../../components/Admin/AdminAuthentication";

import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllCandidates, post, put, deleteById } from "../../handlers/CandidateAPIHandler";
import { getAllUsers } from "../../handlers/UserAPIHandler";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";
import { GoBackButton } from "../../components/Admin/GoBackButton";

function CandidateManagement() {
	let blankItem = {
		id: -1, 
		user: {
			id: "",
			username: "",
			password: "",
			type: ""
		},
		fullName: "", 
		email: "", 
		address: "", 
		phone: "", 
		resume: "" 
	};

	const [items, setCandidates] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
    const [users, setUsers] = useState([]);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getAllCandidates(setCandidates);
        getAllUsers(setUsers, "candidate");
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

	let onSaveClick = function () {
		console.log("in onSaveClick()");

		let postOpCallback = () => {
			setFormObject(blankItem);
		};

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
						<Typography variant="h6" style={{ marginLeft: "15px" }}>Candidate Management Page</Typography>
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

export default withAdminAuth(CandidateManagement);