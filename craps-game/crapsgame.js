// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD"
}
const mininumBet = 100

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegisterPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container"
const crapsBettingGripContainer = "craps-betting-grid-container"
const crapsRoundFinishGridContainer = "craps-round-finish-grid-container"
const crapsRoundFinishMessage = "craps-round-finish-message"

// In-game variables
let currentRounds = startingRounds
let currentMoney = startingMoney
let currentBet = bets.even
let currentBetAmount = mininumBet
let canChangeBet = true

function RegisterCrapPlayer() {
    crapsUsername = document.getElementById(crapsUsernameInput).value

    //USERNAME  VALIDATION FAIL
    let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
    if (crapsUsername.length < 5|| firstCharIsDigitRegex.test(crapsUsername)) {
        alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number")
    } else {
        removeRegistrationPane()
        showMainGamesection()
        setupFirstRound()
    }
}

function removeRegistrationPane () {
    document.getElementById(crapsRegisterPane).style.display = "none"
}

function showRegistrationPane () {
    document.getElementById(crapsRegisterPane).style.display = "block"
}

function showMainGamesection () {
    document.getElementById(crapsMainSection).style.display = "block"
}

function hideMainGamesection () {
    document.getElementById(crapsMainSection).style.display = "none"
}

function setupFirstRound () {
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "none"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "none"
    document.getElementById(crapsRollDiceButton).style.display = "block"
    document.getElementById(crapsBettingGripContainer).style.display = "block"
    document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
    setMoney(startingMoney)
    setRound(startingRounds)
    betEven()
    setBetAmount(mininumBet)
}

function setMoney (money) {
    currentMoney = money
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRound (round) {
    currentRounds = round
    document.getElementById(crapsStatsRounds).innerHTML = round
}

function betEven () {
    chooseBet(bets.even)
}

function betOdd () {
    chooseBet(bets.odd)
}

function chooseBet (bet) {
    if (canChangeBet) {
        currentBet = bet
        document.getElementById(bet).style.backgroundColor = "red"
        const deselectBet = bet == bets.even ? bets.odd : bets.even
        document.getElementById(deselectBet).style.backgroundColor = "transparent"
    }
}

function increaseBet () {
    setBetAmount(Math.min(currentBetAmount + mininumBet, currentMoney))
}

function decreaseBet () {
    setBetAmount(Math.max(currentBetAmount - mininumBet, mininumBet))
}

function setBetAmount (betAmount) {
    if (canChangeBet) {
        currentBetAmount = betAmount
        document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
    }
}

function rollDice () {
    canChangeBet = false
    formatDiceScale()
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "block"
    document.getElementById(crapsRollDiceButton).style.display = "none"
    const diceRollElement = document.getElementById(crapsRollDiceAnimationContainer)
    rollADie({ element: diceRollElement, numberOfDice: 2, callback: delayedProcessDiceResult, delay: 1000000});
}

window.addEventListener("resize", formatDiceScale)
function formatDiceScale () {
    const vw = window.innerWidth * 80
    const vh = window.innerHeight * 0.8
    const widthScale = Math.min(700, vw, vh)
    const heightScale = widthScale * 0.714
    const scale = heightScale / 391.272
    document.getElementById(crapsRollDiceAnimationContainer).style.transform = "scale(" + scale + ")"
}

function delayedProcessDiceResult (diceResult) {
    setTimeout(function() { processDiceResult(diceResult); }, 1800)
}

function processDiceResult (diceResult) {
    const sum = diceResult.reduce((partialSum, a) => partialSum + a, 0)
    let diceSumResult = bets.even
    if (sum % 2 === 1) {
        diceSumResult = bets.odd
    } 
    setRound(currentRounds + 1)
    let roundFinishMessage = ""
    if (diceSumResult === currentBet) {
        roundFinishMessage = "YOU WIN!"
        setMoney(currentMoney + currentBetAmount)
    } else {
        roundFinishMessage = "YOU LOSE :("
        setMoney(currentMoney - currentBetAmount)
    }
    if (currentMoney === 0) {
        roundFinishMessage = "YOU'RE OUT!"
    }
    document.getElementById(crapsBettingGripContainer).style.display = "none"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "block"
    document.getElementById(crapsRoundFinishMessage).innerHTML = roundFinishMessage
}

function exitGame () {
    alert("After playing" + currentRounds + " rounds, you leave with " + currentMoney + "$")
    hideMainGamesection()
    showRegistrationPane()
    document.getElementById(crapsUsernameInput).value = ""
}