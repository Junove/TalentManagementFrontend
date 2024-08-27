import React, { useEffect, useState } from "react";
import "../../components/Admin/AdminStyles.css";

import { UserAddUpdateForm } from "../../components/Admin/UserAddUpdateForm";
import { UserList } from "../../components/Admin/UserList";

function UserManagement() {
	let blankUser = { id: -1, username: "", email: "", password: "", role: "" };
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

	function rowSelectionHandler(user = null) {
		// find entries by user-row class and set font weight to normal
		for (
			let i = 0;
			i < document.getElementsByClassName("user-row").length;
			i++
		) {
			document.getElementsByClassName("user-row")[
				i
			].style.fontWeight = "normal";
		}

		if (user) {
			const rows = document.getElementsByClassName("user-row");

			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];
				// Assuming you have the user's name or another unique attribute in the first cell of each row
				const userName = row
					.getElementsByTagName("td")[0]
					.textContent.trim();

                console.log("userName: " + userName);
                console.log("user.username: " + user.username);
				if (userName === user.username) {
					row.style.fontWeight = "bold";
				} else {
					row.style.fontWeight = "normal"; // Reset font weight for non-selected rows
				}
			}
		}
	}

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

		rowSelectionHandler();
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

		// Default to "user" role, so inputting data in this field isn't required
		if (formObject.role !== "user" && formObject.role !== "admin") {
			formObject.role = "user";
		}

		let postOpCallback = () => {
			setFormObject(blankUser);
		};

		// if (formObject.id === -1) {
		// 	post(formObject, postOpCallback);
		// } else {
		// 	put(formObject, postOpCallback);
		// }

		rowSelectionHandler();
	};

	let onCancelClick = function () {
		console.log("in onCancelClick()");

		setFormObject(blankUser);
		rowSelectionHandler();
	};

	const handleListClick = function (user) {
		console.log("in handleListClick()");

		const isAlreadySelected = formObject.id === user.id;

		setFormObject(isAlreadySelected ? blankUser : user);
		rowSelectionHandler(isAlreadySelected ? null : user);
	};

	const handleInputChange = function (event) {
		console.log("in handleInputChange()");
		const name = event.target.username;
		const value = event.target.value;
		let newFormObject = { ...formObject };
		newFormObject[name] = value;
		setFormObject(newFormObject);
	};

	return (
		<div className="App">
			<UserList
				users={users}
				handleListClick={handleListClick}
			/>

			<br />

			<UserAddUpdateForm
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