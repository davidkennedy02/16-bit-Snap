document.addEventListener('DOMContentLoaded', () => {

    // card options 
    const cardArray = [
        {
            name: 'bird',
            img: 'images/bird.png'
        },
        {
            name: 'bird',
            img: 'images/bird.png'
        },
        {
            name: 'bull',
            img: 'images/bull.png'
        },
        {
            name: 'bull',
            img: 'images/bull.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'dog',
            img: 'images/dog.png'
        },
        {
            name: 'dog',
            img: 'images/dog.png'
        },
        {
            name: 'fish',
            img: 'images/fish.png'
        },
        {
            name: 'fish',
            img: 'images/fish.png'
        },
        {
            name: 'ladybug',
            img: 'images/ladybug.png'
        },
        {
            name: 'ladybug',
            img: 'images/ladybug.png'
        },
        {
            name: 'snail',
            img: 'images/snail.png'
        },
        {
            name: 'snail',
            img: 'images/snail.png'
        },
        {
            name: 'turtle',
            img: 'images/turtle.png'
        },
        {
            name: 'turtle',
            img: 'images/turtle.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var guesses = 0

    const resultDisplay = document.querySelector('#result')
    const guessesDisplay = document.querySelector('#guesses')

    resultDisplay.textContent = cardsWon.length
    guessesDisplay.textContent = guesses

    // making the board 
    function makeBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/card_cover.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)

            var square = '.square' + (i + 1)
            document.querySelector(square).appendChild(card)
        }
    }

    // flip card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            guesses ++
            setTimeout(checkForMatch, 500)
        }
    }

    // check for match 
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const firstChoiceId = cardsChosenId[0]
        const secondChoiceId = cardsChosenId[1]

        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Snap!')
            cards[firstChoiceId].setAttribute('src', 'images/background.png')
            cards[secondChoiceId].setAttribute('src', 'images/background.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[firstChoiceId].setAttribute('src', 'images/card_cover.png')
            cards[secondChoiceId].setAttribute('src', 'images/card_cover.png')
            alert('Sorry, no match here')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        guessesDisplay.textContent = guesses
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You won!'
        }
    }

    makeBoard() 

})