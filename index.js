guessingGame = {
  startGame: false,
  firstUserName: '',
  secondUserName: '',
  firstUserClicked: false,
  secondUserClicked: false,
  gamesPlayed: 0,
  maxGamesToPlay: {
    1: 3,
    2: 5,
    3: 9,
  },
  gameMood: '',
  images: ['rock.png', 'paper.png', 'scissor.png'],
  _startTheGame: () => {
    document.querySelector('#startGame').addEventListener(
      'click',
      () => {
        guessingGame.startGame = true;
        guessingGame.gamesPlayed++;
        document.querySelector('#numOfGames').innerText =
          guessingGame.gamesPlayed;
        //We need to get the game mood and deactivate
        document
          .querySelectorAll('#gameMode input[type="radio"]')
          .forEach((e) => {
            if (e.checked) {
              guessingGame.gameMood = e.value.toString();
            }
          });

        if (guessingGame.gameMood !== '') {
          //We deactivate the button
          document.querySelector('#startGame').setAttribute('disabled', true);
          document.querySelectorAll('#gameMode input').forEach((e) => {
            e.setAttribute('disabled', true);
          });
          //we call the function to read Info of users and update in their places
          guessingGame._getUserInfo();
          guessingGame._trackResults();
          guessingGame._generateRandomChoise();
        }
      },
      true
    );
  },
  _getUserInfo: () => {
    guessingGame.firstUserName = document.querySelector(
      '.firstUserInfo input'
    ).value;
    guessingGame.secondUserName =
      document.querySelector('.secUserInfo input').value;
    guessingGame._updateUserInfo();
  },
  _updateUserInfo: () => {
    var lettersPattern = /^[A-Za-z]+$/;
    if (
      guessingGame.firstUserName.match(lettersPattern) &&
      guessingGame.secondUserName.match(lettersPattern)
    ) {
      document.querySelector('#firstUserName').innerText =
        guessingGame.firstUserName;
      document.querySelector('#secondUserName').innerText =
        guessingGame.secondUserName;
    } else {
      document.querySelector('#firstUserName').innerText = 'User A';
      document.querySelector('#secondUserName').innerText = 'User B';
    }

    //   We now deactivate the input fields we can make them invisibile
    document.querySelector('.firstUserInfo input').style = 'display: none;';
    document.querySelector('.secUserInfo input').style = 'display:none;';
  },
  _generateRandomChoise: () => {
    if (guessingGame.startGame === true && guessingGame.gameMood !== '') {
      document.querySelector('.firstUserInfo button').addEventListener(
        'click',
        () => {
          guessingGame.firstUserClicked = true;
          var random = Math.floor(Math.random() * 3);
          var src =
            document
              .querySelector('#firstChoiseImage')
              .src.split('/images/')[0] +
            '/images/' +
            guessingGame.images[random];
          document.querySelector('#firstChoiseImage').setAttribute('src', src);
          //we deactivate first the button
          document
            .querySelector('.firstUserInfo button')
            .setAttribute('disabled', true);
          guessingGame._checkUserResponse();
        },
        true
      );
      //We need now to deactivate the generate button until the second player plays

      document.querySelector('.secUserInfo button').addEventListener(
        'click',
        () => {
          guessingGame.firstUserClicked = true;
          var random = Math.floor(Math.random() * 3);
          var src =
            document
              .querySelector('#secondChoiseImage')
              .src.split('/images/')[0] +
            '/images/' +
            guessingGame.images[random];
          document.querySelector('#secondChoiseImage').setAttribute('src', src);
          document
            .querySelector('.secUserInfo button')
            .setAttribute('disabled', true);
          guessingGame._checkUserResponse();
        },
        true
      );
    }
  },
  _checkUserResponse: () => {
    if (
      document
        .querySelector('.firstUserInfo button')
        .getAttribute('disabled') === 'true' &&
      document.querySelector('.secUserInfo button').getAttribute('disabled') ===
        'true'
    ) {
      //since both are true that means a game is played and now we compare the choises
      //
      // guessingGame.gamesPlayed++;
      // document.querySelector('#numOfGames').innerText =
      //   guessingGame.gamesPlayed;
      var firstUserChoise = document.querySelector('#firstChoiseImage').src;
      var secondUserChoise = document.querySelector('#secondChoiseImage').src;
      var result = guessingGame._compareChoises(
        firstUserChoise,
        secondUserChoise
      );
      if (result === 'draw') {
        //we just increment the game teh score its same
        // guessingGame.gamesPlayed++;
        // //update the game
        // document.querySelector('#numOfGames').innerText =
        //   guessingGame.gamesPlayed;
      } else if (result === 'firstUser') {
        var currScore = document.querySelector('.firstPlayerResult').innerText;
        currScore = parseInt(currScore) + 1;
        document.querySelector('.firstPlayerResult').innerText = `${currScore}`;
        //we increment the game
        guessingGame.gamesPlayed++;
        //update the game
        document.querySelector('#numOfGames').innerText =
          guessingGame.gamesPlayed;
        // We need now to decrement the number of games that are allow to play
        guessingGame._trackResults();

        //we increment the first User score and increment the gamePlayed
      } else if (result === 'secondUser') {
        var currScore = document.querySelector('.secondPlayerResult').innerText;
        currScore = parseInt(currScore) + 1;
        document.querySelector(
          '.secondPlayerResult'
        ).innerText = `${currScore}`;
        //lets increment the game
        guessingGame.gamesPlayed++;
        //update the game
        document.querySelector('#numOfGames').innerText =
          guessingGame.gamesPlayed;
      }
      document
        .querySelector('.firstUserInfo button')
        .removeAttribute('disabled');
      document.querySelector('.secUserInfo button').removeAttribute('disabled');
      guessingGame._trackResults();
    }
  },
  _trackResults: () => {
    var maxGames = guessingGame.maxGamesToPlay[guessingGame.gameMood];
    var currGame = parseInt(document.querySelector('#numOfGames').innerText);
    var firstUserContainer = document.querySelector('#firstUserContainer');
    var secondUserContainer = document.querySelector('#secondUserContainer');
    //here we compare if we reached the numbers of games played and declare the winner
    if (maxGames === currGame - 1) {
      var firstUserResult =
        document.querySelector('.firstPlayerResult').innerText;
      var secondUserResult = document.querySelector(
        '.secondPlayerResult'
      ).innerText;

      if (parseInt(firstUserResult) > parseInt(secondUserResult)) {
        //we will add like green border for the winner and a red border for the looser
        console.log('First User Won');

        firstUserContainer.classList.add('border-bottom');
        firstUserContainer.classList.add('border-5');
        firstUserContainer.classList.add('border-success');
        secondUserContainer.classList.add('border-bottom');
        secondUserContainer.classList.add('border-5');
        secondUserContainer.classList.add('border-danger');
      } else {
        //we will add like green border for the winner and a red border for the looser
        console.log('Second User Won');

        secondUserContainer.classList.add('border-bottom');
        secondUserContainer.classList.add('border-5');
        secondUserContainer.classList.add('border-success');
        firstUserContainer.classList.add('border-bottom');
        firstUserContainer.classList.add('border-5');
        firstUserContainer.classList.add('border-danger');
      }
      //We now reset the game
      setTimeout(() => {
        guessingGame.startGame = false;
        guessingGame.gamesPlayed = 0;
        document.querySelector('.firstPlayerResult').innerText = '0';
        document.querySelector('.secondPlayerResult').innerText = '0';
        document.querySelector('#numOfGames').innerText =
          guessingGame.gamesPlayed;
        document.querySelector('.firstUserInfo input').style =
          'display: unset;';
        document.querySelector('.secUserInfo input').style = 'display:unset;';
        document.querySelector('#startGame').removeAttribute('disabled');
        document.querySelectorAll('#gameMode input').forEach((e) => {
          e.removeAttribute('disabled');
        });
        //We remove also the styles applied to the winner and looser
        firstUserContainer.classList.remove('border-bottom');
        firstUserContainer.classList.remove('border-5');
        firstUserContainer.classList.remove('border-success');
        secondUserContainer.classList.remove('border-bottom');
        secondUserContainer.classList.remove('border-5');
        secondUserContainer.classList.remove('border-danger');
      }, 2000);
    }
  },
  _compareChoises: (firstUserChoise, secondUserChoise) => {
    if (
      (firstUserChoise.includes('paper') &&
        secondUserChoise.includes('paper')) ||
      (firstUserChoise.includes('rock') && secondUserChoise.includes('rock')) ||
      (firstUserChoise.includes('scissor') &&
        secondUserChoise.includes('scissor'))
    ) {
      return 'draw';
    } else if (
      firstUserChoise.includes('paper') &&
      secondUserChoise.includes('rock')
    ) {
      return 'firstUser';
    } else if (
      secondUserChoise.includes('paper') &&
      firstUserChoise.includes('rock')
    ) {
      return 'secondUser';
    } else if (
      firstUserChoise.includes('paper') &&
      secondUserChoise.includes('scissor')
    ) {
      return 'secondUser';
    } else if (
      secondUserChoise.includes('paper') &&
      firstUserChoise.includes('scissor')
    ) {
      return 'firstUser';
    } else if (
      firstUserChoise.includes('scissor') &&
      secondUserChoise.includes('rock')
    ) {
      return 'secondUser';
    } else if (
      secondUserChoise.includes('scissor') &&
      firstUserChoise.includes('rock')
    ) {
      return 'firstUser';
    }
  },
  _resetGame: () => {
    document.querySelector('#resetGame').addEventListener(
      'click',
      () => {
        if (guessingGame.startGame === true) {
          guessingGame.startGame = false;
          guessingGame.gamesPlayed = 0;
          guessingGame.gameMood = '';
          document.querySelector('.firstPlayerResult').innerText = '0';
          document.querySelector('.secondPlayerResult').innerText = '0';
          document.querySelector('#numOfGames').innerText =
            guessingGame.gamesPlayed;
          document.querySelector('.firstUserInfo input').style =
            'display: unset;';
          document.querySelector('.secUserInfo input').style = 'display:unset;';
          document.querySelector('#startGame').removeAttribute('disabled');
          document.querySelectorAll('#gameMode input').forEach((e) => {
            e.removeAttribute('disabled');
          });
          if (
            document
              .querySelector('.firstUserInfo button')
              .getAttribute('disabled') === 'true'
          ) {
            document
              .querySelector('.firstUserInfo button')
              .removeAttribute('disabled');
          }
          if (
            document
              .querySelector('.secUserInfo button')
              .getAttribute('disabled') === 'true'
          ) {
            document
              .querySelector('.secUserInfo button')
              .removeAttribute('disabled');
          }
        }
      },
      true
    );
  },  _responsive: () => {
    if (window.innerWidth < 576) {
      var secondSection = document.querySelector('#secondSection');
      var thirdSection = document.querySelector('#thirdSection');
      secondSection.classList.remove('justify-content-between');
      secondSection.classList.add('flex-column');
      thirdSection.classList.remove('justify-content-between');
      thirdSection.classList.add('flex-column');
    }
  },
};
guessingGame._startTheGame();
guessingGame._resetGame();
guessingGame._responsive();
