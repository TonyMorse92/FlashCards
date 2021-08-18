/*
 * Sends the new flashcard information to the Spring Boot server
 *
*/

/*********************************** Add the new flashcard **************************************/
var postRequest = new XMLHttpRequest();
postRequest.open("POST", 'http://localhost:8080/flashcard-app/api/flashcards/', true);
postRequest.setRequestHeader('Content-Type', 'application/json');

function addFlashcard()
{
	const subject = document.getElementById('subject').value;
	const question = document.getElementById('question').value;
	const answer = document.getElementById('answer').value;
	
	if(validateData())
	{
		//alert(JSON.stringify({subject:subject, question:question, answer:answer}));
		postRequest.send(JSON.stringify({subject:subject, question:question, answer:answer}));
		clear();
		confirmCreation();
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
function confirmCreation()
{
	alert("Data sent successfully!");
}

/************************************* Data validation *****************************************/
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
