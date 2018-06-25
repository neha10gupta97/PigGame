var scores, roundScore, activePlayer, gameRunning, prevDice;

startGame();

// document.querySelector('#current-'+ activePlayer).textContent = dice;
// document.querySelector('#current-'+ activePlayer).textContent = '<em>' + dice + '</em>';

function startGame(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    gameRunning = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.icon-1').style.color = '#EB4D4D';
    document.querySelector('.icon-1').style.color = '#EB4D4D';
    document.querySelector('.icon-1').style.color = '#EB4D4D';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-panel-0').classList.remove('winner');
    document.querySelector('.player-panel-1').classList.remove('winner');

    document.querySelector('.player-panel-0').classList.remove('active');
    document.querySelector('.player-panel-1').classList.remove('active');

    document.querySelector('.player-panel-0').classList.add('active');    
}

function nextPlayer(){
    activePlayer = activePlayer ? 0 : 1;
    roundScore = 0;

    if(activePlayer){
        document.querySelector('.icon-1').style.color = '#222';
        document.querySelector('.icon-2').style.color = '#222';
        document.querySelector('.icon-3').style.color = '#222';                
    }
    else{
        document.querySelector('.icon-1').style.color = '#EB4D4D';
        document.querySelector('.icon-2').style.color = '#EB4D4D';
        document.querySelector('.icon-3').style.color = '#EB4D4D';                
    }

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-panel-0').classList.toggle('active');
    document.querySelector('.player-panel-1').classList.toggle('active');  
    
    document.querySelector('.dice').style.display = 'none';
}



document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameRunning){
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';  
        diceDOM.src='../img/dice-' + dice + '.png';   
        
        if(dice ===6 && prevDice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        else if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        } 

        prevDice = dice;
    }
       
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gameRunning){
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore = input ? input : 100; 

        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-panel-' + activePlayer).classList.add('winner');
            gameRunning = false;
        }
        else{
            nextPlayer();
        } 
    }
      

});

document.querySelector('.btn-new').addEventListener('click', startGame); 


