export function UserAddUpdateForm(parameters) {
    return (
        <table className="user-table-editor">
            <b style={{fontSize: '25px'}}>{parameters.mode}</b>
            
            <tbody>
                <tr>
                <td>Name:</td>
                <td>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="someusername" 
                        onChange={ (e) => parameters.handleInputChange(e) }
                        value={parameters.formObject.username} 
                    />
                </td>
                </tr>

                <tr>
                <td>Pass:</td>
                <td>
                    <input 
                        type="text" 
                        name="password"
                        placeholder="supersecurepassword" 
                        onChange={ (e) => parameters.handleInputChange(e) }
                        value={parameters.formObject.password} 
                    />
                </td>

                </tr>
                <td>Role:</td>
                <td>
                    <select 
                        name="role"
                        onChange={(e) => parameters.handleInputChange(e)}
                        value={parameters.formObject.type}
                        className="role-select"
                    >
                        <option value="" disabled>Select role</option>
                        <option value="user">Default User</option>
                        <option value="admin">Administrator</option>
                        <option value="candidate">Candidate</option>
                        <option value="hiring_manager">Hiring Manaager</option>
                    </select>
                </td>

                <tr>
                <td colSpan="2">
                    <button onClick={parameters.onDeleteClick} className="button delete-button">Delete</button>
                    <button onClick={parameters.onSaveClick} className="button save-button">Save</button>
                    <button onClick={parameters.onCancelClick} className="button cancel-button">Cancel</button>
                </td>
                </tr>
            </tbody>
        </table>
    );
}