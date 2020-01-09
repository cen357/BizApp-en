/** Function description: 
 *      Get the index number of the selected profile (checked box)
 *  Parameters: 
 *      + $dataTable: Bootstrap-table selector
 *  Returns: 
 *      - Index number from ID column
 */
function getIdSelection($dataTable) {
    let selected = $dataTable.bootstrapTable('getSelections');
    // Check if there is no selection
    if (selected.length === 0) {
        return -1;
    }
    return selected[0]['STT'];
}

/** Function description: 
 *      Delete input value in add modal and close it
 *  Parameters: 
 *      None
 *  Returns: 
 *      None
 */
function closeAddModal() {
    $("#add_name").val('');
    $("#add_salary").val('');
    $("#addModal").modal('hide');
}

/** Function description: 
 *      Delete input value in edit modal and close it
 *  Parameters:
 *      None
 *  Returns: 
 *      None
 */
function closeEditModal() {
    $("#edit_name").val('');
    $("#edit_salary").val('');
    $("#editModal").modal('hide');
}

/** Function description: 
 *      Parse JSON text
 *  Parameters: 
 *      + Stringified JSON from JSON file
 *  Returns: 
 *      - Parsed JSON
 *      - null
 */
function getParsedJsonFromText(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        // not valid JSON
        return null;
    }
}