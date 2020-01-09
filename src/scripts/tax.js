$(document).ready(function () {
    let tax_data = getDataFromLocalStorage("dataTable");

    // Initialize tax datatable
    var $taxTable = $('#taxTable');
    $taxTable.bootstrapTable({
        data: tax_data
    });

    $("#back").on("click", function () {
        $taxTable.bootstrapTable('destroy');
    });
});