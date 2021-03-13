var player = {
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
			{ entries: 1, type: 'nkey', min: 1, max: 2 },
		],
		[
			{ entries: 15, type: 'scrap', min: 45, max: 70 },
			{ entries: 5, type: 'reduce', min: 1, max: 5 },
			{ entries: 3, type: 'producer', min: 2, max: 5 },
			{ entries: 5, type: 'dkey', min: 2, max: 3 },
			{ entries: 1, type: 'nkey', min: 1, max: 2 },
		],
	],
	lastSave: 0,
};

const IDName = {
	0: 'dirt key',
	1: 'stone key',
	2: 'iron key',
};

var flags = {
	updateInv: false,
};

const getScrap = function () {
	player.scrap++;
};
const createKey = function () {
	if (player.scrap >= player.scrapNeeded) {
		player.scrap -= player.scrapNeeded;
		player.keys[0] += 1;
		openCrate(0);
	}
};
const openCrate = function (num) {
	if (player.keys.length < num || player.keys[num] <= 0) {
		return;
	}
	player.keys[num]--;

	var selected = selectDrop(player.loottable[num]);
	switch (selected.type) {
		case 'scrap':
			player.scrap += selected.amount;
			break;
		case 'reduce':
			player.scrapNeeded -= selected.amount;
			if (player.scrapNeeded < 10) {
				player.scrapNeeded = 10;
				removeReduce();
			}
			break;
		case 'producer':
			player.scrapPerS += selected.amount;
			break;
		case 'dkey':
			player.keys[num] += selected.amount;
			flags.updateInv = true;
			break;
		case 'nkey':
			player.keys[num + 1] += selected.amount;
			flags.updateInv = true;
			break;
	}
};

const selectDrop = function (table) {
	let r,
		totalentries = 0;
	table.forEach((e) => {
		totalentries += e.entries;
	});
	let selectedNumber = Math.floor(Math.random() * (totalentries + 1));
	table.some((e) => {
		selectedNumber -= e.entries;
		if (selectedNumber <= 0) {
			r = e;
			return true;
		}
	});
	r.amount = Math.floor(Math.random() * (r.max - r.min + 1) + r.min);
	return r;
};

const removeReduce = function () {
	player.loottable.forEach((element, i) => {
		player.loottable[i] = element.filter((el) => el.type != 'reduce');
	});
};

const updateInventory = function (e, keys) {
	e.innerHTML = '';

	for (let i = 0; i < keys.length; i++) {
		if (keys[i] > 0) {
			var item = createInventoryItem(i, keys[i]);
			item.onclick = function () {
				flags.updateInv = true;
				openCrate(i);
			};
			e.append(item);
		}
	}
};

const createInventoryItem = function (id, amount) {
	var e = document.createElement('div');
	var a = document.createElement('span');
	a.innerHTML = IDName[id] + ': ' + amount;
	e.append(a);
	return e;
};

const update = function (delta) {
	player.scrap += player.scrapPerS * delta;
};

const render = function () {
	document.getElementById('scrapcounter').innerHTML =
		Math.round(player.scrap) + ': ' + Math.round(player.scrapPerS) + '/s';
	document.getElementById('opencrate.0').innerHTML =
		'Turn scrap into a key and open a crate. (' + player.scrapNeeded + ')';

	if (flags.updateInv) {
		updateInventory(document.getElementById('inventory'), player.keys);
		flags.updateInv = false;
	}
};

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

const updatetime = 50;
var ticks = 0;
const loop = function () {
	ticks++;

	update(updatetime / 1000);

	if (ticks % 2 == 0) {
		render();
	}
	if (ticks % 200 == 0) {
		save();
	}
};

const gameLoop = setInterval(loop, updatetime);
load();

window.onbeforeunload = function () {
	save();
};

window.onunload = function () {
	save();
};
