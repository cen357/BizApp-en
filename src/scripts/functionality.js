$(document).ready(function () {
    // Initialize index and profile counter of the last profile
    var counter = 2;

    // Initialize salary profile data for worksheet
    var ws_data = [{
            "STT": 1,
            "Họ và tên": "Anthony",
            "Lương": 0
        },
        {
            "STT": 2,
            "Họ và tên": 'Jane',
            "Lương": 1
        }
    ];

    // Initialize datatable
    var $table = $('#table');
    $table.bootstrapTable({
        data: ws_data
    });

    // Download function
    $(function () {
        $('#toolbar').find('select').change(function () {
            $table.bootstrapTable('destroy').bootstrapTable({
                exportDataType: $(this).val(),
                exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
                columns: [{
                        field: 'state',
                        checkbox: true,
                        visible: $(this).val() === 'selected'
                    },
                    {
                        field: 'STT',
                        title: 'STT'
                    }, {
                        field: 'Họ và tên',
                        title: 'Họ và tên'
                    }, {
                        field: 'Lương',
                        title: 'Lương'
                    }
                ]
            });
        }).trigger('change');
    });

    // Read imported Json File from local machine
    var control = document.querySelector("#import");
    var importData;
    control.addEventListener("change", function (event) {
        var loadFile = document.querySelector("#import").files[0];

        var reader = new FileReader();
        reader.onload = function (event) {
            var contents = event.target.result;
            importData = getParsedJsonFromText(contents);
            console.log(importData);
            $table.bootstrapTable('load', importData.data);
        };

        reader.onerror = function (event) {
            console.error("File could not be read! Code " + event.target.error.code);
        };

        reader.readAsText(loadFile, "UTF-8");
    }, false);

    // Add new profile
    $("#add_save").on('click', function (e) {
        $table.bootstrapTable('insertRow', {
            index: counter,
            row: {
                "STT": ++counter,
                "Họ và tên": $('#add_name').val(),
                "Lương": $('#add_salary').val()
            }
        });
        // Empty input and close modal
        closeAddModal();
    });

    $('#edit').on('click', function (e) {
        let selectedIndex = getIdSelection($table);
        // Check if no row is selected
        if (selectedIndex === -1) {
            alert("Vui lòng chọn dòng cần sửa");
            e.stopPropagation();
        }
    });

    // Edit selected profile
    $('#edit_save').on('click', function () {
        let selectedIndex = getIdSelection($table);
        // Update row
        $table.bootstrapTable('updateRow', {
            index: selectedIndex - 1,
            row: {
                "Họ và tên": $('#edit_name').val(),
                "Lương": $('#edit_salary').val()
            }
        });
        // Empty input and close modal
        closeEditModal();
    });
    // Remove selected profile
    $('#remove').on('click', function (e) {
        let selectedIndex = getIdSelection($table);
        // Check if no row is selected
        if (selectedIndex === -1) {
            alert("Vui lòng chọn dòng cần xóa");
            e.stopPropagation();
        }

        $table.bootstrapTable('removeByUniqueId', selectedIndex);
        counter--;
        for (let index = selectedIndex; index <= counter; index++) {
            $table.bootstrapTable('updateCellByUniqueId', {
                id: index + 1,
                field: 'STT',
                value: index
            });
        }
    });
});