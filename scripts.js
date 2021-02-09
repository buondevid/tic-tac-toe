// FACTORY FUNCTION
const Player = (name, mark) => ({ name, mark });

// CREATE objects with factory functions
const human = Player('Davide', 'X');
const computer = Player('AI', 'O');

// MODULE
const gameboard = (() => {
	const gridArray = ['', '', '', '', '', '', '', '', ''];
	const board = document.querySelector('.grid');
	let { mark } = human;

	// CHANGE mark
	const changeMark = () => {
		mark = mark === 'X' ? computer.mark : human.mark;
	};

	// GETTER for mark variable
	const getMark = () => mark;

	// READ grid - UPDATE array
	const updateArray = () => {
		for (const child of board.children) {
			gridArray[child.dataset.pos] = child.textContent;
		}
	};

	// CREATE - Event listener adding the mark on the board and updating array
	board.addEventListener('click', (e) => {
		if (e.target.dataset.pos && e.target.textContent === '') {
			e.target.textContent = mark;
			updateArray();
			game.checkWinOrTie(gridArray);
			changeMark();
		}
	});

	// READ array - UPDATE grid
	const renderArray = () => {
		for (let i = 0; i < gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}']`).textContent = gridArray[i];
		}
	};

	// RESET array, grid, screen
	const resetGame = () => {
		for (let i = 0; i < gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}']`).textContent = '';
			updateArray();
		}
		document.querySelector('.win').classList.remove('active');
		mark = 'X';
	};

	return {
		renderArray,
		updateArray,
		resetGame,
		getMark,
		gridArray,
		mark,
	};
})();

const game = (() => {
	const restartButton = document.getElementById('restart');
	let name1;
	let name2;
	const gridCover = document.querySelector('.grid-cover');

	// event listeners
	restartButton.addEventListener('click', gameboard.resetGame);

	// CHECK winning or tie condition and drop end screen
	const checkWinOrTie = (mapArray) => {
		let result;
		const array = mapArray.map((x, i) => (x === '') ? (x = i) : (x)); // replace "" array elements with numbers
		if ((array[0] === array[1] && array[1] === array[2])
				|| (array[3] === array[4] && array[4] === array[5])
				|| (array[6] === array[7] && array[7] === array[8])
				|| (array[0] === array[3] && array[3] === array[6])
				|| (array[1] === array[4] && array[4] === array[7])
				|| (array[2] === array[5] && array[5] === array[8])
				|| (array[0] === array[4] && array[4] === array[8])
				|| (array[2] === array[4] && array[4] === array[6]))
		{ result = 'win'; }
		else if (!(mapArray.includes(''))) { result = 'tie'; }

		if (result === 'win') {
			document.querySelector('.win p').textContent = `${gameboard.getMark() === 'X' ? 'First player ' : 'Second player '} wins`;
			document.querySelector('.win').classList.add('active');
		} else if (result === 'tie') {
			document.querySelector('.win p').textContent = 'It\'s a tie!';
			document.querySelector('.win').classList.add('active');
		}
	};

	//FORM event listener
	document.querySelector('.first-player-wrap i').addEventListener('click', (e) => {
		const input = e.target.previousElementSibling;
		if (input.value !== '') {
			name1 = input.value;
			input.classList.add('readonly');
			document.querySelector('.first-player-wrap i').classList.add('hidden');
			input.setAttribute('readonly', '');
			{
				if (document.querySelector('.second-player-wrap i').classList.contains('hidden')) {
					gridCover.classList.add('hidden');
				}
			}
		}
	});
	document.querySelector('.second-player-wrap i').addEventListener('click', (e) => {
		const input = e.target.previousElementSibling;
		if (input.value !== '') {
			name2 = input.value;
			input.classList.add('readonly');
			document.querySelector('.second-player-wrap i').classList.add('hidden');
			input.setAttribute('readonly', '');
			{
				if (document.querySelector('.first-player-wrap i').classList.contains('hidden')) {
					console.log(document.querySelector('.first-player-wrap i').classList);
					gridCover.classList.add('hidden');
				}
			}
		}
	});


	return {
		checkWinOrTie,
	};
})();
