document.addEventListener('DOMContentLoaded', () => {

    // Card options - name and image
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

    // Randomise the array
    cardArray.sort(() => 0.5 - Math.random())

    // Initialising variables used to track progress 
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var guesses = 0
    var topScore = 999

    // Assigning html elements to constants by id 
    const resultDisplay = document.querySelector('#result')
    const guessesDisplay = document.querySelector('#guesses')
    const topScoreDisplay = document.querySelector('#top-score')

    // Giving those same elements content to display 
    resultDisplay.textContent = "Pairs: " + cardsWon.length / 2
    guessesDisplay.textContent = guesses
    topScoreDisplay.textContent = topScore

    // Defining the restart button
    var buttonRestart = document.getElementById("button-restart");
    buttonRestart.addEventListener("click", resetBoard);  

    // Defining the new game button
    var buttonNewGame = document.getElementById("button-new-game");
    buttonNewGame.addEventListener("click", () => location.reload());

    // Setting up the board the board - this is called once 
    // when the page loads 
    function makeBoard() {

        // For each card in the deck: 
        for (let i = 0; i < cardArray.length; i++) {

            // Hide the trophy, show the grid
            document.querySelector('.grid').style.display = "grid"
            document.querySelector("#victory").style.display = "none"

            // Create a card element and give it both the image to 
            // display, and it's position on the board 
            var card = document.createElement('img')
            card.setAttribute('src', 'images/card_cover.png')
            card.setAttribute('data-id', i)

            // Additionally, it should call the flipCard function 
            // when clicked
            card.addEventListener('click', flipCard)

            // Select the appropriate square on the grid via class name
            var square = '.square' + (i + 1)

            // Assign the created card to that square
            document.querySelector(square).appendChild(card)
        }
    }

    // Flip card - called each time the user clicks on a card
    function flipCard() {

        // Get the card's position on the board 
        var cardId = this.getAttribute('data-id')

        if (!cardsChosenId.includes(cardId) && 
            !cardsWon.includes(cardId)) {

            // Push the card name and position to their respective arrays
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)

            // Reveal the card's image
            this.setAttribute('src', cardArray[cardId].img)

            // Two clicks count as a guess - check if the two 
            // cards are a pair
            if (cardsChosen.length === 2) {
                guesses ++
                setTimeout(checkForMatch, 500)
            }
        }
    }

    // Check for match 
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const firstChoiceId = cardsChosenId[0]
        const secondChoiceId = cardsChosenId[1]

        // If a pair is chosen...
        if (cardsChosen[0] === cardsChosen[1]) {

            // Remove the cards from the grid 
            cards[firstChoiceId].setAttribute('src', 'images/background.png')
            cards[secondChoiceId].setAttribute('src', 'images/background.png')
            cardsChosenId.forEach(cardId => {
                cardsWon.push(cardId)
            })
        } else {
            cards[firstChoiceId].setAttribute('src', 'images/card_cover.png')
            cards[secondChoiceId].setAttribute('src', 'images/card_cover.png')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = "Pairs: " + cardsWon.length / 2
        guessesDisplay.textContent = guesses
        if (cardsWon.length === cardArray.length) {

            // Hide the grid, present the trophy
            document.querySelector('.grid').style.display = "none"
            document.querySelector("#victory").style.display = "block"
            resultDisplay.textContent = 'Congratulations! You won!'
            if (guesses < topScore){
                topScore = guesses
                topScoreDisplay.textContent = topScore
            }
        }
    }

    function resetBoard() {
        // Hide the trophy, show the grid
        document.querySelector('.grid').style.display = "grid"
        document.querySelector("#victory").style.display = "none"

        // Reset vars 
        cardsChosen = []
        cardsChosenId = []
        cardsWon = []
        guesses = 0

        // Giving those same elements content to display 
        resultDisplay.textContent = "Pairs: " + cardsWon.length / 2
        guessesDisplay.textContent = guesses
        topScoreDisplay.textContent = topScore

        // Turn all cards back over
        var cards = document.querySelectorAll('img')
        cards.forEach(card => {
            card.setAttribute('src', 'images/card_cover.png')
        })

        document.getElementById("trophy").setAttribute("src", "images/trophy.png")

    }

    makeBoard() 

})