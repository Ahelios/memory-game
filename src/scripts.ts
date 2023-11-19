interface Card {
  name: string;
  img: string;
}

document.addEventListener('DOMContentLoaded', () => {
  interface Card {
    name: string;
    img: string;
  }

  const cardArray: Card[] = [
    {
      name: 'elf',
      img: 'assets/images/elf1.png',
    },
    {
      name: 'orc',
      img: 'assets/images/orc1.png',
     },
    {
      name: 'human',
      img: 'assets/images/human1.png',
    },
    {
      name: 'elf',
    img: 'assets/images/elf1.png',
    },
    {
    name: 'orc',
    img: 'assets/images/orc1.png',
    },
    {
    name: 'human',
    img: 'assets/images/human1.png',
    },
  ];

  const shuffleArray = (cardArray: Card[]) => {
    for (let i = cardArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }
  };

  shuffleArray(cardArray);

  const grid: HTMLElement | null = document.querySelector('.game-grid');
  const resultDisplay: HTMLElement | null = document.querySelector('.result');
  let cardsChosen: string[] = [];
  let cardsChosenId: string[] = [];
  let cardsWon: string[] = [];

  function createBoard(): void {
    for (let i = 0; i < cardArray.length; i++) {
      const card: HTMLImageElement = document.createElement('img');
      card.setAttribute('src', 'assets/images/default1.png');
      card.setAttribute('data-id', i.toString());
      card.addEventListener('click', flipCard);
      if (grid) {
        grid.appendChild(card);
      }
    }
  }

  function checkForMatch(): void {
    const cards: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
    const optionOneId: string = cardsChosenId[0];
    const optionTwoId: string = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      cards[Number(optionOneId)].setAttribute('src', 'assets/images/match.png');
      cards[Number(optionTwoId)].setAttribute('src', 'assets/images/match.png');
      alert('You have clicked the same image!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('Its a match');
      cards[Number(optionOneId)].setAttribute('src', 'assets/images/match.png');
      cards[Number(optionTwoId)].setAttribute('src', 'assets/images/match.png');
      cards[Number(optionOneId)].removeEventListener('click', flipCard);
      cards[Number(optionTwoId)].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen[0]);
    } else {
      cards[Number(optionOneId)].setAttribute('src', 'assets/images/default1.png');
      cards[Number(optionTwoId)].setAttribute('src', 'assets/images/default1.png');
      alert('Try again');
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (resultDisplay) {
      resultDisplay.textContent = cardsWon.length.toString();
    }
    if (cardsWon.length === cardArray.length / 2) {
      if (resultDisplay) {
        resultDisplay.textContent = 'You Win!';
      }
    }
  }

  function flipCard(this: HTMLImageElement): void {
    let cardId: string | null = this.getAttribute('data-id');
    if (cardId) {
      cardsChosen.push(cardArray[Number(cardId)].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[Number(cardId)].img);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  createBoard();
});
