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
            battlea(selectedValueJ1,selectedValueJ2)// Démarre la bataille lorsque les deux joueurs ont sélectionné leur champion
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



function battlea(champBattleJ1,champBattleJ2){
    console.log(champBattleJ1)
    console.log(champBattleJ2)
    //const player1=documeny.getElementById("player1");
    //const player2=documeny.getElementById("player2");
    var champBattleJ1Obj = JSON.parse(champBattleJ1);
   console.log(champBattleJ1Obj.champName)

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



