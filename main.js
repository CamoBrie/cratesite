const update = function (delta) {
	player.scrap += player.scrapPerS * delta;
	if (player.bools.includes('automatekey')) {
		let x = Math.floor(player.scrap / player.scrapNeeded);
		if (x > 0) {
			player.keys[0] += x;
			player.scrap -= x * player.scrapNeeded;
			flags.updateInv = true;
		}
	}

	for (let i = 0; i <= player.openall; i++) {
		if (player.keys[i] > player.kcRate) {
			var x = Math.floor(player.keys[i] / player.kcRate);
			player.keys[i + 1] += x;
			player.keys[i] -= x * player.kcRate;
		}
	}
};

const render = function () {
	if (activePanelName == 'Main Screen') {
		if (!player.bools.includes('automatekey')) {
			document.getElementById('scrapcounter').innerHTML =
				Math.round(player.scrap) + ': ' + Math.round(player.scrapPerS) + '/s';
		} else {
			document.getElementById('scrapcounter').innerHTML =
				Math.round(player.scrapPerS) + '/s' + keyPerS();
		}

		if (!player.hides.includes('opencrate')) {
			document.getElementById('opencrate').innerHTML =
				'Turn scrap into a key and open a crate. (' + player.scrapNeeded + ')';
		}
		if (flags.updateInv) {
			updateInventory(document.getElementById('inventory'), player.keys);
			flags.updateInv = false;
		}

		if (flags.updateHide) {
			updateHide();
			flags.updateHide = false;
		}
	}
};

var ticks = 0;
const loop = function () {
	ticks++;

	update(player.settings.updatetime / 1000);

	if (ticks % 5 == 0) {
		render();
	}
	if (ticks % 200 == 0) {
		save();
	}
};

CreatePanels();
togglePanel('Main Screen');
load();
var gameLoop = setInterval(loop, player.settings.updatetime);
