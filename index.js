import { powerUpIntervals, upgrades } from './consts/upgrades.js';
import { defaultUpgradeValues } from './consts/defaultValues.js';

let gem = document.querySelector('.gem-cost');
let parsedGem = parseFloat(gem.innerHTML);

let gpcText = document.getElementById('gpc-text');
let gpsText = document.getElementById('gps-text');

let gemImgContainer = document.querySelector('.gem-img-container');

let upgradesNavButton = document.getElementById('upgrades-nav-button');
let skillsNavButton = document.getElementById('skills-nav-button');
let artifactNavButton = document.getElementById('artifacts-nav-button');

let prestigeButton = document.querySelector('.prestige-button');

let relic = document.getElementById('relic');

let gemsPerClick = 1;
let gemsPerSecond = 0;

const backgroundMusic = new Audio('/assets/audio/bgm.mp3');
backgroundMusic.volume = 0.2;

function incrementGem(event) {
	const clickSound = new Audio('/assets/audio/click.wav');
	clickSound.play();

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

	const upgradeDiv = document.getElementById(`${matchedUpgrade.name}-upgrade`);
	const nextLevelDiv = document.getElementById(
		`${matchedUpgrade.name}-next-level`
	);
	const nextLevelP = document.getElementById(`${matchedUpgrade.name}-next-p`);

	if (parsedGem >= matchedUpgrade.parsedCost) {
		const upgradeSound = new Audio('/assets/audio/upgrade.mp3');
		upgradeSound.volume = 0.2;
		upgradeSound.play();

		gem.innerHTML = Math.round((parsedGem -= matchedUpgrade.parsedCost));

		let index = powerUpIntervals.indexOf(
			parseFloat(matchedUpgrade.level.innerHTML)
		);

		// Handles non powerUp levels
		if (index !== -1) {
			upgradeDiv.style.cssText = 'border-color: white;';
			nextLevelDiv.style.cssText =
				'background-color: white; font-weight: normal;';

			matchedUpgrade.cost.innerHTML = Math.round(
				(matchedUpgrade.parsedCost *= matchedUpgrade.costMultiplier)
			);

			if (matchedUpgrade.name === 'clicker') {
				gemsPerClick *= matchedUpgrade.powerUps[index].multiplier;
				nextLevelP.innerHTML = `${matchedUpgrade.parsedIncrease} gems per click`;
			} else {
				gemsPerSecond -= matchedUpgrade.power;
				matchedUpgrade.power *= matchedUpgrade.powerUps[index].multiplier;
				gemsPerSecond += matchedUpgrade.power;
				nextLevelP.innerHTML = `${matchedUpgrade.parsedIncrease} gems per second`;
			}
		}

		matchedUpgrade.level.innerHTML++;

		index = powerUpIntervals.indexOf(
			parseFloat(matchedUpgrade.level.innerHTML)
		);

		// Handles upgrades for powerUp levels
		if (index !== -1) {
			upgradeDiv.style.cssText = 'border-color: orange;';
			nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`;
			nextLevelP.innerText = matchedUpgrade.powerUps[index].description;

			matchedUpgrade.cost.innerHTML = Math.round(
				matchedUpgrade.parsedCost *
					2.5 *
					1.004 ** parseFloat(matchedUpgrade.level.innerHTML)
			);
		} else {
			matchedUpgrade.cost.innerHTML = Math.round(
				(matchedUpgrade.parsedCost *= matchedUpgrade.costMultiplier)
			);

			matchedUpgrade.parsedIncrease = parseFloat(
				(matchedUpgrade.parsedIncrease * matchedUpgrade.gemMultiplier).toFixed(
					2
				)
			);

			if (matchedUpgrade.name === 'clicker') {
				nextLevelP.innerHTML = `${matchedUpgrade.parsedIncrease} gems per click`;
			} else {
				nextLevelP.innerHTML = `${matchedUpgrade.parsedIncrease} gems per second`;
			}
		}

		if (matchedUpgrade.name === 'clicker') {
			gemsPerClick += matchedUpgrade.parsedIncrease;
		} else {
			gemsPerSecond -= matchedUpgrade.power;
			matchedUpgrade.power += matchedUpgrade.parsedIncrease;
			gemsPerSecond += matchedUpgrade.power;
		}
	}
}

function save() {
	localStorage.clear();

	upgrades.map((upgrade) => {
		const obj = JSON.stringify({
			parsedLevel: parseFloat(upgrade.level.innerHTML),
			parsedCost: upgrade.parsedCost,
			parsedIncrease: upgrade.parsedIncrease,
		});

		localStorage.setItem(upgrade.name, obj);

		localStorage.setItem('gemsPerClick', JSON.stringify(gemsPerClick));
		localStorage.setItem('gemsPerSecond', JSON.stringify(gemsPerSecond));

		localStorage.setItem('gem', JSON.stringify(parsedGem));
	});
}

function load() {
	upgrades.map((upgrade) => {
		const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

		upgrade.parsedCost = savedValues.parsedCost;
		upgrade.parsedIncrease = savedValues.parsedIncrease;

		upgrade.level.innerHTML = savedValues.parsedLevel;
		upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
		upgrade.increase.innerHTML = upgrade.parsedIncrease;
	});

	gemsPerClick = JSON.parse(localStorage.getItem('gemsPerClick'));
	gemsPerSecond = JSON.parse(localStorage.getItem('gemsPerSecond'));
	parsedGem = JSON.parse(localStorage.getItem('gem'));

	gem.innerHTML = Math.round(parsedGem);
}

function prestige() {
	upgrades.map((upgrade) => {
		const matchedUpgrade = defaultUpgradeValues.find((defaultUpgrade) => {
			return upgrade.name === defaultUpgrade.name;
		});

		upgrade.parsedCost = matchedUpgrade.cost;
		upgrade.parsedIncrease = matchedUpgrade.increase;

		upgrade.level.innerHTML = 0;
		upgrade.cost.innerHTML = matchedUpgrade.cost;
		upgrade.increase.innerHTML = matchedUpgrade.increase;

		const upgradeDiv = document.getElementById(
			`${matchedUpgrade.name}-upgrade`
		);
		const nextLevelDiv = document.getElementById(
			`${matchedUpgrade.name}-next-level`
		);
		const nextLevelP = document.getElementById(`${matchedUpgrade.name}-next-p`);

		upgradeDiv.style.cssText = 'border-color: white;';
		nextLevelDiv.style.cssText =
			'background-color: white; font-weight: normal;';

		if (matchedUpgrade.name === 'clicker') {
			nextLevelP.innerHTML = `${matchedUpgrade.increase} gems per click`;
		} else {
			nextLevelP.innerHTML = `${matchedUpgrade.increase} gems per second`;
		}

		relic.innerHTML = Math.ceil(Math.sqrt(parsedGem - 999999) / 300);

		gemsPerClick = 1;
		gemsPerSecond = 0;
		parsedGem = 0;
		gem.innerHTML = parsedGem;
	});
}

setInterval(() => {
	parsedGem += gemsPerSecond / 10;
	gem.innerHTML = Math.round(parsedGem);

	gpcText.innerHTML = Math.round(gemsPerClick);
	gpsText.innerHTML = Math.round(gemsPerSecond);

	if (parsedGem >= 1000000) {
		prestigeButton.style.display = 'block';
	} else {
		prestigeButton.style.display = 'none';
	}
	// Toggle to turn background music on or off:
	// backgroundMusic.play();
}, 100);

skillsNavButton.addEventListener('click', function () {
	const upgradeContainers = document.querySelectorAll('.upgrade');
	upgradeContainers.forEach((container) => {
		if (container.classList.contains('type-skill')) {
			container.style.display = 'flex';
		} else {
			container.style.display = 'none';
		}
	});
});
upgradesNavButton.addEventListener('click', function () {
	const upgradeContainers = document.querySelectorAll('.upgrade');
	upgradeContainers.forEach((container) => {
		if (container.classList.contains('type-upgrade')) {
			container.style.display = 'flex';
		} else {
			container.style.display = 'none';
		}
	});
});
artifactNavButton.addEventListener('click', function () {
	const upgradeContainers = document.querySelectorAll('.upgrade');
	upgradeContainers.forEach((container) => {
		if (container.classList.contains('type-artifact')) {
			container.style.display = 'flex';
		} else {
			container.style.display = 'none';
		}
	});
});

window.incrementGem = incrementGem;
window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;
window.prestige = prestige;
