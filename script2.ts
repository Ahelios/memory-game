// Defining a type(interface) in order to use for variable type
interface Card {
  name: string,
  img: string,
}

// Array of card object that consists of 2 keys - name & img

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

// Randomisation of an array using Fisher-Yates shuffle
const shuffleArray = (cardArray: Card[]) => {
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }
};

const gridDisplay: HTMLElement | null =  document.querySelector<HTMLElement>('.game-grid'); // Link TS variable with HTML element


let selectedCard: string[] = []; // Variable that will store clicked cards

// 
const selectedCardIds: string[] = [];

// Check if the img match
const checkMath = () => {
  const cards : NodeListOf<HTMLImageElement> = document.querySelectorAll<HTMLImageElement>('img');

  // const firsCardId = parseInt(selectedCardIds[0], 6);
  // const secondCardId = parseInt(selectedCardIds[1], 6);

  console.log('check for match');
  if (selectedCard[0] == selectedCard[1]) {
    console.log(cards);
    console.log(selectedCard[0]);
    //cards[firsCardId].setAttribute('src', 'assets/images/match.png');
    console.log('You found a match!')
  } else {
    console.log('Not a match!')
  }

  selectedCard = [];

}

// Enable card animation for flipping
const flipCard = (event: Event) => {
  const card = event.target as HTMLElement;
  const cardId = card.getAttribute('data-id');

  if (cardId !== null) {
    const id = parseInt(cardId, 10);
    selectedCard.push(cardArray[id].name);
    console.log('clicked', cardId);
    console.log(selectedCard)
    card.setAttribute('src',cardArray[id].img)
    if (selectedCard.length == 2) {
      setTimeout(checkMath, 500)
    }
  }
  
}

// Generating an img element for each array element
const createGameGrid = ():void => {
  shuffleArray(cardArray);
  for (let i = 0; i < cardArray.length; i++) {
    const card: HTMLImageElement = document.createElement('img');
    card.setAttribute('src', 'assets/images/default1.png');
    card.setAttribute('data-id', `${i}`);
    card.addEventListener('click', flipCard);
    gridDisplay.append(card);
  }
};

createGameGrid()

let numberOfMoves: number;


Define an interface for the structure of a card