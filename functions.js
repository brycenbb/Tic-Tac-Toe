const container = document.querySelector('.container');

const Player = (token) => {
    const letter = () => {return token};

    return {letter}

}

const gameBoard = (() => {
    const newBoard = () => {
        let gameArray = Array(9);
        gameArray.fill("");
        for(let i = 0; i < 9; i++){
            let card = document.createElement('div');
            card.classList.add('card');
            card.id = i;
            card.addEventListener('click',function() {
                gameArray[i] = gameController.nextMove(i,gameArray)
                card.textContent = gameArray[i];
                console.table(gameArray);

            });
            container.appendChild(card);
        }
        container.classList.remove('hidden');

        document.querySelector('body').style.display = "flex";
        document.querySelector('body').style.justifyContent = "space-evenly";
        
        document.getElementById('button').removeEventListener('click',gameBoard.newBoard);
        document.getElementById('button').addEventListener('click',gameBoard.clearBoard);
    };

    const clearBoard = () => {
        let gridCards = container.childNodes;
        for(let i = 0; i < gridCards.length; i++){
            gridCards[i].textContent = "";
            gridCards[i].style.backgroundColor = "green";
        }
        let gameArray = Array(9);
        gameArray.fill("");
        gameController.reset();

    };

    return {newBoard,clearBoard}; 
})();



const gameController = (() => {
    let toggle = true;
    let winChecker = 0;
    const reset = () => {
        toggle = true;
        winChecker = 0;
    };

    const player1 = Player('X');
    const player2 = Player('O');

    const nextMove = (index,array) => {
        let nextItem = "";

        if(array[index] === ""){
            winChecker++;
            if(toggle){
                toggle = false;
                nextItem = player1.letter();
            }
            else{
                toggle = true;
                nextItem = player2.letter();
            }    

            return nextItem;
        }
        return array[index];
    };

    return {nextMove,reset}
})();



document.getElementById('button').addEventListener('click',gameBoard.newBoard);
