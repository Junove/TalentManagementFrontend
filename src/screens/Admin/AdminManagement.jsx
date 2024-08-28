import "../../components/Admin/AdminStyles.css";

import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllAdministrators, post, put, deleteById } from "../../handlers/AdminAPIHandler";
import { getAllUsers } from "../../handlers/UserAPIHandler";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function AdminManagement() {
	let blankItem = { 
		id: -1, 
		user: {
			id: "",
			username: "",
			password: "",
			type: ""
		}, 
		name: "", 
		email: ""
	};

	const [items, setAdministrators] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
    const [users, setUsers] = useState([]);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getAllAdministrators(setAdministrators);
        getAllUsers(setUsers);
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
		console.log(formObject);
	};

	return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12} md={9}>
                    <GenericListComponent
                        data={items}
                        handleListClick={handleListClick}
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

export default AdminManagement;