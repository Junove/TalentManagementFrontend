import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function JobApplicationManagement() {
	let blankItem = { id: -1, candidate_id: "", job_id: "", date_applied: "", cover_letter: "", "custom_resume": "", application_status: "" };
	const [items, setApplications] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getApplications();
	}, [formObject]);

	const getApplications = function () {
		console.log("in getApplications()");
		fetch("http://localhost:8080/applications")
            .then((response) => response.json())
            .then((data) => {
                setApplications(data);
            }
        );
	};

	let onDeleteClick = function () {
		console.log("in onDeleteClick()");
		let postOpCallback = () => {
			setFormObject(blankItem);
		};

		// if (formObject.id >= 0) {
		// 	deleteById(formObject.id, postOpCallback);
		// } else {
		// 	setFormObject(blankItem);
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
			setFormObject(blankItem);
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

		setFormObject(blankItem);
		rowSelectionHandler("job_description");
	};

	const handleListClick = function (user) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === user.id;

		setFormObject(isAlreadySelected ? blankItem : user);
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
				data={items}
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

export default JobApplicationManagement;