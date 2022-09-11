import Ship from './ship.js'
import Gameboard from './gameBoard.js'
import Player from './player.js'

const carrier = Ship('carrier', 5)
const battleship = Ship('battleship', 4)
const cruiser = Ship('cruiser', 3)
const submarine = Ship('submarine', 3)
const destroyer = Ship('destroyer', 2)
const buttonUnits = document.querySelector('[data-unitsSubmit]')
const enemyGrid = document.getElementById('enemyGrid')
const playerGrid = document.getElementById('playerGrid')
const boardSize = 12
const EnemyBoard = new Gameboard(boardSize)
const playerBoard = new Gameboard(boardSize)
playerBoard.renderBoard(boardSize)
// EnemyBoard.renderBoard(boardSize)

const carrierDraggable = document.querySelector('[data-carrier]')
const battleshipDraggable = document.querySelector('[data-battleship]')
const cruiserDraggable = document.querySelector('[data-cruiser]')
const submarineDraggable = document.querySelector('[data-submarine]')
const destroyerDraggable = document.querySelector('[data-destroyer]')





const dragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
    // console.log(e.target.id)
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

const dragLeave = (e) => {
    e.target.classList.remove('drag-over');
}

const drop = (e) => {
    e.target.classList.remove('drag-over');
    const idShip = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(idShip);
    console.log(draggable.id)
    let position = getGridElementsPosition(getNodeIndex(e.target));
    savePlayerUnits(draggable, position, e.target)
}

const savePlayerUnits = (ship, position, e) => {
    switch (ship.id) {
        case 'destroyer':
            if (playerBoard.placeShip(destroyer, position.row, position.column) == false) {
                ship.classList.remove('hide');
                
            }
            playerBoard.board.forEach(row => {
                row.forEach(unit => {
                    if(unit.shipName == 'destroyer') {
                        // for (let i = 0; i < destroyer.length / 2; i++) {
                            e.setAttribute('data-playerShip', `${ship.id}`)
                            e = e.nextSibling
                        }
                    // }
                })
            })
            break;
        case 'submarine':
            if (playerBoard.placeShip(submarine, position.row, position.column) == false) {
                ship.classList.remove('hide');
            }
            playerBoard.board.forEach(row => {
                row.forEach(unit => {
                    if(unit.shipName == 'submarine') {
                        // for (let i = 0; i < submarine.length / 3; i++) {
                            e.setAttribute('data-playerShip', `${ship.id}`)
                            e = e.nextSibling
                        }
                    // }
                })
            })
            break;
        case 'cruiser':
            if (playerBoard.placeShip(cruiser, position.row, position.column) == false) {
                ship.classList.remove('hide');
            }
            playerBoard.board.forEach(row => {
                row.forEach(unit => {
                    if(unit.shipName == 'cruiser') {
                        // for (let i = 0; i < cruiser.length / 3; i++) {
                            e.setAttribute('data-playerShip', `${ship.id}`)
                            e = e.nextSibling
                        }
                    // }
                })
            })
            break;
        case 'battleship':
            if (playerBoard.placeShip(battleship, position.row, position.column) == false) {
                ship.classList.remove('hide');
            }
            playerBoard.board.forEach(row => {
                row.forEach(unit => {
                    if(unit.shipName == 'battleship') {
                        // for (let i = 0; i < battleship.length / 4; i++) {
                            e.setAttribute('data-playerShip', `${ship.id}`)
                            e = e.nextSibling
                        // }
                    }
                })
            }) 
            break;
        case 'carrier':
            if (playerBoard.placeShip(carrier, position.row, position.column) == false) {
                ship.classList.remove('hide');
            }
            playerBoard.board.forEach(row => {
                row.forEach(unit => {
                    // for (let i = 0; i < row.length; i++) {
                    if(unit.shipName == 'carrier') {
                        // for (let j = 0; j < carrier * 5; i++) {
                            e.setAttribute('data-playerShip', `${ship.id}`)
                            e = e.nextSibling
                        }
                        // }
                })
            })
            break;
    }
}

carrierDraggable.addEventListener('dragstart', dragStart)
destroyerDraggable.addEventListener('dragstart', dragStart)
submarineDraggable.addEventListener('dragstart', dragStart)
cruiserDraggable.addEventListener('dragstart', dragStart)
battleshipDraggable.addEventListener('dragstart', dragStart)

