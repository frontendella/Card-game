let deckId;
const deck = document.getElementById("deck")
const draw = document.getElementById("draw")
const cards = document.getElementById("cards")
const winner = document.getElementById("winner-text")
const remaining = document.getElementById("remaining")
let computerScore = document.getElementById("computerScore")
let userScore = document.getElementById("userScore")
let computer_score = 0
let user_score = 0

async function handleClick() {
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
    deckId = data.deck_id
    remaining.textContent = `Remaining cards: ${data.remaining}`
    draw.disabled = false
}

deck.addEventListener('click', handleClick)

draw.addEventListener('click', async () => {
    let html = ''
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    for (let card of data.cards) {
        html +=
            `<img src="${card.image}" class="card"/>`
        cards.innerHTML = html
    }
    let card1Value = data.cards[0].value
    let card2Value = data.cards[1].value
    winner.textContent = cardToRank(card1Value, card2Value)
    remaining.textContent = `Remaining cards: ${data.remaining}`
    score(winner.textContent)
    if (data.remaining === 0) {
        draw.disabled = true
        computer_score > user_score ? winner.textContent = "The computer won a game!"
            : computer_score === user_score ? winner.textContent = "It's a tie"
                : winner.textContent = "You won a game!"
    }
})

function cardToRank(card1, card2) {

    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]


    let player1Rank = values.indexOf(card1)
    let player2Rank = values.indexOf(card2)

    if (player1Rank === player2Rank) {
        return "It's a tie"
    }
    else if (player1Rank > player2Rank) {
        return "A computer won!"

    }
    else {
        return "You won!"
    }
}

const score = (winner) => {
    if (winner === "A computer won!") {
        computer_score++
        computerScore.textContent = `Computer score: ${computer_score}`
    } else if (winner === "You won!") {
        user_score++
        userScore.textContent = `Your score: ${user_score}`
    }

}