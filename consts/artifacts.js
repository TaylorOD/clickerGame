import { defaultArtifactValues } from './defaultValues.js';

function createArtifacts() {
	const upgradesContainer = document.getElementById('upgrades-container');
	const template = document.getElementById('upgrade-template').textContent;

	defaultArtifactValues.forEach((obj) => {
		let html = template;

		Object.keys(obj).forEach((key) => {
			const regex = new RegExp(`{{${key}}}`, 'g');
			html = html.replace(regex, obj[key]);
		});

		upgradesContainer.innerHTML += html;
	});
}

createArtifacts();
