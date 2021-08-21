/*
 * Sends the updated flashcard information to the Spring Boot server
 *
*/


// Can search parameters
const params = new URLSearchParams(window.location.search);
let id = parseInt(params.get('id'),10);



var flashcards;
var flashcard;
var randomNumber;
var subject;
var question;
var answer;

/*********** Populate the fields with the flashcard passed from the previous page ***************/
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/flashcard-app/api/flashcards/' + id, true);
request.send();

request.onload = function () 
{
	flashcard = JSON.parse(this.response);
	
	if (request.status >= 200 && request.status < 400) 
	{
		fillParameters();
		clear();
		document.getElementById("subject").value = subject;
		document.getElementById("question").value = question;
		document.getElementById("answer").value = answer;
	}
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Request Denied!`;
		app.appendChild(errorMessage);
	}
}


/********************** Update the flashcard with the new information ***************************/
var putRequest = new XMLHttpRequest();
putRequest.open("PUT", 'http://localhost:8080/flashcard-app/api/flashcards/' + id, true);
putRequest.setRequestHeader('Content-Type', 'application/json');

function updateFlashcard()
{
	//alert("In updateFlashcard()!");
	const subject = document.getElementById('subject').value;
	const question = document.getElementById('question').value;
	const answer = document.getElementById('answer').value;
	
	if(validateData())
	{
		//alert(JSON.stringify({id:id, subject:subject, question:question, answer:answer}));
		putRequest.send(JSON.stringify({id:id, subject:subject, question:question, answer:answer}));
		clear();
		alert("Flashcard updated successfully!");
	}
	else
	{
		alert("No data field can be empty!");
	}
}


/*********************************** Delete the flashcard ***************************************/
var deleteRequest = new XMLHttpRequest();
deleteRequest.open("DELETE", 'http://localhost:8080/flashcard-app/api/flashcards/' + id, true);
deleteRequest.setRequestHeader('Content-Type', 'application/json');

function deleteFlashcard()
{
	//alert("In deleteFlashcard()!");
	const subject = document.getElementById('subject').value;
	const question = document.getElementById('question').value;
	const answer = document.getElementById('answer').value;
	
	if(validateData())
	{
		//alert(JSON.stringify({id:id, subject:subject, question:question, answer:answer}));
		deleteRequest.send(JSON.stringify({id:id, subject:subject, question:question, answer:answer}));
		clear();
		alert("Flashcard deleted successfully!");
	}
	else
	{
		alert("No data field can be empty!");
	}
}

/********************************* Go back to the home page *************************************/
function returnToMainPage()
{	
	window.history.back();
}

/************************************** Confirmations *******************************************/
function getConfirmation(action)
{
	var confirmed = confirm("Are you sure you want to " + action + " this flashcard?");
	if(confirmed)
		makeChange(action);
	else
		alert("No changes sent.");
}

/************************************* Data validation *****************************************/
/*
 *
 * 
 */
function validateData()
{
	if(document.getElementById('subject').value == '')
		return false;
	if(document.getElementById('question').value == '')
		return false;
	if(document.getElementById('answer').value == '')
		return false;
	return true;
}

/************************************* Helper functions *****************************************/
function clear()
{
	document.getElementById('subject').value = '';
	document.getElementById('question').value = '';
	document.getElementById('answer').value = '';
}

function fillParameters()
{
	subject = flashcard.subject;
	question = flashcard.question;
	answer = flashcard.answer;
}

function makeChange(action)
{
	if(action == "Delete")
		deleteFlashcard();
	else if(action == "Update")
		updateFlashcard();
	else
		alert("Something went wrong with the change logic.");
}
