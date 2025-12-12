 // HTML
 const crapsUsernameInput = "craps-username-input"
 const crapsRegisterPane = "craps-registration-pane"
 const crapsMainSection = " craps-main-section"

 function RegisterCrapPlayer() {
        let crapsUsername = document.getElementById("craps-username-input").value
        alert("Got: " + crapsUsername)

        //vALIDATION FAIL
        let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
        if (crapsUsername.length < 5|| firstCharIsDigitRegex.test(crapsUsername)) {
            alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number")
        } else {
            removeRegistrationPane()
            showMainGamesection()
        }

    }

    function removeRegistrationPane () {
        document.getElementById("craps-registration-pane").style.display = "none"
    }

    function showMainGamesection () {
        document.getElementById("craps-main-section").style.display = "Block"
    }