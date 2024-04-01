const gameBtn = document.getElementById("gameBtn");

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const gameNameValue = "1";
const gameName = document.getElementById("gameName");


function creatImg(srcImg, altImg, classImg, idImg, parentImg) {
    // Création de l'élément img
    var img = document.createElement('img');
    //attribure
    var imgAttributes = [
        { name: 'alt', value: `${altImg}` },
        { name: 'src', value: `${srcImg}` },
        { name: 'id', value: `${idImg}` },
        { name: 'class', value: `${classImg}` }
    ];
    //setAttributes
    imgAttributes.forEach(function (attribute) {
        img.setAttribute(attribute.name, attribute.value);
    });

    parentImg.appendChild(img);
}

const gameLogo = document.getElementById("homePageGameLogo");

const homePage = document.getElementById("homePage");
const champSelectPage = document.getElementById("champSelectPage");
const battlePage = document.getElementById("battlePage");
const endBattlePage = document.getElementById("endBattlePage");



function start() {
    creatImg(
        srcImg = "img/gameLogo.png",
        altImg = "gameLogo",
        classImg = "gameLogo",
        idImg = "gameLogoHomePage",
        parentImg = gameLogo
    )

    battlePage.setAttribute("class", "displayNone");
    endBattlePage.setAttribute("class", "displayNone");
    champSelectPage.setAttribute("class", "displayNone");
    homePage.removeAttribute("class");
}
start()

function startGameChampSelect() {
    homePage.setAttribute("class", "displayNone");
    champSelectPage.removeAttribute("class");
    battlePage.setAttribute("class", "displayNone");
    endBattlePage.setAttribute("class", "displayNone");
}



const homePageStartBtn = document.getElementById("homePageStartBtn");


homePageStartBtn.addEventListener('click', startGameChampSelect)



let allData;
fetch('data.json')
    .then(response => response.json())
    .then(data => {

        allData = data
        champSelect()
    })



const champList = document.getElementById("champList");

function creatChampSelectCard(champCardId, champCardClass, champCardName, value) {
    const champSelectCard = document.createElement('input');


    var champSelectCardAttributes = [
        { name: 'id', value: `input${champCardId}` },
        { name: 'class', value: `input${champCardClass}` },
        { name: 'type', value: `radio` },
        { name: 'value', value: `${value}` },
        { name: 'name', value: `champCardJ1` }
    ];

    champSelectCardAttributes.forEach(function (attribute) {
        champSelectCard.setAttribute(attribute.name, attribute.value);
    });
    const labelSelectCard = document.createElement('label');

    var labelSelectCardAttributes = [
        { name: 'id', value: `label${champCardId}` },
        { name: 'class', value: `champSelectCard` },
        { name: 'for', value: `input${champCardId}` }
    ];

    labelSelectCardAttributes.forEach(function (attribute) {
        labelSelectCard.setAttribute(attribute.name, attribute.value);
    });
    champList.appendChild(champSelectCard);
    champList.appendChild(labelSelectCard);

}


function champSelect() {
    let champsData = allData.champs;


    let i = 1
    console.log(i);
    Object.values(champsData).forEach(champ => {

        console.log(i);

        creatChampSelectCard(
            champCardId = champ.champName,
            champCardClass = "champSelectCard",
            champCardName = champ.champName,
            value = `{
                    "champName": "${champ.champName}",
                    "champPv": ${champ.champPv},
                    "champAttack": ${champ.champAttack},
                    "champImg": "${champ.champImg}"
                }
                `
        );

        const labelSelectCard = document.getElementById(`label${champ.champName}`);

        creatImg(
            srcImg = champ.champImg,
            altImg = champ.champName,
            classImg = "champSelectCardImg",
            idImg = champ.champName,
            parentImg = labelSelectCard,
        );

    });

}
function startGameBattle() {
    homePage.setAttribute("class", "displayNone");
    champSelectPage.setAttribute("class", "displayNone");
    battlePage.removeAttribute("class");
    endBattlePage.setAttribute("class", "displayNone");
}
const champSelectBtnJ1 = document.getElementById("champSelectBtnJ1");
const champSelectBtnJ2 = document.getElementById("champSelectBtnJ2");

champSelectBtnJ2.classList.add("displayNone");

function getChampion(player) {
    // Obtenir tous les éléments radio avec le nom "champCardJ1"
    var radios = document.getElementsByName('champCardJ1');

    var selectedValue = null;

    // Parcourir les éléments radio pour trouver celui qui est sélectionné
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }

    // Vérifier si une option a été sélectionnée
    if (selectedValue !== null) {
        console.log( selectedValue);
        champSelectBtnJ1.disabled = true;
        champSelectBtnJ1.classList.add("displayNone");
        champSelectBtnJ2.classList.remove("displayNone");

        if (player === 1) {
            // Code spécifique au joueur 1
            selectedValueJ1 = selectedValue;
        } else {
            // Code spécifique au joueur 2
            selectedValueJ2 = selectedValue;
            startGameBattle(); 
            createBattlePage(selectedValueJ1,selectedValueJ2);
            attack(selectedValueJ1,selectedValueJ2);// Démarre la bataille lorsque les deux joueurs ont sélectionné leur champion
            
        }

    } else {
        console.log('No option selected for Player ' + player);
    }
    
}

