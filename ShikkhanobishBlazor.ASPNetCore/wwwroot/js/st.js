var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/Student"

        },
        "columns": [
            { "data": "studentID" },
            { "data": "phonenumber" },
            { "data": "password" },
            { "data": "totalSpent" },
            { "data": "totalTuitionTime" },
            { "data": "coin" },
            { "data": "freemin" },
            { "data": "name" },
            { "data": "institutionName" },
            { "data": "response" }
            
        ]
    });
}