const getScrap = function () {
	player.scrap++;
};

const removeReduce = function () {
	player.loottable.forEach((element, i) => {
		player.loottable[i] = element.filter((el) => el.type != 'reduce');
	});
};

var lastgot = [];
const lastopened = function (s) {
	window.lastopened.textContent = '';
	lastgot.unshift(s);

	lastgot = lastgot.slice(0, 10);

	for (let i = 0; i < lastgot.length; i++) {
		var element = document.createElement('p');
		element.innerHTML = lastgot[i];
		element.style.opacity = 0.1 * (lastgot.length - i);
		window.lastopened.append(element);
	}
};

const updateHide = function () {
	player.hides.forEach((element) => {
		document.getElementById(element).style.display = 'none';
	});
};

const keyPerS = function () {
	var x = Math.round(player.scrapPerS / 10);
	var txt = `|| ${x} ${IDName[0]}${x > 1 ? 's' : ''}/s `;
	for (var i = 0; i <= player.openall; i++) {
		var s = x / 100;
		if (s > 0.1) {
			txt += `|| ${s} ${IDName[i + 1]}${s > 1 ? 's' : ''}/s `;
		}
		x = s;
	}
	return txt;
};
