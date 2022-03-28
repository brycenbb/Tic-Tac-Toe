const container = document.querySelector('.container');
const gameBoard = (() => {
    const newBoard = () => {
        for(let i = 1; i < 10; i++){
            let card = document.createElement('div');
            card.classList.add('card');
            card.id = i;
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
    };


    return {newBoard,clearBoard}; 
})();

document.getElementById('button').addEventListener('click',gameBoard.newBoard);
