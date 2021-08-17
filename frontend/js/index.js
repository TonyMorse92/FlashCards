/*
 * Fills the card div with flashcard information
 *
*/
const app = document.getElementById('flashcard');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/flashcard-app/api/flashcards/', true);



//alert("Requested flashcards.");
//alert("Request:  " + request);



// NOTE TO SELF. Loading the request data should be separte from creating all of the items
// Otherwise, I won't be able to go to the next card efficiently, I don't think

// Since I'm only creating the one flashcard, I guess the inner div is all that needs to be
// dynamically created. And I don't even have to do that. The only things that change are
// the text in the h1 and the p. It would be faster if it was all static.
// Not sure how much faster, since I think it is just slow because of it being a 
// Python server, but still, speed is speed. 
 
request.onload = function () 
{
	//alert("Request Status: " + request.status);
	var data = JSON.parse(this.response);
	
	// The first flashcard shown is going to be random
	// Current thought is to have all of them be random, because going through the 
	// same flashcard multiple times is probably a good thing.
	// random number is between 0 and number of (flashcards - 1)
	//let randomNumber = Math.floor(Math.random() * data.length)

	if (request.status >= 200 && request.status < 400) 
	{
		/*const addButton = document.createElement("button");
		addButton.innerHTML = "Add flashcard";
		addButton.setAttribute("class", "left-button");
		addButton.setAttribute("onclick", "location.href = 'add_card.html';");

		const updateButton = document.createElement("button");
		updateButton.innerHTML = "Update flashcard";
		updateButton.setAttribute('class', 'right-button');
		updateButton.setAttribute("onclick", "location.href = 'update_card.html';");

		const topButtonRow = document.createElement('div');
		topButtonRow.setAttribute('class', 'status-button');

		topButtonRow.appendChild(addButton);
		topButtonRow.appendChild(updateButton);

		//let flashcard = data[randomNumber];*/
		let flashcard = data[0];
		document.getElementById("h1").innerHTML = flashcard.subject;
		document.getElementById("p").innerHTML = flashcard.answer;
		/*const card = document.createElement('div');
		card.setAttribute('class', 'card');
		card.setAttribute('id', 'card');

		const h1 = document.createElement('h1');
		h1.textContent = flashcard.subject;

		const p = document.createElement('p');
		p.textContent = flashcard.answer;
		
		card.appendChild(h1);
		card.appendChild(p);

		const nextButton = document.createElement("button");
		nextButton.innerHTML = "Next flashcard";
		nextButton.setAttribute('class', 'left-button');

		const flipButton = document.createElement("button");
		flipButton.innerHTML = "Flip flashcard";
		flipButton.setAttribute('class', 'right-button');

		const bottomButtonRow = document.createElement('div');
		bottomButtonRow.setAttribute('class', 'action-button');

		bottomButtonRow.appendChild(nextButton);
		bottomButtonRow.appendChild(flipButton);


		container.appendChild(topButtonRow);
		container.appendChild(card);
		container.appendChild(bottomButtonRow);*/
	}
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Request Denied!`;
		app.appendChild(errorMessage);
	}

	//document.getElementById('add-button').onclick = buttonAction('add-button');
	//renderPt1();
	//renderPt2();
}

/*function renderPt1() 
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "https://polyfill.io/v3/polyfill.min.js?features=es6";	
  document.getElementsByTagName("head")[0].appendChild(script);
}

function renderPt2()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
script.src  = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}


function buttonAction(id)
{
	if(id == 'add-button')
	{
		location.href = "add_card.html";
	}
	else if(id == 'update-button')
	{
	}
	else if(id == 'next-button')
	{
	}
	else if(id == 'flip-button')
	{
	}
}
*/

request.send();
