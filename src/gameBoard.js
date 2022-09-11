import Ship from './ship.js'

const carrier = Ship('carrier', 5)
const battleship = Ship('battleship', 4)
const cruiser = Ship('cruiser', 3)
const submarine = Ship('submarine', 3)
const destroyer = Ship('destroyer', 2)

export default class Gameboard {
    constructor(boardSize) {
        this.board = this.createBoard(boardSize);
        this.missedHits = [];
        this.boardSize = boardSize;
    }


    createBoard(boardSize) {
        let arr = []
        let arrItem = []


        for (let i = 0; i < boardSize; i++) {

            for (let j = 0; j < boardSize; j++) {
                arrItem.push({ shipName: undefined, shipIndex: undefined, hitStatus: false })

            }
            arr.push(arrItem);
            arrItem = []
        
        }
        // this.renderBoard(boardSize)
        return arr;
    } 

    renderBoard(boardSize) {
        const boards = document.querySelectorAll('.board')
        boards.forEach(board => {
            board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
            board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`

        for (let i = 0; i < (boardSize * boardSize); i++) {
                let unit = document.createElement('div')
                unit.setAttribute('data-index', [i])
                unit.classList.add('grid-unit')
                board.appendChild(unit)
       
            }
           
        })
    }

    chechIfValid(length, x, y) {
        // console.log("length", length)
        let boardSize = this.boardSize
        // console.log(this.board)
        if (x > boardSize || x < 0 || y > boardSize || y < 0 || y + length > boardSize)  return false;
          for (let i = y; i < y + length; i++) {
            if (this.board[i][x].shipName != undefined) {
                console.log(this.board[i][x].shipName)
              return false;
            } 
          return true;
        }
      }
      placeShip(ship, x, y) {

        x = parseInt(x)
        y = parseInt(y)

        if (this.chechIfValid(ship.length, x, y)) {
          for (let i = 0; i < ship.length; i++) {
            this.board[y + i][x].shipName = ship.name;
            this.board[y + i][x].shipIndex = i;
          } 
          } else {
            return false
          }

        } 

    receiveAttack(x, y) {
        
        if (this.board[y][x].shipName == undefined) {
            this.missedHits.push({x: x, y: y})
            this.board[y][x].hitStatus = 'missed'
            return this.board[y][x].hitStatus
        }   
        let shipName = this.board[y][x].shipName

        switch (shipName) {
            case 'carrier':
                shipName == carrier
               if (carrier.hit(this.board[y][x].shipIndex) == true) {
                this.board[y][x].hitStatus = true
                this.checkSunk(shipName, carrier)
                return this.board[y][x].shipName
               }
                break;
            case 'battleship':
                shipName == battleship
                if (battleship.hit(this.board[y][x].shipIndex) == true) {
                    this.board[y][x].hitStatus = true
                    this.checkSunk(shipName, battleship)
                    return this.board[y][x].shipName
                   }
                break;
            case 'cruiser':
                shipName == cruiser
                if (cruiser.hit(this.board[y][x].shipIndex) == true) {
                    this.board[y][x].hitStatus = true
                    this.checkSunk(shipName, cruiser)
                    return this.board[y][x].shipName
                    }
                break;
            case 'submarine':
                shipName == submarine
                if (submarine.hit(this.board[y][x].shipIndex) == true) {
                this.board[y][x].hitStatus = true
                this.checkSunk(shipName, submarine)
                return this.board[y][x].shipName
                }
                break;
            case 'destroyer':
                shipName == destroyer
                if (destroyer.hit(this.board[y][x].shipIndex) == true) {
                    this.board[y][x].hitStatus = true
                    this.checkSunk(shipName, destroyer)
                    return this.board[y][x].shipName
                    }
                break;
        } 
    }
    
    checkSunk(shipNombre, vessel) {
       for (let ship in this.board) {
        let name = this.board[ship]
        name.forEach(name => {
            if (name.shipName == shipNombre) {
                // console.log("test1")
                if (name.hitStatus == false) return
                else if (vessel.isSunk() == true) {
                    // console.log("test.2")
                    name.hitStatus = 'sunk'
                    // console.log(name.shipName)
                    return name.hitStatus
                } 
                }
            })
       }
    }

    checkAllSunk() {
        let counter = 0
        for (let ship in this.board) {
            let name = this.board[ship]
            name.forEach(name => {
                    if (name.hitStatus == false) return
                    else if (name.hitStatus == 'sunk') {
                        counter++
                        if (counter == 17) {
                            // total number of ship units 
                            console.log('all ships are sunk!')
                        }
                    } 
                })
           }
    }
}



// else {
//     x + 1
//     y + 1
//     if (x < 12) {
//         x = 0
//     } else if (y < 12) {
//         y = 0
//     } else {
//         return
//     }
//     this.chechIfValid(ship.length, x + 1, y + 1)
//     console.log('cat')
// }