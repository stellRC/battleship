import Ship from './ship.js'

    let playerTurn = false;
    const playerOne = 'playerOne'
    const playerTwo = 'playerTwo'

class Player {
    constructor (turn = null, hit = []) {
        this.turn = turn
        this.hit = hit
    }

    playerTurn() {
        playerTurn = !playerTurn
        this.computerTurn()
        return this.playerMove(playerTurn)
    }

    playerMove(playerTurn) {
        const currentTurn = playerTurn ? playerTwo : playerOne;
        this.turn = currentTurn
    }

    computerTurn() {
        if (playerTurn == playerOne) return
        else {
            let arr = []
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            arr.push(x, y)
            this.hit = arr
        }
            
        
    }

    // playerHit() {
    //     this.hit = hit()
    // }


}

export default Player