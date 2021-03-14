player = {};
const wipeSave = function () {
	player = {
		scrap: 0,
		scrapNeeded: 100,
		scrapPerS: 0,
		keys: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		openall: -1,
		kcRate: 100,
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
				{ entries: 3, type: 'dkey', min: 2, max: 3 },
				{ entries: 1, type: 'nkey', min: 1, max: 1 },
			],
			[
				{ entries: 20, type: 'scrap', min: 200, max: 350 },
				{ entries: 5, type: 'keyimprove', min: 0, max: 1 },
				{ entries: 5, type: 'producer', min: 40, max: 70 },
				{ entries: 4, type: 'dkey', min: 2, max: 2 },
				{ entries: 1, type: 'nkey', min: 1, max: 1 },
				{
					entries: 1,
					type: 'bool',
					min: 1,
					max: 1,
					name: 'automatekey',
					desc: 'Now automatically converts scrap into gravel keys!',
				},
			],
			[
				{ entries: 50, type: 'scrap', min: 2000, max: 8000 },
				{ entries: 20, type: 'producer', min: 200, max: 400 },
				{ entries: 10, type: 'dkey', min: 2, max: 3 },
				{ entries: 1, type: 'keyimprove', min: 2, max: 2 },
			],
		],
		lastSave: 0,
		bools: [],
		hides: [],
		settings: {
			foundlength: 10,
			updatetime: 50,
			filterfound: [],
		},
		version: 'v0.2',
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

	if (loadplayer.version == player?.version) {
		Object.assign(player, loadplayer);
	} else {
		alert("you're playing on an older save, which is not compatible, wiping save...");
	}
};

window.onbeforeunload = function () {
	save();
};

window.onunload = function () {
	save();
};
