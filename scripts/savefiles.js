player = {};
const wipeSave = function () {
	player = {
		scrap: 0,
		scrapNeeded: 100,
		scrapPerS: 0,
		keys: [0, 0, 0, 0, 0, 0],
		loottable: [
			[
				{ entries: 10, type: 'scrap', min: 15, max: 20 },
				{ entries: 3, type: 'reduce', min: 1, max: 1 },
				{ entries: 3, type: 'producer', min: 1, max: 1 },
				{ entries: 3, type: 'dkey', min: 2, max: 3 },
				{ entries: 1, type: 'nkey', min: 1, max: 1 },
			],
			[
				{ entries: 15, type: 'scrap', min: 45, max: 70 },
				{ entries: 5, type: 'reduce', min: 1, max: 5 },
				{ entries: 3, type: 'producer', min: 2, max: 5 },
				{ entries: 5, type: 'dkey', min: 2, max: 3 },
				{ entries: 1, type: 'nkey', min: 1, max: 1 },
			],
			[
				{ entries: 20, type: 'scrap', min: 200, max: 350 },
				{ entries: 5, type: 'keyimprove', min: 0, max: 1 },
				{ entries: 5, type: 'producer', min: 10, max: 30 },
				{ entries: 4, type: 'dkey', min: 2, max: 2 },
				{ entries: 1, type: 'nkey', min: 1, max: 1 },
				{ entries: 1, type: 'bool', min: 1, max: 1, name: 'automatekey' },
			],
		],
		lastSave: 0,
		bools: [],
		hides: [],
	};
};
wipeSave();

const save = function () {
	player.lastSave = Date.now();
	var savestring = btoa(JSON.stringify(player));
	localStorage.setItem('CrateIdleSave', savestring);
};

const load = function () {
	var loadplayer = JSON.parse(atob(localStorage.getItem('CrateIdleSave')));
	var timediff = Date.now() - loadplayer.lastSave;
	loadplayer.scrap += Math.round(loadplayer.scrapPerS * (timediff / 1000));

	player = loadplayer;
};

window.onbeforeunload = function () {
	save();
};

window.onunload = function () {
	save();
};
