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
		}
		updateArray();
		changeMark();
	});

	// READ array - UPDATE grid
	const renderArray = () => {
		for (let i = 0; i < gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}']`).textContent = gridArray[i];
		}
	};

	// RESET array and grid
	const resetArrayGrid = () => {
		for (let i = 0; i < gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}']`).textContent = '';
			updateArray();
		}
	};

	// INIT
	// renderArray();

	return {
		renderArray,
		updateArray,
		resetArrayGrid,
		gridArray,
	};
})();

const game = (() => {
	const restartButton = document.getElementById('restart');

	// event listeners
	restartButton.addEventListener('click', gameboard.resetArrayGrid);

	// CHECK winning condition
	const checkWinOrTie = (mapArray) => {
		const array = mapArray.map((x, i) => (x === '') ? (x = i) : (x = x)); // replace "" array elements with numbers
		if ((array[0] === array[1] && array[1] === array[2])
				|| (array[3] === array[4] && array[4] === array[5])
				|| (array[6] === array[7] && array[7] === array[8])
				|| (array[0] === array[3] && array[3] === array[6])
				|| (array[1] === array[4] && array[4] === array[7])
				|| (array[2] === array[5] && array[5] === array[8])
				|| (array[0] === array[4] && array[4] === array[8])
				|| (array[2] === array[4] && array[4] === array[6]))
			return console.log('win');
		if (!(mapArray.includes(''))) console.log('tie');
	};

	const declareWinner = (win) => {
		if (win !== 'win') return;
		console.log('winner');
	};

	return {
		checkWinOrTie,
		declareWinner,
	};
})();
