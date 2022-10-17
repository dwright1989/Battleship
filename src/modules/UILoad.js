
import { findLastIndex } from 'lodash';
import Game from '../Game.js';
import GameBoard from './GameBoard.js';

export default class UILoad{

    /* 
    Load the initial page where player's enter their name
    */
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

    /*
    Check that the player has entered a name
    */
    static nameFormValidate(form){
        if(form.playerName.value!=null && form.playerName.value.trim()!=""){
            Game.initialisePlayer(form.playerName.value);
        }else{
            let errorDiv = document.getElementById("nameFormError");
            errorDiv.textContent="Name cannot be blank";
            errorDiv.style.visibility="visible";
        }
    }

    /*
    Load the page for players to select and place their ships
    */
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
            let gameBoardDiv = UILoad.generateShipSelectionDiv(player1);
            let shipsDiv = UILoad.generateShipsDiv(player1.gameBoard.ships);

            gridDiv.appendChild(gameBoardDiv);
            gridDiv.appendChild(shipsDiv);
            shipSelectionPage.appendChild(heading);
            shipSelectionPage.appendChild(playerName);
            shipSelectionPage.appendChild(gridDiv);
            content.appendChild(shipSelectionPage);
    }

    /*
    Load the blank board for players to place their ships
    */
    static generateShipSelectionDiv(player){
        let gameBoardDiv = document.createElement("div");
        gameBoardDiv.id = "boardDiv";
        for(let i=0; i<player.gameBoard.board.length; i++){
            let divSquare = document.createElement("div");
            divSquare.classList.add("board-square");
            divSquare.id="divSquare"+i;
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
                    Game.selectedShip=null;
                    if(startGame){
                        UILoad.loadGamePage(player);
                    }
                }
            });
            gameBoardDiv.appendChild(divSquare);
        }
        return gameBoardDiv;
    }

    /*
    Generate the UI for the ships that the player selects from to place at the start of the game
    */
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

    /*
    The ship that the player holds, ready to be placed
    */
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

    /*
    Load the game page (player and AI boards)
    */
    static loadGamePage(){
        Game.initialiseAI();
        let shipSelectionPage = document.getElementById("shipSelectionPage");
        shipSelectionPage.remove();
        let content = document.getElementById("content");
        let gamePage = document.createElement("div");
        gamePage.id = "gamePage";
        gamePage.classList.add("fade-in");

        let heading = document.createElement("h3");
        heading.textContent="Battleship";
        heading.classList.add("game-heading");

        let keyDiv = UILoad.loadKey();
        let playerBoardDiv = UILoad.loadPlayerBoard("Human");
        let AIBoardDiv = UILoad.loadPlayerBoard("AI");
        gamePage.appendChild(heading);
        
        gamePage.appendChild(keyDiv);
        gamePage.appendChild(playerBoardDiv);
        gamePage.appendChild(AIBoardDiv);
        
        content.appendChild(gamePage);
        Game.begin();
    }

    /*
    Key for Game page shows colours for hit, miss and sunk ships
    */
    static loadKey(){
        let keyDiv = document.createElement("div");
        keyDiv.id = "keyDiv";
        
        let hitSquare = document.createElement("div");
        hitSquare.classList.add("hit-square");
        hitSquare.classList.add("ship-square");
        let hitText = document.createElement("p");
        hitText.classList.add("key-text");
        hitText.textContent = "Hit";
        let shipSunkSquare = document.createElement("div");
        shipSunkSquare.classList.add("ship-sunk-square");
        shipSunkSquare.classList.add("ship-square");
        let shipSunkText = document.createElement("p");
        shipSunkText.classList.add("key-text");
        shipSunkText.textContent = "Ship Sunk";
        let missSquare = document.createElement("div");
        missSquare.classList.add("miss-square");
        missSquare.classList.add("ship-square");
        let missText = document.createElement("p");
        missText.classList.add("key-text");
        missText.textContent = "Miss";
        

        keyDiv.appendChild(hitSquare);
        keyDiv.appendChild(hitText);
        keyDiv.appendChild(shipSunkSquare);
        keyDiv.appendChild(shipSunkText);
        keyDiv.appendChild(missSquare);
        keyDiv.appendChild(missText);
        return keyDiv;
    }

    /*
    Load player or AI board depending on type passed
    */
    static loadPlayerBoard(type){
        let playerGameDiv = document.createElement("div");
        playerGameDiv.classList.add("player-game-div");
        let playerBoardDiv = document.createElement("div");
        playerBoardDiv.classList.add("player-board-div");
        let scoreDiv = document.createElement("div");
        scoreDiv.classList.add("score-div");
        scoreDiv.textContent = "Ships sunk: ";
        let nameDiv = document.createElement("p");
        nameDiv.classList.add("name");
        nameDiv.textContent = "Player: ";

        let player = "";
        if(type=="Human"){
            player = Game.player1;
            playerGameDiv.id="player1GameDiv";
        }else{
            player = Game.player2;
            playerGameDiv.id="player2GameDiv";
        }
        nameDiv.textContent += player.name;

        for(let i=0; i<player.gameBoard.board.length; i++){
            let divSquare = document.createElement("div");
            divSquare.classList.add("board-square");
            divSquare.id="divSquare"+i;
            if(player.gameBoard.board[i].hasShip!=false){
                divSquare.classList.add("placed-ship");
            }
            playerBoardDiv.appendChild(divSquare);

            if(type=="AI"){
                divSquare.addEventListener("click", function(){
                    if(Game.player1.turn){
                        Game.player1.takeShot(i);
                    }
                },{once:true});
            }
        }


        playerGameDiv.appendChild(nameDiv);
        playerGameDiv.appendChild(playerBoardDiv);
        playerGameDiv.appendChild(scoreDiv);

        return playerGameDiv;
    }

}