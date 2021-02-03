const Gameboard = (() => {
  const gridArray = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'O'];
	
	const renderArray = () => {
		for (let i = 0; i<gridArray.length; i++) {
			document.querySelector(`div[data-pos='${i}'`).textContent = gridArray[i];
		}
	}

	const addMark = () => {

	}
	
  return {
    renderArray,
  };
})();

Gameboard.renderArray();


const displayController = (() => {
  const add = (a, b) => a + b;

  return {
    add,
 
  };
})();

const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName  = () => name;
  const die = () => {
    // uh oh
  };
  const damage = x => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };
  const attack = enemy => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }
    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };
  return {attack, damage, getLevel, getName}
};

const jimmie = Player('jim', 10);
const badGuy = Player('jeff', 5);
jimmie.attack(badGuy);