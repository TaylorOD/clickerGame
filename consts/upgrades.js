import { defaultUpgradeValues } from './defaultValues.js';

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
		powerUps: [
			{
				name: '2x Clicker',
				description: 'double your clicking power!',
				multiplier: 2,
			},
			{
				name: '3x Clicker',
				description: 'triple your clicking power!',
				multiplier: 3,
			},
			{
				name: '4x Clicker',
				description: 'quadruple your clicking power!',
				multiplier: 4,
			},
		],
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
		powerUps: [
			{
				name: '2x Pickaxe',
				description: 'double your pickaxe efficiency!',
				multiplier: 2,
			},
			{
				name: '3x Pickaxe',
				description: 'triple your pickaxe efficiency!',
				multiplier: 3,
			},
			{
				name: '4x Pickaxe',
				description: 'quadruple your pickaxe efficiency!',
				multiplier: 4,
			},
		],
		power: 0,
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
		powerUps: [
			{
				name: '2x miner',
				description: 'double your miner efficiency!',
				multiplier: 2,
			},
			{
				name: '3x miner',
				description: 'triple your miner efficiency!',
				multiplier: 3,
			},
			{
				name: '4x miner',
				description: 'quadruple your miner efficiency!',
				multiplier: 4,
			},
		],
		power: 0,
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
		powerUps: [
			{
				name: '2x factory',
				description: 'double your factory efficiency!',
				multiplier: 2,
			},
			{
				name: '3x factory',
				description: 'triple your factory efficiency!',
				multiplier: 3,
			},
			{
				name: '4x factory',
				description: 'quadruple your factory efficiency!',
				multiplier: 4,
			},
		],
		power: 0,
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
		powerUps: [
			{
				name: '2x potion',
				description: 'double your potion efficiency!',
				multiplier: 2,
			},
			{
				name: '3x potion',
				description: 'triple your potion efficiency!',
				multiplier: 3,
			},
			{
				name: '4x potion',
				description: 'quadruple your potion efficiency!',
				multiplier: 4,
			},
		],
		power: 0,
		gemMultiplier: 1.055,
		costMultiplier: 1.2,
	},
];

export const powerUpIntervals = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300];