playerGrid.addEventListener('dragenter', dragEnter)
playerGrid.addEventListener('dragover', dragOver);
playerGrid.addEventListener('dragleave', dragLeave);
playerGrid.addEventListener('drop', drop);


const enemyUnits = (max) => {
    let arr = []
    let x = Math.floor(Math.random() * max)
    let y = Math.floor(Math.random() * max)
    arr.push(x, y)
    return arr
}
buttonUnits.addEventListener('click', () => {
        const draggableSection = document.querySelector('.draggable')
        draggableSection.classList.add('hide')
        enemyGrid.classList.remove('hide')
        saveUnits()
})

const saveUnits = () => {

    let enemyCarrier = enemyUnits(boardSize - carrier.length)
    let enemyBattleship = enemyUnits(boardSize - battleship.length)
    let enemyCruiser = enemyUnits(boardSize - cruiser.length)
    let enemySub = enemyUnits(boardSize - submarine.length)
    let enemyDestroyer = enemyUnits(boardSize - destroyer.length)

    if (EnemyBoard.placeShip(carrier, enemyCarrier[0], enemyCarrier[1]) == false) {
        console.log('cat1')
        saveUnits()
    } 
    if ( EnemyBoard.placeShip(battleship, enemyBattleship[0], enemyBattleship[1])) {
        console.log('cat2')
        saveUnits()
    }
    if ( EnemyBoard.placeShip(cruiser, enemyCruiser[0], enemyCruiser[1])) {
        console.log('cat3')
        saveUnits()
    }
    if ( EnemyBoard.placeShip(submarine, enemySub[0], enemySub[1])) {
        console.log('cat4')
        saveUnits()
    }
    if ( EnemyBoard.placeShip(destroyer, enemyDestroyer[0], enemyDestroyer[1])) {
        console.log('cat5')
        saveUnits()
    }
}


function getGridElementsPosition(index) {
    let offset = Number(window.getComputedStyle(enemyGrid.children[0]).gridColumnStart) - 1; 
  
    if (isNaN(offset)) {
      offset = 0;
    }
    const colCount = window.getComputedStyle(enemyGrid).gridTemplateColumns.split(" ").length;

    const rowPosition = Math.floor((index + offset) / colCount);
    const colPosition = (index + offset) % colCount;

    return { row: rowPosition, column: colPosition };
  }
  
  function getNodeIndex(elm) {
    var c = elm.parentNode.children,
      i = 0;
    for (; i < c.length; i++) if (c[i] == elm) {
        return i;
    }
   
  }



const checkColor = (e, ship, board) => {
    switch (ship) {
        case 'carrier':
            ship == 'carrier'
            if (board == EnemyBoard) {
                e.target.setAttribute('data-ship', 'carrier')
                e.target.style.backgroundColor = 'red'
            } else if (board == playerBoard) {
                checkEnemyHits(e, ship)
            }
            sunkEnemy(ship)
            break;
        case 'battleship':
            ship == 'battleship'
            if (board == EnemyBoard) {
                e.target.style.backgroundColor = 'red'
                e.target.setAttribute('data-ship', 'battleship')
            } else if (board == playerBoard) {
                checkEnemyHits(e, ship)
            }
                sunkEnemy(ship)
                break;
        case 'cruiser':
            ship == 'cruiser'
            if (board == EnemyBoard) {
                e.target.style.backgroundColor = 'red'
                e.target.setAttribute('data-ship', 'cruiser')
            } else if (board == playerBoard) {
                checkEnemyHits(e, ship)
            }
                sunkEnemy(ship)
                break;
        case 'submarine':
            ship == 'submarine'
            if (board == EnemyBoard) {
                e.target.style.backgroundColor = 'red'
                e.target.setAttribute('data-ship', 'submarine')
            } else if (board == playerBoard) {
                checkEnemyHits(e, ship)
            }
                sunkEnemy(ship)
                break;
        case 'destroyer':
            ship == 'destroyer'
            if (board == EnemyBoard) {
                e.target.style.backgroundColor = 'red'
                e.target.setAttribute('data-ship', 'destroyer')
            } else if (board == playerBoard) {
                checkEnemyHits(e, ship)
            }
                sunkEnemy(ship)
                break;
        case 'missed':
            ship == 'missed'
            if (board == EnemyBoard) {
                e.target.style.backgroundColor = 'purple'
            } else if (board == playerBoard) {
                let enemyIndex = Math.floor(Math.random() * 143)
                // for (let i = 0; i < boardSize * boardSize; i++) {
                    playerGrid.childNodes.forEach(node => {
                        if (node.dataset.index == enemyIndex) {
                            if (node.hasAttribute('data-playerShip') || node.hasAttribute('data-status')) {
                                return false
                            }
                            else {
                                node.style.backgroundColor = 'purple'
                                node.setAttribute('data-status', 'miss')
                            }
                            
                        // } else if (node.dataset.index == enemyIndex){
                           
                        }
                    })
                // }    
            }
            break;
       
        }
    }

