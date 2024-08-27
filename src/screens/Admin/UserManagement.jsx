import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { GenericEditorForm } from "../../components/Admin/GenericEditorForm";
import { GenericListComponent } from "../../components/Admin/GenericListComponent";
import { rowSelectionHandler } from "../../components/Admin/RowSelectionHandler";

function UserManagement() {
	let blankUser = { id: -1, username: "", password: "", type: "" };
	const [users, setUsers] = useState([]);
	const [formObject, setFormObject] = useState(blankUser);
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
			setFormObject(blankUser);
		};

		// if (formObject.id >= 0) {
		// 	deleteById(formObject.id, postOpCallback);
		// } else {
		// 	setFormObject(blankUser);
		// }

		rowSelectionHandler("username");
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
			setFormObject(blankUser);
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

		setFormObject(blankUser);
		rowSelectionHandler("username");
	};

	const handleListClick = function (user) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === user.id;

		setFormObject(isAlreadySelected ? blankUser : user);
		rowSelectionHandler("username", isAlreadySelected ? null : user);
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

export default UserManagement;