const container = document.querySelector('.container');
const header = document.querySelector('.header');
const playerBox = document.createElement('div');

header.appendChild(playerBox);

const Player = (token,name,type) => {
    const letter = () => {return token};
    const status = () => {return type};

    const playerDiv = document.createElement('div');
    playerDiv.textContent = name + ": " + token;
    playerBox.appendChild(playerDiv);

    const remove = () => {
        playerDiv.remove();
    }


    return {letter,remove,status}
};

let player1;
let player2;

const gameBoard = (() => {
    let gameArray = Array(9);
    const currBoard = () => {gameArray};

    const newBoard = () => {
        gameArray.fill("");
        for(let i = 0; i < 9; i++){
            let card = document.createElement('div');
            card.classList.add('card');
            card.id = i;
            //Want to move this logic out of the event listener and into its own function, potentially
            //in the gameController instead?
            card.addEventListener('click',function() {
                gameArray[i] = gameController.nextMove(i,gameArray);
                card.textContent = gameArray[i];
            });
            container.appendChild(card);
        }
        container.classList.remove('hidden');

        document.querySelector('body').style.display = "flex";
        document.querySelector('body').style.justifyContent = "space-evenly";
        

        //Making the players
        let playerCount;
        while((playerCount != 1) && (playerCount != 2))
        {
            playerCount = Number(window.prompt("How many human players?"));
            console.log(playerCount);
        }
        let playerName1 = window.prompt("Name of first player:");
        player1 = Player('X',playerName1,"human");
        if(playerCount === 2){
            let playerName2 = window.prompt("Name of second player:");
            player2 = Player('O', playerName2, "human");
        }
        else{
            player2 = Player('O',"Computer","computer");
        }

        //Adding player/computer choice functionality, then need
        //to check if a player has won after the 5th move every move, then need to check if the board is full
        // then do second players move 
        
        
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


        while(playerBox.hasChildNodes){
            playerBox.firstChild.remove();
        }
    };

    return {newBoard,clearBoard,currBoard}; 
})();



const gameController = (() => {
    let toggle = true;
    let winChecker = 0;
    const reset = () => {
        toggle = true;
        winChecker = 0;
    };


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

    const winSelector = () => {
        //check current board against potential winning boards, if X or O is the one that won, 
        //and display whoever that may be as the winner in a prompt.
        gameBoard.currBoard();
        return player1;
    }
    return {nextMove,reset,winSelector}
})();



document.getElementById('button').addEventListener('click',gameBoard.newBoard);
