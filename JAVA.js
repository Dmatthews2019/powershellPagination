let logContainer = document.getElementById("log");
let table = logContainer.querySelector("table")
let rows = table.querySelectorAll("tr")
let page = 0;

// add 1 to the count because of the headerRow
const firstVisibleRow = () => (page * rowsPerPage) + 1;
const lastVisibleRow = () => (page * rowsPerPage) + rowsPerPage + 1;
let rowsPerPage = 20;
// subtract 1 from length of rows as the first row is the headers
const pages = () => ((searchresults.length - 1) / rowsPerPage) - 1;
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
        rows[i].style.display = "none";

    }
    for (var i = 1; i < searchresults.length; i++) {

        if (i >= firstVisibleRow() && i <= lastVisibleRow()) {
            searchresults[i].style.display = "table-row";

        } else {
            searchresults[i].style.display = "none";
        }
    }
}
// JavaScript source code
var searchresults = [];

function search() {
    searchresults = [];
    searchresults.push(rows[0])
    var Parameter = document.getElementById("search").value
    for (var i = 1; i < rows.length; i++) {
        
        if (rows[i].innerHTML.toLowerCase().indexOf((""+Parameter).toLowerCase()) != -1) {
            searchresults.push(rows[i]) ;
        }
    }
    showPage()
}
search();
