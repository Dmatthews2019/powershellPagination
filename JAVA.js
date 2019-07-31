let logContainer = document.getElementById("log");
let table = logContainer.querySelector("table")
let rows = table.querySelectorAll("tr")
let page = 0;

// add 1 to the count because of the headerRow
const firstVisibleRow = () => (page * rowsPerPage) + 1;
const lastVisibleRow = () => (page * rowsPerPage) + rowsPerPage + 1;
let rowsPerPage = 20;
// subtract 1 from length of rows as the first row is the headers
const pages = () => ((rows.length - 1) / rowsPerPage) - 1;
function setPage(pagenum) {
    console.log(pagenum)
    page = pagenum;

    showPage();
    console.log(page)

}
function PrevPage() {
    page -= 1;
    if (page < 0) page = 0;
    showPage();
}
function NextPage() {
    page += 1;
    if (page > pages()) page = pages();
    showPage();
}
function FirstPage() {
    page = 0;
    showPage();
}

function LastPage() {
    page = pages();
    showPage();
}
function showPage() {
    for (var i = 1; i < rows.length; i++) {

        if (i >= firstVisibleRow() && i <= lastVisibleRow()) {
            rows[i].style.display = "table-row";

        } else {
            rows[i].style.display = "none";
        }
    }
}
showPage();// JavaScript source code
