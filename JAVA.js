/*
---------------------------
Setting up some defauls
---------------------------
*/

// get the container that our table is in
var container = document.getElementById("log")
/*
 get the first table from the container, this is the table we're going to paginate
 use the QuerySelector for this. 
 Query selector finds an element in the same way that CSS finds an element
 this is limited to only children of the parent container, in this case 'container'
*/
var table = container.querySelector('table')

// get all the rows in the table, this time its QuerySelectorAll which is similar
// but returns an array of all the matching items not just the first
var rows = table.querySelectorAll('tr')
// rows isnt a true array its technically a html NODELIST
// so that i can cut out the first element i'm going to conver this to an array
// the below '...' is the spread operator so this is spreads object into the array 
rows = [...rows];

// remove the first row from our ROWS array (these are the headers)
rows.shift()

// INT value of the MAXIMUM number of rows to display on the page.
var numberOfRowsPerPage = 20;

// Initialise an empty array, this will be used to store any rows that match our search
// this way we can paginate this array.
var searchFilter = [];

// INT for current page, starts at 0 just like arrays
var currentPageNumber = 0;

/*
---------------------------
Some Computed variables,
fancy way of saying a function that returns a value,
but i will do these as 1 liners
---------------------------
*/

const TotalNumberOfPages = () => (searchFilter / numberOfRowsPerPage) - 1;
const firstVisibleRow = () => (currentPageNumber * numberOfRowsPerPage);
const lastVisibleRow = () => (currentPageNumber * numberOfRowsPerPage) + numberOfRowsPerPage;

/*
 --------------------------
 Functions to change the page, 
 should be self explanatory
 --------------------------
 */

function PrevPage() {
    // decrease Page number by 1
    currentPageNumber -= 1;
    // ensure that the page number is in the array range
    if (currentPageNumber < 0) currentPageNumber = 0;
    // show current page
    showPage();
}
function NextPage() {
    // increment the current page number
    currentPageNumber += 1;
    // ensure that the page number is in the array range
    if (currentPageNumber > TotalNumberOfPages()) currentPageNumber = TotalNumberOfPages();
    // show current page
    showPage();
}
function FirstPage() {
    //set page number to 0, the first in the array
    currentPageNumber = 0;
    // show current page
    showPage();
}

function LastPage() {
    //set page number to the number of pages
    currentPageNumber = TotalNumberOfPages();
    // show current page
    showPage();
}


/*
 ------------------------
 Core Functions
 ------------------------
 */

// function to show all of the rows for the current page (based on the filtered search list)
function showPage() {
    // start by hiding all rows, using initial row array not the filtered array
    rows.forEach((tr) => {
        tr.style.display = "none";
    });

    
    for (var i = 0; i < searchFilter.length; i++) {
        if (i >= firstVisibleRow() && i <= lastVisibleRow()) {
            searchFilter[i].style.display = "table-row";
        }
    }
}

// function to filter our search list, calls show page at the end to display the result
function search() {

    // set the page number to 0 when searching so that you see the first result of the search
    currentPageNumber = 0;

    // empty out the searchResults for a fresh set
    searchFilter = [];

    // get our search parameter, and make this lowercase (so that the search is case insensitive)
    var Parameter = "" + document.getElementById("search").value
    Parameter.toLowerCase()

    // loop through our row array
    for (var i = 0; i < rows.length; i++) {

        // prepare a variable to say whether any column was a match
        var thisRowMatchesParameter = false

        // using the querySelectoraAll selecting the td (column)
        // we can forEach loop - feel free to swap this to a standard for loop if preferred
        rows[i].querySelectorAll("td").forEach((td) => {
            //check on the innerText of the td (again making this lowercase for our search)
            var tdText = ("" + td.innerText).toLowerCase()
            if (tdText.indexOf(Parameter) != -1) thisRowMatchesParameter = true;
        });

        // if the row has a match add this to our filter
        if (thisRowMatchesParameter) searchFilter.push(rows[i])
    }
    showPage()
}

// call search after the page has loaded and all functions / variables have been defined
search();