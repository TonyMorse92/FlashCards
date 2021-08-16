/*
 * Fills the card div with flashcard information
 *
*/
const app = document.getElementById('flashcard');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () 
{
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) 
	{
		let movie = data[0];
		const card = document.createElement('div');
		card.setAttribute('class', 'card');

		const h1 = document.createElement('h1');
		h1.textContent = "Subject";

		const p = document.createElement('p');
		movie.description = movie.description.substring(0, 300);
		p.textContent = `${movie.description}...`;
		
		card.appendChild(h1);
		card.appendChild(p);

		container.appendChild(card);
	}
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Request Denied!`;
		app.appendChild(errorMessage);
	}

}

request.send();
