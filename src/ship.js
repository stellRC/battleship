
 const Ship = (name, length) => {

    const shipLength = Array(length)

        for (let i = 0; i < shipLength.length; i++) {
            shipLength[i] = false
        }  
    
    const hit = (status) => {
        
            if (shipLength[status] == true) return 
            shipLength[status] = true
            return true
    };

    const checkHit = (status) => {
        if (shipLength[status] == true) return true
        return false 
    }
   

    const isSunk = () => {
        let counter = 0
        for (let i = 0; i < shipLength.length; i++) {
            if (checkHit(i) == true) {
                counter++
            } else return false
        }

        if (counter == shipLength.length) return true
    }

    return {name, length, location, hit, isSunk };


}

export default Ship