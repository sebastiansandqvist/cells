'use strict';

const CELL_SIZE = 5;
const VERTICAL_OFFSET = 10; // to account for buttons

const WIDTH = ((window.innerWidth / CELL_SIZE) | 0) - CELL_SIZE;
const HEIGHT = (((window.innerHeight / CELL_SIZE) | 0) - CELL_SIZE) - VERTICAL_OFFSET;

function padBinary(str) {
	while (str.length < 8) {
		str = '0'.concat(str);
	}
	return str;
}

const ruleSets = {};

function getRuleTemplate() {
	return [
		{ rule: [true, true, true], result: false },
		{ rule: [true, true, false], result: false },
		{ rule: [true, false, true], result: false },
		{ rule: [true, false, false], result: false },
		{ rule: [false, true, true], result: false },
		{ rule: [false, true, false], result: false },
		{ rule: [false, false, true], result: false },
		{ rule: [false, false, false], result: false }
	];
}

function generateRules() {
	for (let i = 0; i < 256; i++) {
		const str = padBinary(i.toString(2));
		ruleSets[i] = getRuleTemplate();
		str.split('').forEach(function(char, j) {
			if (char === '1') {
				ruleSets[i][j].result = true;
			}
		});
	}
}

generateRules();

// shift container
const horizontalOffset = (window.innerWidth - (CELL_SIZE * WIDTH + CELL_SIZE)) / 2;
const verticalOffset = (window.innerHeight - (CELL_SIZE * HEIGHT + CELL_SIZE)) / 2;
document.getElementById('app').style.marginLeft = `${horizontalOffset}px`;
document.getElementById('app').style.marginTop = `${verticalOffset}px`;

const rows = Array(HEIGHT);

for (let i = 0; i < rows.length; i++) {
	rows[i] = Array(WIDTH);
}

function processCell([leftSibling, prevSelf, rightSibling], targetRow, targetIndex, rule, ruleValue) {

	const matchesRule =
		leftSibling === rule[0] &&
		prevSelf === rule[1] &&
		rightSibling === rule[2];

	if (matchesRule) {
		targetRow[targetIndex] = ruleValue;
	}

}

function processRow(row, parent) {
	for (let i = 0; i < row.length; i++) {

		const prevSelf = parent[i];
		const leftSibling = (i - 1) > 0 ? parent[i - 1] : parent[parent.length - 1];
		const rightSibling = (i + 1) < parent.length ? parent[i + 1] : parent[0];
		const setActive = processCell.bind(null, [leftSibling, prevSelf, rightSibling], row, i);

		const currentRuleSet = ruleSets[window.location.hash.slice(1) || '150'];
		currentRuleSet.forEach(function(ruleSet) {
			setActive(ruleSet.rule, ruleSet.result);
		});

	}
}


function update(seedFunction) {
	seedFunction(rows[0]);
	for (let i = 1; i < HEIGHT; i++) {
		processRow(rows[i], rows[i - 1]);
	}
}

function triangle(firstRow) {
	for (let i = 0; i < firstRow.length; i++) {
		firstRow[i] = false;
	}
	firstRow[(WIDTH / 2) | 0] = true;
}

// function triangle2(firstRow) {
// 	for (let i = 0; i < firstRow.length; i++) {
// 		firstRow[i] = true;
// 	}
// 	firstRow[(WIDTH / 2) | 0] = false;
// }
// const seedFunctions = [triangle, triangle2];

update(triangle);

// ------------------------------------------------------------------

// mithril attached to window
const m = window.m;

window.onhashchange = function() {
	update(triangle);
	m.redraw();
};

let hashCounter = parseInt(window.location.hash.slice(1), 10) || 0;

function goToHash(n) {
	hashCounter = n;
	window.location.hash = n.toString();
}

function next() {
	goToHash((hashCounter + 1) % 256);

}

function prev() {
	goToHash((hashCounter - 1) < 0 ? 0 : (hashCounter - 1) % 256);
}

