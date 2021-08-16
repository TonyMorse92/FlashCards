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


alert("Requested flashcards.");
alert("Request:  " + request);
alert("Request Status: " + request.status);

request.onload = function () 
{
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) 
	{
		const addButton = document.createElement("button");
		addButton.innerHTML = "Add flashcard";
		addButton.setAttribute('class', 'left-button');

		const updateButton = document.createElement("button");
		updateButton.innerHTML = "Update flashcard";
		updateButton.setAttribute('class', 'right-button');

		const topButtonRow = document.createElement('div');
		topButtonRow.setAttribute('class', 'status-button');

		topButtonRow.appendChild(addButton);
		topButtonRow.appendChild(updateButton);

		let flashcard = data[0];
		const card = document.createElement('div');
		card.setAttribute('class', 'card');

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
		container.appendChild(bottomButtonRow);
	}
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Request Denied!`;
		app.appendChild(errorMessage);
	}

}

request.send();
