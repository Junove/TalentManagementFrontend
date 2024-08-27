import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function UserManagement() {
	let blankItem = { id: -1, username: "", password: "", type: "" };
	const [items, setUsers] = useState([]);
	const [formObject, setFormObject] = useState(blankItem);
	let mode = formObject.id === -1 ? "Add" : "Update";

	useEffect(() => {
		getUsers();
	}, [formObject]);

	const getUsers = function () {
		console.log("in getUsers()");
		fetch("http://localhost:8080/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
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

		rowSelectionHandler("username");
	};

	let onSaveClick = function () {
		console.log("in onSaveClick()");

		// Default to "user" type, so inputting data in this field isn't required
		// user, admin, candidate, hiring_manager
		if (
			formObject.type !== "user" && 
			formObject.type !== "admin" && 
			formObject.type !== "candidate" && 
			formObject.type !== "hiring_manager") 
		{
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

		rowSelectionHandler("username");
	};

	let onCancelClick = function () {
		console.log("in onCancelClick()");

		setFormObject(blankItem);
		rowSelectionHandler("username");
	};

	const handleListClick = function (item) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === item.id;

		setFormObject(isAlreadySelected ? blankItem : item);
		rowSelectionHandler("username", isAlreadySelected ? null : item);
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

export default UserManagement;