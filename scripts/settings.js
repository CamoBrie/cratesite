var settinglist = [];
const wsc = [...window.slidecontainer.childNodes].filter(
	(e) => e.nodeName == 'SPAN' || e.nodeName == 'INPUT'
);
for (let i = 0; i < wsc.length; i += 2) {
	if (wsc[i].id == 'settings.' + wsc[i + 1].id) {
		settinglist.push({ text: wsc[i], slider: wsc[i + 1] });
	}
}

settinglist.forEach((e) => {
	e.slider.oninput = () => {
		e.text.innerHTML = e.text.dataset.txt + ' (' + e.slider.value + ')';
		player.settings[e.slider.id] = parseInt(e.slider.value);
		changesetting[e.slider.id]();
	};
});

const changesetting = {
	updatetime: () => {
		clearInterval(gameLoop);
		gameLoop = setInterval(loop, player.settings.updatetime);
	},
	foundlength: () => {
		lastopened('empty', '');
	},
};

window.texthide.oninput = () => {
	player.settings.filterfound = [];
	[...window.texthide.value.split(' ')].forEach((e) => {
		player.settings.filterfound.push(e);
	});
};
