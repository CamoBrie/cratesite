var KeyInventory = {};

const updateInventory = function (e, keys) {
	for (let i = 0; i < keys.length; i++) {
		if (!KeyInventory[i] && keys[i] != 0) {
			KeyInventory[i] = createInventoryItem(i, keys[i]);
			KeyInventory[i].onclick = function () {
				flags.updateInv = true;
				openCrate(i);
			};
			e.append(KeyInventory[i]);
		} else if (KeyInventory[i] && keys[i] == 0) {
			e.removeChild(KeyInventory[i]);

			delete KeyInventory[i];
		} else if (keys[i] != 0) {
			KeyInventory[i].innerHTML = IDName[i] + ': ' + keys[i];
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
