import { defaultUpgradeValues } from './defaultUpgradeValues.js';

function createUpgrades() {
	const upgradesContainer = document.getElementById('upgrades-container');
	const template = document.getElementById('upgrade-template').textContent;

	defaultUpgradeValues.forEach((obj) => {
		let html = template;

		Object.keys(obj).forEach((key) => {
			const regex = new RegExp(`{{${key}}}`, 'g');
			html = html.replace(regex, obj[key]);
		});

		upgradesContainer.innerHTML += html;
	});
}

createUpgrades();

export const upgrades = [
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
	{
		name: 'potion',
		cost: document.querySelector('.potion-cost'),
		parsedCost: parseFloat(document.querySelector('.potion-cost').innerHTML),
		increase: document.querySelector('.potion-increase'),
		parsedIncrease: parseFloat(
			document.querySelector('.potion-increase').innerHTML
		),
		level: document.querySelector('.potion-level'),
		gemMultiplier: 1.055,
		costMultiplier: 1.2,
	},
];
