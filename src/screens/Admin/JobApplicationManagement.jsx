import "../../components/Admin/AdminStyles.css";
import withAdminAuth from "../../components/Admin/AdminAuthentication";

import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllApplications, post, put, deleteById } from "../../handlers/JobApplicationAPIHandler";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";
import { GoBackButton } from "../../components/Admin/GoBackButton";

function JobApplicationManagement() {
	let blankItem = { 
		id: -1, 
		candidate_id: "", 
		job_id: "", 
		date_applied: "", 
		cover_letter: "", 
		custom_resume: "", 
		application_status: "" 
	};

	const [items, setApplications] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getAllApplications(setApplications);
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
	
		if (!formObject.date_applied || !/\d{4}-\d{2}-\d{2}/.test(formObject.date_applied)) errors.push("Date Applied must be in YYYY-MM-DD format.");
		if (!formObject.cover_letter) errors.push("Cover Letter cannot be empty.");
		if (!formObject.custom_resume) errors.push("Custom Resume cannot be empty.");
		if (!formObject.application_status) errors.push("Application Status cannot be empty.");
	
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
                    />
                </Grid2>
            </Grid2>
        </Box>
	);
}

export default withAdminAuth(JobApplicationManagement);