import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function JobListingManagement() {
	let blankItem = { id: -1, manager_id: "", department: "", listing_title: "", date_listed: "", date_closed: "", job_title: "", job_description: "", additional_information: "", listing_status: ""};
	const [items, setListings] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
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

export default JobListingManagement;