
import Game from '../Game.js';
import GameBoard from './GameBoard.js';

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
            gridDiv.classList.add("fade-in");
            let gameBoardDiv = UILoad.generateGameBoardDiv(player1);
            let shipsDiv = UILoad.generateShipsDiv(player1.gameBoard.ships);

            gridDiv.appendChild(gameBoardDiv);
            gridDiv.appendChild(shipsDiv);
            shipSelectionPage.appendChild(heading);
            shipSelectionPage.appendChild(playerName);
            shipSelectionPage.appendChild(gridDiv);
            content.appendChild(shipSelectionPage);
    }

    static generateGameBoardDiv(player){
        let gameBoardDiv = document.createElement("div");
        gameBoardDiv.id = "boardDiv";
        for(let i=0; i<player.gameBoard.board.length; i++){
            let divSquare = document.createElement("div");
            divSquare.classList.add("board-square");
            divSquare.id="divSquare"+i;
            divSquare.textContent = i;
            divSquare.addEventListener("mouseenter", function(){
                if(Game.selectedShip!=null){
                    let currentSquare = i;
                    let place = player.gameBoard.canPlaceShipHere(currentSquare, Game.selectedShip, Game.shipAxis);         
                    if(place){
                        // Code to show hover on appropriate squares
                        divSquare.classList.add("hover");
                        if(Game.shipAxis=="Vertical"){
                            let partnerNumber = currentSquare+10;
                            for(let j=0; j<Game.selectedShip.length-1; j++){
                                let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                                partnerSquare.classList.add("hover");
                                partnerNumber+=10;
                            }
                        }else{
                            let partnerNumber = currentSquare+1;
                            for(let j=0; j<Game.selectedShip.length-1; j++){
                                let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                                partnerSquare.classList.add("hover");
                                partnerNumber++;
                            }
                        }
                                                

                    }
                }
            
            });
            divSquare.addEventListener("mouseleave", function(){
                if(Game.selectedShip!=null){
                    // add hover effect to this square
                    divSquare.classList.remove("hover");
                    if(Game.shipAxis=="Vertical"){
                        let partnerNumber = i+10;
                        // also add hover effect to the squares ship.length
                        for(let j=0; j<Game.selectedShip.length-1; j++){
                            let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                            partnerSquare.classList.remove("hover");
                            partnerNumber+=10;
                        }
                    }else{
                        let partnerNumber = i+1;
                        // also add hover effect to the squares ship.length
                        for(let j=0; j<Game.selectedShip.length-1; j++){
                            let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                            partnerSquare.classList.remove("hover");
                            partnerNumber++;
                        }
                    }
                   
                }
            });

            divSquare.addEventListener("click", function(){
                if(Game.selectedShip!=null && player.gameBoard.canPlaceShipHere(i, Game.selectedShip, Game.shipAxis)){
                    let coords = [i];
                    let currentSquare = i;
                    divSquare.classList.add("placed-ship");
                    UILoad.updatePlacedShipStyle(Game.selectedShip);
                    if(Game.shipAxis=="Vertical"){
                        let partnerNumber = currentSquare+10;
                        for(let j=0; j<Game.selectedShip.length-1; j++){
                            let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                            partnerSquare.classList.add("placed-ship");
                            coords.push(partnerNumber);
                            partnerNumber+=10;
                        }
                    }else{
                        let partnerNumber = currentSquare+1;
                        for(let j=0; j<Game.selectedShip.length-1; j++){
                            let partnerSquare = document.getElementById("divSquare"+partnerNumber);
                            partnerSquare.classList.add("placed-ship");
                            coords.push(partnerNumber);
                            partnerNumber++;
                        }
                    }
                    let startGame = player.gameBoard.placeShip(Game.selectedShip, coords);
                    if(startGame){
                        UILoad.loadGamePage(player);
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

        axisButton.addEventListener("click", function(){
            if(axisButton.textContent=="Horizontal"){
                axisButton.textContent="Vertical";
            }else{
                axisButton.textContent="Horizontal"
            }
            Game.setShipAxis(axisButton.textContent);
        });

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
                shipSegment.addEventListener("click", function myClick(){
                    Game.setSelectedShip(ships[i]);
                    axisButton.disabled = false;
                    axisButton.classList.remove("disabled");
                });
                ship.appendChild(shipSegment);
            }
            
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

    /*
    This ship has been placed.  Update the style and remove event listeners
    */
    static updatePlacedShipStyle(ship){
        // make the selected ship active
        let shipNodes = document.getElementById(ship.name).childNodes;
        shipNodes.forEach(shipNode=>{
                    shipNode.classList.add("placed-ship");
                    shipNode.classList.remove("selected-ship");
                    shipNode.replaceWith(shipNode.cloneNode(true));
        });
        
    }

    static loadGamePage(player){
        let shipSelectionPage = document.getElementById("shipSelectionPage");
        shipSelectionPage.remove();
        let content = document.getElementById("content");
        let gamePage = document.createElement("div");
        gamePage.id = "gamePage";
        gamePage.classList.add("fade-in");

        gamePage.textContent = JSON.stringify(player.gameBoard);
        content.appendChild(gamePage);
    }

}