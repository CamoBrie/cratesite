const getScrap = function () {
	player.scrap++;
};

const removeReduce = function () {
	player.loottable.forEach((element, i) => {
		player.loottable[i] = element.filter((el) => el.type != 'reduce');
	});
};

var lastgot = [];
var toggle = true;
const lastopened = function (type, s, color = 'white') {
	if (toggle) {
		window.lastopentitle.innerHTML = 'Last found:';
		toggle = !toggle;
	} else {
		window.lastopentitle.innerHTML = 'Last found.';
		toggle = !toggle;
	}

	if (player.settings.filterfound.includes(type)) {
		return;
	}

	window.lastopened.textContent = '';

	lastgot.unshift({ s, color });

	lastgot = lastgot.slice(0, player.settings.foundlength);

	for (let i = 0; i < lastgot.length; i++) {
		var element = document.createElement('p');
		element.innerHTML = lastgot[i].s;
		element.style.color = lastgot[i].color;
		element.style.opacity = 0.1 * (player.settings.foundlength - i);
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
		var s = x / player.kcRate;
		if (s > 0.1) {
			txt += `|| ${s} ${IDName[i + 1]}${s > 1 ? 's' : ''}/s `;
		}
		x = s;
	}
	return txt;
};

var panelList = [];
var activePanelName = '';
const CreatePanels = function () {
	[...document.body.childNodes].forEach((element) => {
		if (element.classList && element.classList.contains('Panel')) {
			panelList.push(element);
		}
	});
	panelList.forEach((element) => {
		var e = document.createElement('button');
		e.innerHTML = element.dataset.panelname;
		e.onclick = () => {
			togglePanel(element.dataset.panelname);
		};
		window.panelSelect.append(e);
	});
};

const togglePanel = function (panelName) {
	panelList.forEach((element) => {
		element.classList.remove('activePanel');
		element.style.display = 'none';

		if (element.dataset.panelname == panelName) {
			element.classList.add('activePanel');
			element.style.display = 'block';
			activePanelName = panelName;
		}
	});
};
