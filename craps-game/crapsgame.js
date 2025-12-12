// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const startingMoney = 1000
const startingRounds = 0

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegisterPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"

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

function showMainGamesection () {
    document.getElementById(crapsMainSection).style.display = "Block"
}

function setupFirstRound () {
    document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
    setMoney(startingMoney)
    setRound(startingRounds)
}

function setMoney (money) {
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRound (round) {
    document.getElementById(crapsStatsRounds).innerHTML = round
}