// FACTORY FUNCTION
const Player = (name, mark) => ({ name, mark });

// MODULE
const gameboard = (() => {
	const gridArray = ['', '', '', '', '', '', '', '', ''];
	const board = document.querySelector('.grid');
	let mark = 'X';

	document.addEventListener('DOMContentLoaded', () => {
		window.setTimeout(() => {
			document.body.classList.remove('fade');
		}, 230);
	});

	// CHANGE mark
	const changeMark = () => {
		mark = mark === 'X' ? game.computer.mark : game.human.mark;
		document.querySelectorAll('.inputs')[0].classList.toggle('your-turn');
		document.querySelectorAll('.inputs')[1].classList.toggle('your-turn');
	};

	// GETTER for mark variable
	const getMark = () => mark;

	// READ grid - UPDATE array
	const updateArray = () => {
		// eslint-disable-next-line no-restricted-syntax
		for (const child of board.children) {
			gridArray[child.dataset.pos] = child.textContent;
		}
	};

	// CREATE - Event listener adding the mark on the board and updating array
	let allowClick = true;
	let allowClickGridCover = true;
	const setAllowClick = (boolean) => {
		allowClick = boolean;
	};
	board.addEventListener('click', (e) => {
		if (e.target.dataset.pos && e.target.textContent === '' && allowClick) {
			allowClick = false;
			e.target.textContent = mark;
			updateArray();
			game.checkWinOrTie(gridArray) && changeMark();
			if (game.getTurn() === 'ai' && game.checkWinOrTie(gridArray)) {
				setTimeout(() => {
					game.ai();
					updateArray();
					game.checkWinOrTie(gridArray);
					changeMark();
					allowClick = true;
				}, (Math.floor(Math.random() * 3000)));
			} else allowClick = true;
		} else if (e.target === document.querySelector('.grid-cover') && allowClickGridCover) {
			allowClickGridCover = false;
			document.querySelectorAll('.inputs')[0].classList.add('player-names');
			document.querySelectorAll('.inputs')[1].classList.add('player-names');
			setTimeout(() => {
				document.querySelectorAll('.inputs')[0].classList.remove('player-names');
				document.querySelectorAll('.inputs')[1].classList.remove('player-names');
				allowClickGridCover = true;
			}, 3100);
		}
	});

	// // READ array - UPDATE grid ---> NOT USED
	// const _renderArray = () => {
	// 	for (let i = 0; i < gridArray.length; i++) {
	// 		document.querySelector(`div[data-pos='${i}']`).textContent = gridArray[i];
	// 	}
	// };

	// RESET array, grid, screen
	const resetGame = () => {
		for (let i = 0; i < gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}']`).textContent = '';
			updateArray();
		}
		document.querySelector('.win').classList.remove('active');
		setTimeout(() => document.querySelector('.win p').classList.remove('animation'), 1000);
		mark = 'X';
		game.resetForm();
	};

	return {
		resetGame,
		getMark,
		setAllowClick,
		board,
	};
})();

const game = (() => {
	const restartButton = document.getElementById('restart');
	let name1;
	let name2;
	const gridCover = document.querySelector('.grid-cover');
	let turn = '';
	const input1 = document.querySelectorAll('.inputs')[0];
	const input2 = document.querySelectorAll('.inputs')[1];

	// CREATE objects with factory functions
	const human = Player(name1, 'X');
	const computer = Player(name2, 'O');

	// event listeners
	restartButton.addEventListener('click', gameboard.resetGame);

	// CHECK winning or tie condition and drop end screen
	const checkWinOrTie = (mapArray) => {
		let result;
		const array = mapArray.map((x, i) => ((x === '') ? (i) : (x))); // replace "" array elements with numbers
		if ((array[0] === array[1] && array[1] === array[2])
				|| (array[3] === array[4] && array[4] === array[5])
				|| (array[6] === array[7] && array[7] === array[8])
				|| (array[0] === array[3] && array[3] === array[6])
				|| (array[1] === array[4] && array[4] === array[7])
				|| (array[2] === array[5] && array[5] === array[8])
				|| (array[0] === array[4] && array[4] === array[8])
				|| (array[2] === array[4] && array[4] === array[6])) {
			result = 'win';
		} else if (!(mapArray.includes(''))) { result = 'tie'; }

		if (result === 'win') {
			document.querySelector('.win p').textContent = `${gameboard.getMark() === 'X' ? `${human.name} ` : `${computer.name} `} (${gameboard.getMark()}) wins`;
			document.querySelector('.win p').classList.add('animation');
			document.querySelector('.win').classList.add('active');
			gridCover.classList.remove('hidden');
			return false;
		}
		if (result === 'tie') {
			document.querySelector('.win p').textContent = 'It\'s a tie!';
			document.querySelector('.win p').classList.add('animation');
			document.querySelector('.win').classList.add('active');
			return false;
		}
		return true;
	};

	// FORM event listeners
	document.querySelector('.first-player-wrap i').addEventListener('click', () => {
		if (input1.value !== '') {
			human.name = input1.value;
			input1.classList.add('readonly');
			document.querySelector('.first-player-wrap i').classList.add('hidden');
			input1.setAttribute('readonly', '');
			if (document.querySelector('.second-player-wrap i').classList.contains('hidden')) {
				gridCover.classList.add('hidden');
				input1.classList.add('your-turn');
			}
		}
	});

	document.querySelector('.second-player-wrap i').addEventListener('click', () => {
		if (input2.value !== '') {
			computer.name = input2.value;
			if ((/computer/ig).test(input2.value)) {
				const robotIcon = document.querySelector('.second-player-wrap i:last-child');
				turn = 'ai';
				robotIcon.classList.add('fas', 'fa-robot');
				robotIcon.classList.remove('fade');
			} else turn = '';
			input2.classList.add('readonly');
			document.querySelector('.second-player-wrap i').classList.add('hidden');
			input2.setAttribute('readonly', '');
			if (document.querySelector('.first-player-wrap i').classList.contains('hidden')) {
				gridCover.classList.add('hidden');
				input1.classList.add('your-turn');
			}
		}
	});
	input1.addEventListener('keyup', (e) => {
		if (e.keyCode === 13) {
			document.querySelector('.first-player-wrap i').click();
		}
	});
	input2.addEventListener('keyup', (e) => {
		if (e.keyCode === 13) {
			document.querySelector('.second-player-wrap i').click();
			input2.blur();
		}
	});

	const resetForm = () => {
		gameboard.setAllowClick(true);
		document.querySelector('.second-player-wrap i:last-child').classList.remove('fas', 'fa-robot');
		document.querySelector('.second-player-wrap i:last-child').classList.add('fade');
		input1.classList.remove('readonly');
		input2.classList.remove('readonly');
		document.querySelector('.second-player-wrap i').classList.remove('hidden');
		document.querySelector('.first-player-wrap i').classList.remove('hidden');
		input1.removeAttribute('readonly');
		input2.removeAttribute('readonly');
		gridCover.classList.remove('hidden');
		input1.classList.remove('your-turn');
		input2.classList.remove('your-turn');
		gameboard.allowClick = true;
	};

	const ai = () => {
		const grid = gameboard.board;
		const random = Math.floor(Math.random() * 9) + 1;
		if (grid.children[random].textContent === '') {
			grid.children[random].textContent = gameboard.getMark();
		} else ai();
	};

	const getTurn = () => turn;

	return {
		checkWinOrTie,
		resetForm,
		ai,
		getTurn,
		human,
		computer,
	};
})();
