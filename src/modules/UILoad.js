
import Game from '../Game.js';

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
        nameLabel.for = "playerName";
        nameLabel.textContent = "Player Name";

        let nameInput = document.createElement("input");
        nameInput.type="text";
        nameInput.id="playerNameInput";
        nameInput.name="playerName";

        let submitButton = document.createElement("button");
        submitButton.type="submit";
        submitButton.value="submit";
        submitButton.textContent="Start";
        submitButton.id="startButton";
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
            Game.initialisePlayer(form.playerName.value);
        }else{
            let errorDiv = document.getElementById("nameFormError");
            errorDiv.textContent="Name cannot be blank";
            errorDiv.style.visibility="visible";
        }
    }

    static loadShipSelectionPage(player1){
            let introPage = document.getElementById("introPage");
            introPage.remove();
            let content = document.getElementById("content");
            let shipSelectionPage = document.createElement("div");
            shipSelectionPage.id = "shipSelectionPage";
            let heading = document.createElement("h3");
            heading.textContent="Battleship";
            let playerName = document.createElement("h5");
            playerName.textContent = player1.name;

            let gridDiv = document.createElement("div");
            gridDiv.id = "gridDiv";
            let gameBoardDiv = UILoad.generateGameBoardDiv(player1.gameBoard);
            let shipsDiv = UILoad.generateShipsDiv(player1.gameBoard.ships);

            gridDiv.appendChild(gameBoardDiv);
            gridDiv.appendChild(shipsDiv);
            shipSelectionPage.appendChild(heading);
            shipSelectionPage.appendChild(playerName);
            shipSelectionPage.appendChild(gridDiv);
            content.appendChild(shipSelectionPage);
            // display ships to place
    }

    static generateGameBoardDiv(gameBoardData){
        let gameBoardDiv = document.createElement("div");
        gameBoardDiv.id = "boardDiv";
        for(let i=0; i<gameBoardData.board.length; i++){
            let divSquare = document.createElement("div");
            divSquare.classList.add("board-square");
            divSquare.id="divSquare"+i;
            divSquare.addEventListener("mouseenter", function(){
                let selectedShip = Game.selectedShip;
                if(selectedShip!=null){
                    let maxPlacement = 10-selectedShip.length;
                    let currentSquare = i;
                    if(Number(String(currentSquare).slice(-1))<=maxPlacement){
                        // add hover effect to this square
                         divSquare.classList.add("hover");
                        let partnerNumber = currentSquare+1;
                        // also add hover effect to the squares ship.length
                        for(let j=0; j<selectedShip.length-1; j++){
                            let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                            partnerSquare.classList.add("hover");
                            partnerNumber++;
                        }
                    }
                    
                }
            });
            divSquare.addEventListener("mouseleave", function(){
                if(Game.selectedShip!=null){
                    // add hover effect to this square
                    divSquare.classList.remove("hover");
                    let partnerNumber = i+1;
                    // also add hover effect to the squares ship.length
                    for(let j=0; j<Game.selectedShip.length-1; j++){
                        let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                        partnerSquare.classList.remove("hover");
                        partnerNumber++;
                    }
                }
            });
            gameBoardDiv.appendChild(divSquare);
        }
        return gameBoardDiv;
    }

    static generateShipsDiv(ships){
        let shipsDiv = document.createElement("div");
        shipsDiv.id = "shipsDiv";
        let axisButton = document.createElement("button");
        axisButton.id = "axisButton";
        axisButton.textContent = "Horizontal";
        axisButton.disabled = true;
        axisButton.classList.add("disabled");
        shipsDiv.appendChild(axisButton);

        for(let i=0; i<ships.length; i++){
            let shipDiv = document.createElement("div");
            shipDiv.classList.add("shipDiv");
            shipDiv.id="shipDiv"+i;
            let shipTitle = document.createElement("div");
            shipTitle.classList.add("ship-title");
            shipTitle.textContent = ships[i].name.toUpperCase();
            let ship = document.createElement("div");
            ship.classList.add("ship");
            ship.id = ships[i].name;
            for(let j=0; j<ships[i].length; j++){
                let shipSegment = document.createElement("div");
                shipSegment.classList.add("ship-segment");
                ship.appendChild(shipSegment);
            }
            ship.addEventListener("click", function(){
                Game.setSelectedShip(ships[i]);
                axisButton.disabled = false;
                axisButton.classList.remove("disabled");
            });
            shipDiv.appendChild(shipTitle);
            shipDiv.appendChild(ship);
            shipsDiv.appendChild(shipDiv);
        }

        return shipsDiv;
    }

    static updateSelectedShipStyle(ship){
        let ships = Game.player1.gameBoard.ships;
        // make sure all other ships are inactive
        ships.forEach(ship=>{
            let shipNodes = document.getElementById(ship.name).childNodes;
            shipNodes.forEach(shipNode=>{
                shipNode.classList.remove("selected-ship");
            });
        });

        // make the selected ship active
        let shipNodes = document.getElementById(ship.name).childNodes;
        shipNodes.forEach(shipNode=>{
                    shipNode.classList.add("selected-ship");
        });

    }


}