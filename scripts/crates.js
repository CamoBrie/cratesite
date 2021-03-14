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

	cratefn[selected.type](selected, num);
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

const cratefn = {
	scrap: (selected) => {
		player.scrap += selected.amount;
		lastopened('scrap', `Got ${selected.amount} scrap!`, 'LightSlateGray');
	},
	reduce: (selected) => {
		player.scrapNeeded -= selected.amount;
		if (player.scrapNeeded < 10) {
			player.scrapNeeded = 10;
			removeReduce();
		}
		lastopened(
			'reduce',
			`Reduced the Scrap need by ${selected.amount} scrap!`,
			'IndianRed'
		);
	},
	producer: (selected) => {
		player.scrapPerS += selected.amount;
		lastopened(
			'producer',
			`Got ${selected.amount} scrap per second!`,
			'LightSteelBlue'
		);
		if (player.scrapPerS >= 20 && !player.hides.includes('mainBtn')) {
			player.hides.push('mainBtn');
			flags.updateHide = true;
		}
	},
	dkey: (selected, num) => {
		player.keys[num] += selected.amount;
		flags.updateInv = true;
		lastopened(
			'dkey',
			`Got ${selected.amount > 1 ? selected.amount : ''} ${IDName[num]}${
				selected.amount > 1 ? 's' : ''
			}!`,
			'MediumSeaGreen'
		);
	},
	nkey: (selected, num) => {
		player.keys[num + 1] += selected.amount;
		flags.updateInv = true;
		lastopened(
			'nkey',
			`Got ${selected.amount > 1 ? selected.amount : ''} ${IDName[num + 1]}${
				selected.amount > 1 ? 's' : ''
			}!`,
			'MediumSpringGreen'
		);
	},
	keyimprove: (selected) => {
		let table = player.loottable[selected.amount];

		table.forEach((element) => {
			if (element.type == 'scrap') {
				keyifn.minimum_entry(element);
				element.min++;
				element.max++;
			} else if (element.type == 'producer') {
				element.min++;
				element.max++;
			} else if (element.type == 'dkey') {
				keyifn.minimum_entry(element);
				keyifn.maximum_amount(element);
			} else if (element.type == 'nkey') {
				element.entries++;
			}
		});
		lastopened(
			'keyimprove',
			`Improved the drop table of the ${IDName[selected.amount]}!`,
			'gold'
		);
	},
	bool: (selected, num) => {
		player.bools.push(selected.name);
		player.loottable[num] = player.loottable[num].filter((el) => el != selected);
		player.hides.push('opencrate');
		flags.updateHide = true;
		lastopened('bool', selected.desc, 'gold');
	},
};

const keyifn = {
	minimum_entry: (element) => {
		if (element.entries > 1) {
			element.entries--;
		}
	},
	maximum_amount: (element) => {
		if (element.min < element.max) {
			element.min++;
		}
	},
};