const checkEnemyHits = (e, ship) => {
    let enemyIndex = Math.floor(Math.random() * 143)
    console.log("enemy", enemyIndex)
    if (enemyIndex > boardSize * boardSize) {
        console.log('redo')
        checkEnemyHits(e, ship)
    }
    // for (let i = 0; i < boardSize * boardSize; i++) {
            playerGrid.childNodes.forEach(node => {
                if (node.dataset.index == enemyIndex) {
                    if (node.dataset.playerShip == `${ship}`) {
                        node.style.backgroundColor = 'red'
                        // node.setAttribute('data-playerShip', `${ship}`)
                    } 
                }
            })
        // }
}

const hitEnemy = (e) => {
    let positionCoord = [];
    let position = getGridElementsPosition(getNodeIndex(e.target));
    positionCoord.push(`${position.row}`, `${position.column}`)

    let ship = (EnemyBoard.receiveAttack(`${position.row}`, `${position.column}`))
    if (checkColor(e, ship, EnemyBoard) == false) {
        hitEnemy(e)
    }
   


    return positionCoord
}

const hitPlayer = (e) => {
    let units = enemyUnits(boardSize)
    console.log(units)
    let ship = (playerBoard.receiveAttack(`${units[0]}`, `${units[1]}`))
    e = units
    if (checkColor(e, ship, playerBoard) == false) {
        hitPlayer(e)
    }
    // checkColor(e, ship, playerBoard)
    console.log(ship)
}

const sunkEnemy = (ship) => {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
           if (EnemyBoard.board[i][j].shipName == ship && EnemyBoard.board[i][j].hitStatus == 'sunk') {
            let sunkShips = document.querySelectorAll(`[data-ship='${ship}']`) 
                sunkShips.forEach(sunk => {
                    sunk.style.backgroundColor = 'green'
                })
           } else if (playerBoard.board[i][j].shipName == ship && playerBoard.board[i][j].hitStatus == 'sunk') {
            let sunkShips = document.querySelectorAll(`[data-playerShip='${ship}']`) 
                sunkShips.forEach(sunk => {
                    sunk.style.backgroundColor = 'green'
                })
        }
    }
}

}


enemyGrid.addEventListener('click', (e) => {
    if (e.target.style.backgroundColor == 'red' || e.target.style.backgroundColor == 'purple' || e.target.style.backgroundColor == 'green') {
        return
    } else {
        hitEnemy(e)
        hitPlayer(e)
    }

})


console.log("Enemy", EnemyBoard)
console.log("player", playerBoard)


const players = new Player

// button.addEventListener('click', () => {
// players.playerTurn()
//     console.log(players)
// })



// Gameboard

// playerBoard.receiveAttack(1, 2)
// playerBoard.receiveAttack(1, 3)
// playerBoard.receiveAttack(1, 4)
// playerBoard.receiveAttack(5, 0)
// playerBoard.receiveAttack(5, 1)

// playerBoard.checkAllSunk()

// playerBoard.receiveAttack(2, 0)
// playerBoard.receiveAttack(2, 1)
// playerBoard.receiveAttack(2, 2)

// Player
// const button = document.querySelector('[data-unitsSubmit]')
// carrier.hit(0)
// carrier.hit(1)
// carrier.hit(2)
// carrier.hit(3)
// carrier.hit(4)

// destroyer.hit(0)
// destroyer.hit(1)

// console.log(carrier.isSunk())
// console.log(destroyer.isSunk())
