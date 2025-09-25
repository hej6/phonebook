// a function that will convert an object into a URL query string format
// not used in this script
function queryObjectToString(query) 
{
    // get the properties in the query object
    // for {message:"Hi I am sending an AJAX request", name: "Sahar"};
    // properties will be ["message", "name" ]
    let properties = Object.keys(query);
    // create a string int the format "propert=value" for each property in query
    // arrOfQuesryStrings will be ["message=Hi I am sending an AJAX request", "name=Sahar"]
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    //combine the strings in arrOfQuesryStrings wuth &
    // return value will be "message=Hi I am sending an AJAX request&name=Sahar"
    return(arrOfQuesryStrings.join('&'));
 }


 // attach click event handler to sendAJAX push button
document.getElementById("search").addEventListener("click",sendAJAX);

// get the interface elements that will be used
let textBox = document.getElementById("sname");
let resultsPar = document.getElementById("resultsP");

// fucntion that checks if the textbox is empty or not and decides which AJAX request to send accordingly
function sendAJAX() 
{
	if (!textBox.value)
		sendDisplayAllAJAX();
	else
		sendSearchAJAX(textBox.value);

}


function sendDisplayAllAJAX()
{
        let AJAXObj = new XMLHttpRequest();
        AJAXObj.onerror = function() {errorHandler('Connection Error. Try again later')}
	AJAXObj.onload = function()
	{
		if (this.status == 200)
		{
			let phonebook = JSON.parse(this.responseText);
			let htmlStr = '';

			for (entry in phonebook)
			{
				htmlStr += '<p>' + entry.name + '\t' + entry.phone + '</p>';
			}

			resultsDiv.innerHTML = htmlStr;
		}
		else
		{
			errorHandler('Status: ' + this.status);
		}
	} // On load

	AJAX.open('GET', '/displayall');
	AJAX.send();
}

function sendSearchAjax(name)
{
	let AJAXObj = new XMLHttpRequest();
        AJAXObj.onerror = function() {errorHandler('Connection Error. Try again later')}
        AJAXObj.onload = function()
        {
                if (this.status == 200)
                {
                        resultsDiv.innerHTML = '<p>' + this.responseText + '</p>';
                }
                else
                {
                        errorHandler('Status: ' + this.status);
                }
        } // On load

        AJAX.open('GET', '/search?name=' + name);
        AJAX.send();
}

// function that displays an error message received as a parameter as an alert pop-up
function errorHandler(message) 
{
	alert("Error: "+message);
}

