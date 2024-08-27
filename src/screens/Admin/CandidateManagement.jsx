import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function CandidateManagement() {
	let blankListing = { id: -1, user_id: "", full_name: "", email: "", address: "", phone: "", resume: "" };
	const [applications, setHiringManagers] = useState([]);
	const [formObject, setFormObject] = useState(blankListing);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getHiringManagers();
	}, [formObject]);

	const getHiringManagers = function () {
		console.log("in getHiringManagers()");
		fetch("http://localhost:8080/candidates")
            .then((response) => response.json())
            .then((data) => {
                setHiringManagers(data);
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

		rowSelectionHandler("user_id");
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

		rowSelectionHandler("user_id");
	};

	let onCancelClick = function () {
		console.log("in onCancelClick()");

		setFormObject(blankListing);
		rowSelectionHandler("user_id");
	};

	const handleListClick = function (user) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === user.id;

		setFormObject(isAlreadySelected ? blankListing : user);
		rowSelectionHandler("user_id", isAlreadySelected ? null : user);
	};

	const handleInputChange = function (event) {
		console.log("in handleInputChange()");
		const { name, value } = event.target;
		
		setFormObject({ ...formObject, [name]: value });
	};

	return (
		<div className="App">
			<GenericListComponent
				data={applications}
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

export default CandidateManagement;