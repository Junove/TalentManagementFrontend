import "../../components/Admin/AdminStyles.css";
import withAdminAuth from "../../components/Admin/AdminAuthentication";

import dayjs from "dayjs";
import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllJobs, post, putAdmin, deleteById } from "../../handlers/JobAPIHandler";
import { getAllHiringManagers } from "../../handlers/HiringManagerAPIHandler"

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";
import { GoBackButton } from "../../components/Admin/GoBackButton";

function JobListingManagement() {
	let blankItem = { 
		id: -1, 
		manager_id: "", 
		department: "", 
		listing_title: "", 
		date_listed: null, 
		date_closed: null, 
		job_title: "", 
		job_description: "", 
		additional_information: "", 
		listing_status: ""
	};

	const [items, setListings] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
	const [users, setUsers] = useState([]);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getAllJobs(setListings);
		getAllHiringManagers(setUsers)
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
	
		if (!formObject.department) errors.push("Department cannot be empty.");
		if (!formObject.listing_title) errors.push("Listing Title cannot be empty.");
		if (!formObject.date_listed || !/\d{4}-\d{2}-\d{2}/.test(formObject.date_listed)) errors.push("Date Listed must be in YYYY-MM-DD format.");
		if (formObject.date_closed && !/\d{4}-\d{2}-\d{2}/.test(formObject.date_closed)) errors.push("Date Closed must be in YYYY-MM-DD format if provided.");
		if (!formObject.job_title) errors.push("Job Title cannot be empty.");
		if (!formObject.job_description) errors.push("Job Description cannot be empty.");
		if (!formObject.listing_status) errors.push("Listing Status cannot be empty.");
	
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
			putAdmin(formObject, postOpCallback);
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
	
		// Handle the case where the value might be a dayjs object (for date fields)
		const processedValue = dayjs.isDayjs(value) ? value.format("YYYY-MM-DD HH:mm:ss") : value;
	
		setFormObject({ ...formObject, [name]: processedValue });
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
						<Typography variant="h6" style={{ marginLeft: "15px" }}>Job Listing Management Page</Typography>
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

export default withAdminAuth(JobListingManagement);