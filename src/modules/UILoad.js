
export default class UILoad{

    static loadIntroPage(){
        let content = document.getElementById("content");
        let introDiv = document.createElement("div");
        introDiv.id = "introPage";

        let heading = document.createElement("h1");
        heading.textContent = "Battleship";

        let formValidationError = document.createElement("div");
        formValidationError.id="nameFormError";
        formValidationError.classList.add("error");
        formValidationError.textContent="Errors will appear here";

        let form = document.createElement("form");
        form.id="playerNameForm";
        let nameLabel = document.createElement("label");
        nameLabel.for = "playerNameInput";
        nameLabel.textContent = "Player Name";

        let nameInput = document.createElement("input");
        nameInput.type="text";
        nameInput.id="playerNameInput";
        nameInput.name="playerNameInput";

        let submitButton = document.createElement("button");
        submitButton.type="submit";
        submitButton.value="submit";
        submitButton.textContent="Start";
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(submitButton);

        form.addEventListener('submit', function(event){
            event.preventDefault();
            UILoad.nameFormValidate(form);
        });

        introDiv.appendChild(heading);
        introDiv.appendChild(formValidationError);
        introDiv.appendChild(form);
        content.appendChild(introDiv);
        
    }

    static nameFormValidate(form){
        if(form.playerName.value!=null && form.playerName.value.trim()!=""){
            this.loadShipSelectionPage(form.playerName.value);
        }else{
            let errorDiv = document.getElementById("nameFormError");
            errorDiv.textContent="Name cannot be blank";
            errorDiv.style.visibility="visible";
        }
    }

    static loadShipSelectionPage(name){
        console.log("loading the ship selection page for: " + name);

        // game.js create a new player and assign the name
        
    }



}