export function GenericEditorForm(parameters) {
    return (
        <table className="item-table-editor">
            <b style={{fontSize: '25px'}}>{parameters.mode}</b>


            <tbody>
                {Object.keys(parameters.formObject).map((field) => {
                    if (field === "id" || field === "type" || field === "listing_status") {
                        return null;
                    }

                    return (
                        <tr key={field}>
                            <td>{field.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</td>
                            <td>
                                <input 
                                    type="text" 
                                    name={field}
                                    placeholder={field} 
                                    onChange={ (e) => parameters.handleInputChange(e) }
                                    value={
                                        parameters.formObject[field] && typeof parameters.formObject[field] === "object" && "username" in parameters.formObject[field]
                                        ? parameters.formObject[field].username
                                        : parameters.formObject[field]
                                    }
                                />
                            </td>
                        </tr>
                    );
                })}

                {/* Special Select: JOB_LISTING.LISTING_STATUS field */}
                {parameters.formObject.hasOwnProperty("listing_status") && (
                    <tr>
                        
                        <td>Listing Status:</td>
                    
                    <td>
                        <select 
                            name="listing_status"
                            onChange={(e) => parameters.handleInputChange(e)}
                            value={parameters.formObject.listing_status}
                            className="role-select"
                        >
                            <option value="" disabled>Status</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </td>
                    
                    </tr>
                )}

                {/* Special Select: USER.TYPE field */}
                {parameters.formObject.hasOwnProperty("type") && (
                    <tr>
                        
                        <td>Role Type:</td>
                    
                    <td>
                        <select 
                            name="type"
                            onChange={(e) => parameters.handleInputChange(e)}
                            value={parameters.formObject.type}
                            className="role-select"
                        >
                            <option value="" disabled>Role Type</option>
                            <option value="user">Default User</option>
                            <option value="admin">Administrator</option>
                            <option value="candidate">Candidate</option>
                            <option value="hiring_manager">Hiring Manaager</option>
                        </select>
                    </td>
                    
                    </tr>
                )}

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