import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function JobListingManagement() {
	let blankListing = { id: -1, manager_id: "", department: "", listing_title: "", date_listed: "", date_closed: "", job_title: "", job_description: "", additional_information: "", listing_status: ""};
	const [users, setListings] = useState([]);
	const [formObject, setFormObject] = useState(blankListing);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getListings();
	}, [formObject]);

	const getListings = function () {
		console.log("in getListings()");
		fetch("http://localhost:8080/jobs")
            .then((response) => response.json())
            .then((data) => {
                setListings(data);
            }
        );
	};

	let onDeleteClick = function () {
		console.log("in onDeleteClick()");
		let postOpCallback = () => {
			setFormObject(blankListing);
		};

		// if (formObject.id >= 0) {
		// 	deleteById(formObject.id, postOpCallback);
		// } else {
		// 	setFormObject(blankListing);
		// }

		rowSelectionHandler("job_description");
	};

	let onSaveClick = function () {
		console.log("in onSaveClick()");

		// Require name, email, and password fields
		if (
			formObject.username === "" ||
			formObject.password === ""
		) {
			alert("Please fill out all required fields!");
			return;
		}

		// Default to "user" type, so inputting data in this field isn't required
		if (formObject.type !== "user" && formObject.type !== "admin") {
			formObject.type = "user";
		}

		let postOpCallback = () => {
			setFormObject(blankListing);
		};

		// if (formObject.id === -1) {
		// 	post(formObject, postOpCallback);
		// } else {
		// 	put(formObject, postOpCallback);
		// }

		rowSelectionHandler("job_description");
	};

	let onCancelClick = function () {
		console.log("in onCancelClick()");

		setFormObject(blankListing);
		rowSelectionHandler("job_description");
	};

	const handleListClick = function (user) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === user.id;

		setFormObject(isAlreadySelected ? blankListing : user);
		rowSelectionHandler("job_description", isAlreadySelected ? null : user);
	};

	const handleInputChange = function (event) {
		console.log("in handleInputChange()");
		const { name, value } = event.target;
		
		setFormObject({ ...formObject, [name]: value });
	};

	return (
		<div className="App">
			<GenericListComponent
				data={users}
				handleListClick={handleListClick}
			/>

			<br />

			<GenericEditorForm
				mode={mode}
				handleInputChange={handleInputChange}
				formObject={formObject}
				onDeleteClick={onDeleteClick}
				onSaveClick={onSaveClick}
				onCancelClick={onCancelClick}
			/>
		</div>
	);
}

export default JobListingManagement;