const Graph = {
	view() {
		return (
			m('div',
				m('.center',
					m('button', { onclick: prev }, '←'),
					m('button', { onclick: next }, '→ '),
					m('br'),
					// m('button', { onclick: () => goToHash(13) }, '13'),
					m('button', { onclick: () => goToHash(18) }, '18'),
					m('button', { onclick: () => goToHash(22) }, '22'),
					// m('button', { onclick: () => goToHash(26) }, '26'),
					m('button', { onclick: () => goToHash(28) }, '28'),
					m('button', { onclick: () => goToHash(30) }, '30'),
					m('button', { onclick: () => goToHash(33) }, '33'),
					// m('button', { onclick: () => goToHash(45) }, '45'),
					m('button', { onclick: () => goToHash(50) }, '50'),
					// m('button', { onclick: () => goToHash(54) }, '54'),
					m('button', { onclick: () => goToHash(57) }, '57'),
					// m('button', { onclick: () => goToHash(58) }, '58'),
					m('button', { onclick: () => goToHash(60) }, '60'),
					m('button', { onclick: () => goToHash(62) }, '62'),
					m('button', { onclick: () => goToHash(69) }, '69'),
					// m('button', { onclick: () => goToHash(70) }, '70'),
					m('button', { onclick: () => goToHash(73) }, '73'),
					// m('button', { onclick: () => goToHash(75) }, '75'),
					m('button', { onclick: () => goToHash(77) }, '77'),
					// m('button', { onclick: () => goToHash(78) }, '78'),
					// m('button', { onclick: () => goToHash(79) }, '79'),
					// m('button', { onclick: () => goToHash(82) }, '82'),
					// m('button', { onclick: () => goToHash(86) }, '86'),
					// m('button', { onclick: () => goToHash(89) }, '89'),
					m('button', { onclick: () => goToHash(90) }, '90'),
					// m('button', { onclick: () => goToHash(92) }, '92'),
					// m('button', { onclick: () => goToHash(93) }, '93'),
					m('button', { onclick: () => goToHash(94) }, '94'),
					// m('button', { onclick: () => goToHash(99) }, '99'),
					// m('button', { onclick: () => goToHash(101) }, '101'),
					// m('button', { onclick: () => goToHash(102) }, '102'),
					m('button', { onclick: () => goToHash(105) }, '105'),
					m('button', { onclick: () => goToHash(109) }, '109'),
					m('button', { onclick: () => goToHash(110) }, '110'),
					// m('button', { onclick: () => goToHash(114) }, '114'),
					// m('button', { onclick: () => goToHash(118) }, '118'),
					m('button', { onclick: () => goToHash(122) }, '122'),
					// m('button', { onclick: () => goToHash(124) }, '124'),
					// m('button', { onclick: () => goToHash(126) }, '126'),
					// m('button', { onclick: () => goToHash(129) }, '129'),
					// m('button', { onclick: () => goToHash(131) }, '131'),
					// m('button', { onclick: () => goToHash(133) }, '133'),
					// m('button', { onclick: () => goToHash(135) }, '135'),
					// m('button', { onclick: () => goToHash(137) }, '137'),
					// m('button', { onclick: () => goToHash(141) }, '141'),
					// m('button', { onclick: () => goToHash(145) }, '145'),
					// m('button', { onclick: () => goToHash(146) }, '146'),
					// m('button', { onclick: () => goToHash(147) }, '147'),
					// m('button', { onclick: () => goToHash(149) }, '149'),
					m('button', { onclick: () => goToHash(150) }, '150'),
					// m('button', { onclick: () => goToHash(153) }, '153'),
					// m('button', { onclick: () => goToHash(154) }, '154'),
					// m('button', { onclick: () => goToHash(156) }, '156'),
					// m('button', { onclick: () => goToHash(157) }, '157'),
					// m('button', { onclick: () => goToHash(158) }, '158'),
					// m('button', { onclick: () => goToHash(161) }, '161'),
					// m('button', { onclick: () => goToHash(163) }, '163'),
					m('button', { onclick: () => goToHash(165) }, '165'),
					// m('button', { onclick: () => goToHash(167) }, '167'),
					// m('button', { onclick: () => goToHash(177) }, '177'),
					// m('button', { onclick: () => goToHash(178) }, '178'),
					// m('button', { onclick: () => goToHash(179) }, '179'),
					m('button', { onclick: () => goToHash(181) }, '181'),
					// m('button', { onclick: () => goToHash(182) }, '182'),
					// m('button', { onclick: () => goToHash(186) }, '186'),
					// m('button', { onclick: () => goToHash(188) }, '188'),
					// m('button', { onclick: () => goToHash(190) }, '190'),
					// m('button', { onclick: () => goToHash(193) }, '193'),
					// m('button', { onclick: () => goToHash(195) }, '195'),
					// m('button', { onclick: () => goToHash(197) }, '197'),
					// m('button', { onclick: () => goToHash(198) }, '198'),
					// m('button', { onclick: () => goToHash(199) }, '199'),
					m('button', { onclick: () => goToHash(201) }, '201'),
					// m('button', { onclick: () => goToHash(206) }, '206'),
					// m('button', { onclick: () => goToHash(210) }, '210'),
					m('button', { onclick: () => goToHash(214) }, '214'),
					m('button', { onclick: () => goToHash(218) }, '218'),
					// m('button', { onclick: () => goToHash(220) }, '220'),
					// m('button', { onclick: () => goToHash(222) }, '222'),
					// m('button', { onclick: () => goToHash(230) }, '230'),
					// m('button', { onclick: () => goToHash(238) }, '238'),
					// m('button', { onclick: () => goToHash(242) }, '242'),
					// m('button', { onclick: () => goToHash(246) }, '246'),
					m('button', { onclick: () => goToHash(250) }, '250')
					// m('button', { onclick: () => goToHash(252) }, '252'),
					// m('button', { onclick: () => goToHash(254) }, '254')
				),
				m('div',
					rows.map((row) => m('.row',
						row.map((bool) => m('div', { className: bool ? 'active' : '' }))
					))
				)
			)
		);
	}
};

m.mount(document.getElementById('app'), Graph);