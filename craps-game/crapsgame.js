 // HTML
 const crapsUsernameInput = "craps-username-input"
 const crapsRegisterPane = "craps-registration-pane"
 const crapsMainSection = " craps-main-section"
 function RegisterCrapPlayer() {
        let crapsUsername = document.getElementById("craps-username-input").value
        alert("Got: " + crapsUsername)
        removeRegistrationPane()
        showMainGamesection()
    }

    function removeRegistrationPane () {
        document.getElementById("craps-registration-pane").style.display = "none"
    }

    function showMainGamesection() {
        document.getElementById("craps-main-section").style.display = "Block"
    }