champSelectBtnJ1.addEventListener("click", function() {
    getChampion(1);
});

champSelectBtnJ2.addEventListener("click", function() {
    getChampion(2);
    
});


function creatBattlePage(playerName,playerChamp){
    homePage.setAttribute("class", "displayNone");
    champSelectPage.setAttribute("class", "displayNone");
    battlePage.setAttribute("class", "displayNone");
    endBattlePage.removeAttribute("class");
    const winChampImg=document.getElementById("winChampImg")
    const winChampName=document.getElementById("winChampName")
    winChampName.textContent = `${playerName} a gagner`;

    creatImg(
        srcImg= playerChampImg,
         altImg= playerName,
          classImg= "player",
           idImg= playerName,
            parentImg= winChampImg
            )

}



function attack(champBattleJ1, champBattleJ2) {
    const champBattleJ1Attack = JSON.parse(champBattleJ1);
    const champBattleJ2Attack = JSON.parse(champBattleJ2);
    let ingameJ1Pv = champBattleJ1Attack.champPv;
    let ingameJ2Pv = champBattleJ2Attack.champPv;
    let ingameJ1Attack = champBattleJ1Attack.champAttack;
    let ingameJ2Attack = champBattleJ2Attack.champAttack;
    const ingameJ1Img= champBattleJ1Attack.champImg
    const ingameJ2Img= champBattleJ2Attack.champImg
    const player1Pv = document.getElementById("player1Pv");
    const player2Pv = document.getElementById("player2Pv");
    const player1Attack=document.getElementById("player1Attack")
    const player2Attack=document.getElementById("player2Attack")
    const player1=document.getElementById("player1")
    const player2=document.getElementById("player2")
    function performAttackJ1() {
        ingameJ1Attack = creatRadomNbr(ingameJ1Attack, 3);
        ingameJ2Pv -= ingameJ1Attack;
        console.log("Attaque de J1   J1Attack  " + ingameJ1Attack + "   J2Pv  " + ingameJ2Pv);
        player1Attack.textContent = `player1 Attack = ${ingameJ1Attack}`;
        player2Pv.textContent = `player2 Pv = ${ingameJ2Pv}`;
        player2.classList.remove("imageShakeAttackJ2")
        player1.classList.add("imageShakeAttackJ1")
        player1.classList.remove("imageShake")
        player2.classList.add("imageShake")
        

        if (ingameJ2Pv <= 0) {
            console.log("J1 a gagné !");
           creatBattlePage(playerName = "J1",playerChampImg = ingameJ2Img)
           player1.classList.add("win")
            return "J1";
        }
        setTimeout(performAttackJ2, 2000); // Déclenche l'attaque du joueur 2 après 1 seconde
    }
    
    function performAttackJ2() {
        player1.classList.remove("imageShakeAttackJ1")
        player2.classList.add("imageShakeAttackJ2")
        player2.classList.remove("imageShake")
        player1.classList.add("imageShake")
        ingameJ2Attack = creatRadomNbr(ingameJ2Attack, 3);
        ingameJ1Pv -= ingameJ2Attack;
        console.log("Attaque de J2   J2Attack  " + ingameJ2Attack + "   J1Pv  " + ingameJ1Pv);
        player2Attack.textContent = `player2 Attack = ${ingameJ2Attack}`;
        player1Pv.textContent = `player1 Pv = ${ingameJ1Pv}`;
        if (ingameJ1Pv <= 0) {
            console.log("J2 a gagné !");
            creatBattlePage(playerName = "J2",playerChampImg = ingameJ2Img)
            return "J2";
        }
        setTimeout(performAttackJ1, 2000); // Déclenche l'attaque du joueur 1 après 1 seconde
    }

    // Lance la première attaque du joueur 1
    setTimeout(performAttackJ1, 2000);
}
// <   >
function createBattlePage(champBattleJ1, champBattleJ2) {
    const champBattleJ1Obj = JSON.parse(champBattleJ1);
    const champBattleJ2Obj = JSON.parse(champBattleJ2);

    // Affichage des images et des noms des joueurs
    addBattlePage(champBattleJ1Obj, "player1", "champImgJ1", "player1Pv", "player1Name");
    addBattlePage(champBattleJ2Obj, "player2", "champImgJ2", "player2Pv", "player2Name");
}

function addBattlePage(champObj, playerId, imgId, pvId, nameId) {
    const player = document.getElementById(playerId);
    const champImg = document.createElement("img");
    champImg.src = champObj.champImg;
    champImg.alt = champObj.champName;
    champImg.className = "champImgBattlePage";
    champImg.id = imgId;
    player.appendChild(champImg);
    document.getElementById(pvId).innerHTML = `${playerId} Pv = ${champObj.champPv}`;
    document.getElementById(nameId).innerHTML = champObj.champName;
    player.classList.add("class","rvzevvz","evzevze")
}





function selectItem(items, itemClass) {
    items.forEach(image => {
        image.addEventListener('click', () => {
            const champSelectJ2 = document.querySelector(`.${itemClass}`);
            if (champSelectJ2) {
                champSelectJ2.classList.remove(`${itemClass}`);
            }
            image.parentElement.classList.add(`${itemClass}`);
        });
    });
}




function creatRadomNbr(max, min) {
    let radomNbr = Math.floor(Math.random() * (max - min + 1)) + min;
    return radomNbr
}



