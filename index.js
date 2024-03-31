let gem = document.querySelector('.gem-cost');
let parsedGem = parseFloat(gem.innerHTML);

let gpcText = document.getElementById('gpc-text');
let gpsText = document.getElementById('gps-text');

let gemImgContainer = document.querySelector('.gem-img-container');

let gemsPerClick = 1;
let gemsPerSecond = 0;

const upgrades = [
	{
		name: 'clicker',
		cost: document.querySelector('.clicker-cost'),
		parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
		increase: document.querySelector('.clicker-increase'),
		parsedIncrease: parseFloat(
			document.querySelector('.clicker-increase').innerHTML
		),
		level: document.querySelector('.clicker-level'),
		gemMultiplier: 1.025,
		costMultiplier: 1.12,
	},
	{
		name: 'pickaxe',
		cost: document.querySelector('.pickaxe-cost'),
		parsedCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
		increase: document.querySelector('.pickaxe-increase'),
		parsedIncrease: parseFloat(
			document.querySelector('.pickaxe-increase').innerHTML
		),
		level: document.querySelector('.pickaxe-level'),
		gemMultiplier: 1.03,
		costMultiplier: 1.15,
	},
	{
		name: 'miner',
		cost: document.querySelector('.miner-cost'),
		parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
		increase: document.querySelector('.miner-increase'),
		parsedIncrease: parseFloat(
			document.querySelector('.miner-increase').innerHTML
		),
		level: document.querySelector('.miner-level'),
		gemMultiplier: 1.035,
		costMultiplier: 1.11,
	},
	{
		name: 'factory',
		cost: document.querySelector('.factory-cost'),
		parsedCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
		increase: document.querySelector('.factory-increase'),
		parsedIncrease: parseFloat(
			document.querySelector('.factory-increase').innerHTML
		),
		level: document.querySelector('.factory-level'),
		gemMultiplier: 1.04,
		costMultiplier: 1.1,
	},
];

function incrementGem(event) {
	gem.innerHTML = Math.round((parsedGem += gemsPerClick));

	const x = event.offsetX;
	const y = event.offsetY;

	const div = document.createElement('div');
	div.innerHTML = `+${Math.round(gemsPerClick)}`;
	div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
	gemImgContainer.appendChild(div);

	div.classList.add('fade-up');

	gemAnimationTimeout(div);
}

const gemAnimationTimeout = (div) => {
	setTimeout(() => {
		div.remove();
	}, 800);
};

function buyUpgrade(upgradeName) {
	const matchedUpgrade = upgrades.find((upgrade) => {
		if (upgrade.name === upgradeName) {
			return upgrade;
		}
	});
	if (parsedGem >= matchedUpgrade.parsedCost) {
		gem.innerHTML = Math.round((parsedGem -= matchedUpgrade.parsedCost));

		matchedUpgrade.level.innerHTML++;

		matchedUpgrade.parsedIncrease = parseFloat(
			(matchedUpgrade.parsedIncrease * matchedUpgrade.gemMultiplier).toFixed(2)
		);
		matchedUpgrade.increase.innerHTML = matchedUpgrade.parsedIncrease;

		matchedUpgrade.parsedCost *= matchedUpgrade.costMultiplier;
		matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost);

		if (matchedUpgrade.name === 'clicker') {
			gemsPerClick += matchedUpgrade.parsedIncrease;
		} else {
			gemsPerSecond += matchedUpgrade.parsedIncrease;
		}
	}
}

setInterval(() => {
	parsedGem += gemsPerSecond / 10;
	gem.innerHTML = Math.round(parsedGem);

	gpcText.innerHTML = Math.round(gemsPerClick);
	gpsText.innerHTML = Math.round(gemsPerSecond);
}, 100);
