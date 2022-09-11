const testShip = document.querySelectorAll('section')
const scoreCard = document.querySelector('.score')
const CoordSubmit = document.querySelector('button')


const Ship = (length, location, status) => {
    let shipLength = Array(length)
    
    const hit = (location, status, length) => {
            if (status == 'hit') return 
            status ='hit'
            return status
    };

    const isSunk = (location, status, length) => {
 
    }

    return { length, location, status, hit };


}

const testship2 = Ship(5, 1, 'not hit')
console.log(testship2.hit(5, 1, 'not hit'))

const createBoard = () => {
   
    const grid= document.getElementById('grid')
    
    for(let i= 0; i < 20 * 20; i++) {
        let unit = document.createElement('div')
        unit.setAttribute('data-index', [i])
        unit.classList.add('grid-unit')
        grid.appendChild(unit)
    }
}

createBoard()

const createShip = (e, coord) => {
    let unit = e.target
    // let coord =
    const battleShip = Ship(`${coord}`, `${unit.parentElement.children}`, `${unit.dataset.status}`)
    // battleShip.style.backgroundColor = 'red'
    placeShip(coord)
    console.log(battleShip)
}

const Gameboard = (e) => {
    let unit = e.target
    // let coord =
    // const battleShip = Ship(`${coord}`, `${unit.parentElement.children}`, `${unit.dataset.status}`)
    // unit.dataset.status = battleShip.hit()
    let shipLength = unit.parentElement.children
    let counter = 0
    for (let i = 0; i < shipLength.length; i++) {
        if (shipLength[i].dataset.status == 'hit'){
            counter++
            unit.style.backgroundColor = 'yellow'
        } else {
            unit.parentElement.dataset.status = 'active'
        }
        if (counter == shipLength.length) {
            unit.parentElement.dataset.status = 'sunk'
            player.countScore()
            for (let i = 0; i < shipLength.length; i++) {
                shipLength[i].style.backgroundColor = 'red'
            }
        }
    }

}

class Player {
    constructor (score = 0) {
        this.score = score
    }

    countScore() {
        let score = this.score;
        testShip.forEach(ship => {
            if (ship.dataset.status == 'sunk') {
                score = score + 1
                scoreCard.innerHTML = score
                return score
            }
        })

        if (score === testShip.length - 1) {
            scoreCard.innerHTML = 'You Win!'
        } 
        return score
    }
}

const player = new Player()

function getGridElementsPosition(index) {
    const gridEl = document.getElementById("grid");
    // our indexes are zero-based but gridColumns are 1-based, so subtract 1
    let offset = Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) - 1; 
  
    // if we haven't specified the first child's grid column, then there is no offset
    if (isNaN(offset)) {
      offset = 0;
    }
    const colCount = window.getComputedStyle(gridEl).gridTemplateColumns.split(" ").length;

    const rowPosition = Math.floor((index + offset) / colCount);
    const colPosition = (index + offset) % colCount;


  
    //Return an object with properties row and column
    return { row: rowPosition, column: colPosition };
  }
  
  function getNodeIndex(elm) {
    var c = elm.parentNode.children,
      i = 0;
    for (; i < c.length; i++) if (c[i] == elm) {
        console.log(i)
        return i;
    }
   
  }

  const placeShip = (e) => {
    if (e == `${[e[0], e[1]]}`) {
        let shipRow = parseInt(`${e[0]}`) * 20
        let shipCol = parseInt(`${e[1]}`)  
        const grid = document.getElementById('grid')
        let pos = [shipRow + shipCol]
        let string = pos.toString()
        console.log(string)
        for (let i = 0; i < grid.children.length; i++) 
            if( grid.children[i].dataset.index == `${pos}` ) {
                grid.children[i].style.backgroundColor = 'red'
                grid.children[i].setAttribute('data-ship', 'one')
                e.target = grid.children[i]
                addClickEventsToGridItems(e)
            }
    }
  }
  
  function addClickEventsToGridItems(e) {
    let positionCoord = [];
    let position = getGridElementsPosition(getNodeIndex(e.target));
      
        console.log(`row ${position.row}, column ${position.column}`);
        positionCoord.push(`${position.row}`, `${position.column}`)
        return positionCoord
  }



testShip.forEach(ship => ship.addEventListener('click', (e) => {
    Gameboard(e)
    addClickEventsToGridItems(e)
}))


CoordSubmit.addEventListener('click', (e) => {
    const rowInput = document.querySelector('[data-row]')
    const columnInput = document.querySelector('[data-column]')
    let coord = []
    coord.push(rowInput.value, columnInput.value)

    createShip(e, coord)
   

})
