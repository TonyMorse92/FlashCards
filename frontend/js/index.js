/*
 * Fills the card div with flashcard information
 *
*/
var flashcards;
var flashcard;
var randomNumber;
var id;
var subject;
var question;
var answer;

/***************************** Get the flashcards from the api **********************************/
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/flashcard-app/api/flashcards/', true);
request.send();
request.onload = function () 
{
	flashcards = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) 
	{
		getFlashcard();
	}
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Request Denied!`;
		app.appendChild(errorMessage);
	}
}



function getFlashcard()
{
	// The first flashcard shown is going to be random
	// Current thought is to have all of them be random, because going through the
	// same flashcard multiple times is probably a good thing.
	// random number is between 0 and number of (flashcards - 1)
	 

	// After numerous tests, I have decided that having the same one appear
	// twice is awful. Especially when there are only a few.
	if(typeof(flashcard) == "undefined")
	{
		randomNumber = Math.floor(Math.random() * flashcards.length);

		flashcard = flashcards[randomNumber];
		
		fillParameters();

		document.getElementById("h1").innerHTML = subject;
		document.getElementById("p").innerHTML = question;
		
		rerender();
	}
	else
	{
		prevIndex = randomNumber;
		randomNumber = Math.floor(Math.random() * flashcards.length);

		while(randomNumber == prevIndex)
		{
			randomNumber = Math.floor(Math.random() * flashcards.length);
		}
		
		flashcard = flashcards[randomNumber];

		fillParameters();

		document.getElementById("h1").innerHTML = subject;
		document.getElementById("p").innerHTML = question;

		rerender();
	} 
}

/************************************* Go to update page ****************************************/
function postCurrentFlashcard()
{
	// Can't send json due to browsers not liking some special characters
	// they are, however, fine with underscores and exclamation points
	//let modifiedJSON = '{"id"_' + id + '! "subject"_"' + subject + '"! "question"_"' + question + '"! "answer"_"' + answer + '"}';
	//alert("Modified JSON is: " + modifiedJSON);
	//let json = JSON.stringify({id:id, subject:subject, question:question, answer:answer});	
	//alert("json is: " + json);
	
	document.getElementById('id').value = id;
	document.getElementById("update-form").submit();
}

/************************************* "Flip" flaschard *****************************************/
function getOtherSide()
{
	// Two cases. We are either on the front, and have to flip to the
	// back, or vice-versa.
	if(document.getElementById("h1").innerHTML == subject)	
	{
		// On the front, switch to back
		document.getElementById("h1").innerHTML = question;
		document.getElementById("p").innerHTML = answer;

		rerender();
	}
	else
	{
		// On the back, switch to font
		document.getElementById("h1").innerHTML = subject;
		document.getElementById("p").innerHTML = question;
		
		rerender();
	}
}

/************************************* Helper functions *****************************************/
function fillParameters()
{
	id = flashcard.id;
	subject = flashcard.subject;
	question = flashcard.question;
	answer = flashcard.answer;
}

function rerender()
{			
		// Re-render MathJax
		// This is the method for MathJax v3
		MathJax.typeset();
}


