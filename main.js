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
};

const render = function () {
	document.getElementById('scrapcounter').innerHTML =
		Math.round(player.scrap) + ': ' + Math.round(player.scrapPerS) + '/s';

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
};

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
flags.updateHide = true;
