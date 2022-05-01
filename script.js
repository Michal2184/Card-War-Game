"use strict";

// game starting
// prettier-ignore
const allCards = [
  "2C",  "2D",  "2H",  "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C",
  "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H",
  "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS",
  "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"];

const cardpoints = [11, ...allCards];

const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");
const player1Card = document.querySelector(".player1-card-playing");
const player1War1 = document.querySelector(".player1-war-card1");
const player1War2 = document.querySelector(".player1-war-card2");
const player2Card = document.querySelector(".player2-card-playing");
const player2War1 = document.querySelector(".player2-war-card1");
const player2War2 = document.querySelector(".player2-war-card2");

const player1AllPoints = document.querySelector(".player1-cards-total");
const player2AllPoints = document.querySelector(".player2-cards-total");
const player1BackCard = document.querySelector(".player1");
const player2BackCard = document.querySelector(".player2");
const player1stats = document.querySelector(".player1-stats");
const player2stats = document.querySelector(".player2-stats");
const drawButton = document.getElementById("draw");
const drawsCount = document.querySelector(".draws");

/*
     Spades - S,
     Hearts - H ,
     Diamonds - D,
     Clubs - C
*/

let draws = 0;
let player1cards = [];
let player2cards = [];

// Cards generator //
const sortCards = function () {
  const randomCard = function () {
    return allCards[Math.floor(Math.random() * allCards.length)];
  };
  for (let i = 0; i < 26; i++) {
    const player1CardNew = randomCard();
    player1cards.push(player1CardNew);
    const index = allCards.indexOf(player1CardNew);
    allCards.splice(index, 1);
  }
  for (let i = 0; i < 26; i++) {
    const player2CardNew = randomCard();
    player2cards.push(player2CardNew);
    const index = allCards.indexOf(player2CardNew);
    allCards.splice(index, 1);
  }
};

///  STARTING GAME  ////

player1Card.classList.add("hidden");
player2Card.classList.add("hidden");
player1Name.textContent = prompt(
  'Welcome to Classic "WAR" Card Game\n\nEnter name for Player1'
);
player2Name.textContent = prompt("Enter name for Player2");
sortCards();
player1AllPoints.textContent = player1cards.length;
player2AllPoints.textContent = player2cards.length;

let currentPlayer = 1;
let card1player1 = 0;
let card1player2 = 0;

function cardRemove() {
  player1Card.classList.add("hidden");
  player2Card.classList.add("hidden");
  player1War1.classList.add("hidden");
  player1War2.classList.add("hidden");
  player2War1.classList.add("hidden");
  player2War2.classList.add("hidden");
  drawButton.classList.remove("hidden");

  currentPlayer -= 1;
  player1AllPoints.textContent = player1cards.length;
  player2AllPoints.textContent = player2cards.length;
  player1stats.style.opacity = 1;
  player2stats.style.opacity = 0.3;
}

drawButton.addEventListener("click", function () {
  if (player1cards.length <= 0) {
    // player 1 wins
    player2AllPoints.textContent = "WINNER";
    player2stats.style.backgroundColor = "yellow";
  } else if (player2cards.length <= 0) {
    // player 2 wins
    player1AllPoints.textContent = "WINNER";
    player1stats.style.backgroundColor = "yellow";
  } else {
    draws += 1;
    drawsCount.textContent = draws;

    if (currentPlayer === 1) {
      //player1AllPoints.textContent = player1Points;
      document.getElementById(
        "player1-first-card"
      ).src = `/cards/${player1cards[0]}.png`;
      player1Card.classList.remove("hidden");
      card1player1 = player1cards[0];
      player1cards.splice(0, 1);
      player1AllPoints.textContent = player1cards.length;
      player1stats.style.opacity = 0.3;
      player2stats.style.opacity = 1;
      currentPlayer += 1;
    } else if (currentPlayer === 2) {
      document.getElementById(
        "player2-first-card"
      ).src = `/cards/${player2cards[0]}.png`;
      player2Card.classList.remove("hidden");
      card1player2 = player2cards[0];
      player2cards.splice(0, 1);
      player2AllPoints.textContent = player2cards.length;

      if (card1player2 !== 0) {
        let player1 = cardpoints.indexOf(card1player1);
        let player2 = cardpoints.indexOf(card1player2);
        const card1Player1FirstLetter = card1player1.slice(0, 1);
        const card1Player2FirstLetter = card1player2.slice(0, 1);
        
        // war exception
        if (card1Player1FirstLetter === card1Player2FirstLetter) {
         
          let card2player1 = player1cards[0];
          document.getElementById("player1-second-card").src =
            "cards/blue_back.png";
          player1War1.classList.remove("hidden");
          let card2player2 = player2cards[0];
          document.getElementById("player2-second-card").src =
            "cards/red_back.png";
          player2War1.classList.remove("hidden");
          player1cards.splice(0, 1);
          player2cards.splice(0, 1);
          let card3player1 = player1cards[0];
          document.getElementById(
            "player1-third-card"
          ).src = `/cards/${card3player1}.png`;
          player1War2.classList.remove("hidden");
          let card3player2 = player2cards[0];
          document.getElementById(
            "player2-third-card"
          ).src = `/cards/${card3player2}.png`;
          player2War2.classList.remove("hidden");
          player1cards.splice(0, 1);
          player2cards.splice(0, 1);
          player1 = cardpoints.indexOf(card3player1);
          player2 = cardpoints.indexOf(card3player2);
          if (player1 > player2) {
            player1cards.push(
              card1player1,
              card1player2,
              card2player1,
              card2player2,
              card3player1,
              card3player2
            );

            card1player1 = 0;
            card1player2 = 0;
          } else if (player1 < player2) {
            player2cards.push(
              card1player1,
              card1player2,
              card2player1,
              card2player2,
              card3player1,
              card3player2
            );
          }
          //  if player 1 has bigger card
        } else if (player1 > player2) {
         
          player1cards.push(card1player2);
          player1cards.push(card1player1);
          card1player1 = 0;
          card1player2 = 0;
          // if player 2 has bigger card
        } else if (player1 < player2) {
          player2cards.push(card1player1);
          player2cards.push(card1player2);
          
          card1player1 = 0;
          card1player2 = 0;
        }
        //cardRemove();
        drawButton.classList.add("hidden");
        setTimeout(cardRemove, 2500);
      }
      
    }
  }
});
