'use strict'
const rockPaperScissor = {
  playerVsComputer: false,
  playerVsPlayer: false,
  gamesPlayed: 1,
  gameMode: 0,
  firstUserContainer: document.querySelector('#firstUserContainer'),
  secondUserContainer: document.querySelector('#secondUserContainer'),
  images: ['rock.png', 'paper.png', 'scissor.png'],
  _showModal: () => {
    var myModal = new bootstrap.Modal('#gameRules', {
      backdrop: 'static',
      keyboard: false,
    });
    window.addEventListener('DOMContentLoaded', () => {
      myModal.show();
    });

    var modal = document.querySelector('.modal');
    modal.addEventListener('click', (e) => {
      if (e.delegateTarget.closest('#playerVsComputer')) {
        rockPaperScissor.playerVsComputer = true;
        rockPaperScissor._playerVsComputer();
      }
    });
  },
  _playerVsComputer: () => {
    if (rockPaperScissor.playerVsComputer === true) {
      try {
        // we show only the user input to write his/her name and choose
        // the game mode and start the game
        var showFirstUserInput = document.querySelector('.firstUserInfo');
        showFirstUserInput.classList.remove('d-none');
        //Change second player username to "Computer"
        document.querySelector('#secondUserName').innerText = 'Computer';

        // Now we will write the conditions when the user fill username and select mode of the game
        // in that moment the game starts
        // So when we click the start button we need to check if all conditions hold
        document.querySelector('#startGame').addEventListener(
          'click',
          () => {
            try {
              // we collect every data
              //in order to start the game
              //username must contain 3-16 characters
              //game mode must be selected
              var username = document.querySelector(
                '.firstUserInfo input'
              ).value;
              var gameModeChecked = document.querySelector(
                '#gameMode input:checked'
              );
              rockPaperScissor.gameMode = parseInt(gameModeChecked?.value);
              if (
                username.length >= 3 &&
                username.length <= 16 &&
                gameModeChecked !== null
              ) {
                // it all went good now we continue

                //we update the username and display off the input fields
                document.querySelector('#firstUserName').innerText = username;
                document.querySelector('#gameMode').classList.add('d-none');
                document.querySelector('#startGame').classList.add('d-none');
                document
                  .querySelector('.firstUserInfo input')
                  .classList.add('d-none');

                //Now we need to show the three buttons for first user the rock,paper and sissor
                document
                  .querySelectorAll('.firstUserInfo button')
                  .forEach((e) => {
                    e.classList.remove('d-none');
                    // We add a little padding on the buttons
                    e.classList.add('px-5');
                  });
                //   We put the buttons in the middle of third section container
                document
                  .querySelector('#thirdSection')
                  .classList.remove('justify-content-between');
                document
                  .querySelector('#thirdSection')
                  .classList.add('justify-content-center');

                //   Since we are all set up now we will built our game logic but in different place
                rockPaperScissor._gameLogicVsComputer();
              } else {
                //we alert the user that something is wrong
                alert(
                  'Something went wrong try to fill username and select the game mode'
                );
              }
            } catch (e) {
              console.log(e);
            }
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
  _gameLogicVsComputer: () => {
    // Here we need to track the each player results, game player based on selected mode
    // mode 1: Best of three means there will be exatly 3 winning games, draws have to play again
    // So that means we can have results : 3-0,2-1,1-2,0-3 only
    // For each button we need to update the image based on user choise

    document.querySelectorAll('.firstUserInfo button').forEach((e) => {
      e.addEventListener('click', () => {
        //we need to check which buton did user press and update the image choise
        const selectedChoise = e.innerText;
        const src =
          document.querySelector('#firstChoiseImage').src.split('/images/')[0] +
          '/images/';

        if (selectedChoise === 'Rock') {
          document.querySelector('#firstChoiseImage').src = src + 'rock.png';
        } else if (selectedChoise === 'Paper') {
          document.querySelector('#firstChoiseImage').src = src + 'paper.png';
        } else if (selectedChoise === 'Scissor') {
          document.querySelector('#firstChoiseImage').src = src + 'scissor.png';
        }
        // Now for each User Clicks we need to call computer's turn
        //lets built an adition function called computerTurn
        rockPaperScissor._computerTurn();
        //Now we need to compare the choises and update the score
      });
    });
  },
  _computerTurn: () => {
    //since computer will play randomly we just randomly pick a value from an array
    //containing our images
    try {
      const randomPick = rockPaperScissor.images[Math.floor(Math.random() * 3)];
      const src =
        document.querySelector('#firstChoiseImage').src.split('/images/')[0] +
        '/images/';
      //now we update the computer image after every click
      document.querySelector('#secondChoiseImage').src = src + randomPick;
      //After Computer's turn we increment the game
      rockPaperScissor.gamesPlayed++;
      document.querySelector('#numOfGames').innerText =
        rockPaperScissor.gamesPlayed.toString();

      //   We need now to compare the results and to track the game base on game mode:
      //  We will do this in a seprate function called trackResultAndUpdate
      rockPaperScissor._trackResultAndUpdate();
    } catch (e) {
      console.log(e);
    }
  },
  _trackResultAndUpdate: () => {
    //we need to check if the game counter hasn't exedd the maximum of games that can be played
    let firstUserScore = document.querySelector('.firstPlayerResult');
    let computerScore = document.querySelector('.secondPlayerResult');
    let firstUserChoise = document.querySelector('#firstChoiseImage').src;
    let computerChoise = document.querySelector('#secondChoiseImage').src;
    if (firstUserChoise === computerChoise) {
      console.log('draw');
    } else if (
      (firstUserChoise.includes('paper') && computerChoise.includes('rock')) ||
      (firstUserChoise.includes('scissor') &&
        computerChoise.includes('paper')) ||
      (firstUserChoise.includes('rock') && computerChoise.includes('scissor'))
    ) {
      firstUserScore.innerText = `${parseInt(firstUserScore.innerText) + 1}`;
    } else {
      computerScore.innerText = `${parseInt(computerScore.innerText) + 1}`;
    }

    //now we need to check when ever sum of score is greater then game mode that means
    //we have a winner

    if (
      rockPaperScissor.gameMode ===
      parseInt(firstUserScore.innerText) + parseInt(computerScore.innerText)
    ) {
      //   Here we end the game we can highlght the winner as a pop up or alert
      // And we can reset the game lets do this in a seperate function called gameReset
      if (
        parseInt(firstUserScore.innerText) > parseInt(computerScore.innerText)
      ) {
        alert('Player won the Game');
      } else {
        alert('Computer won the game');
      }
      rockPaperScissor._resetGame();
    }
  },
  _resetGame: () => {
    location.reload();
  },
  _playerVsPlayer: () => {},
  _responsive: () => {
    if (window.innerWidth < 576) {
      document.querySelector('.container').style.width = '576px';
      var secondSection = document.querySelector('#secondSection');
      var thirdSection = document.querySelector('#thirdSection');
      secondSection.classList.remove('justify-content-between');
      secondSection.classList.add('flex-column');
      thirdSection.classList.remove('justify-content-between');
      thirdSection.classList.add('flex-column');
    }
  },
};
rockPaperScissor._showModal();
rockPaperScissor._responsive();
