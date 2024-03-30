let gem = document.querySelector('.gem-cost');
let parsedGem = parseFloat(gem.innerHTML);

let clickerCost = document.querySelector('.clicker-cost');
let parsedClickerCost = parseFloat(clickerCost.innerHTML);

function incrementGem() {
	parsedGem += 1;
	gem.innerHTML = parsedGem;
}

function buyClicker() {
	if (parsedGem >= parsedClickerCost) {
		parsedGem -= parsedClickerCost;
		gem.innerHTML = parsedGem;
	}
}
