


/*

fore each collecline
create a tmp object that will be the base
    retrive the id of the card
 */

let cardList = []; // this array will be populate by every card


// the total amount will be increment each time a card is added 

const addEddition = (cardObject, lineElement, cardIdEdition) => {

    let edition = {
        "editionReference": "ABCD",
        "edditionName": "blbl",
        "quantityInEdition": 1,
        "detailed": []
    }
    let cardIdNumber = cardObject.cardId.replace('collecline', '');
    // retrieve array with edition, reference and rarity
    let editionExtract = document.querySelector(`[id="collec${cardIdEdition[0]}"] [id="ed${cardIdEdition[0]}"] a`).innerText.split(" - ");
    //  "Deck de Structure : La Horde de Zombies - SR07-FR006 - Commune"
    let cardEditionExtractDetails = {
        editionName: editionExtract[0],
        cardReference: editionExtract[1],
        cardRarity: editionExtract[2]
    }

    edition.editionReference = cardEditionExtractDetails.cardReference.split('-')[0];
    edition.edditionName = cardEditionExtractDetails.editionName;
    edition.quantityInEdition = parseInt(lineElement.querySelector(`[id="enum${cardIdNumber}"]`).innerText);

    for (card of cardIdEdition) {
        let editionDetail = {
            "cardNumber": "ABCD-1",
            "language": "fra",
            "rarity": "common",
            "state": "played"
        }

        editionDetail.cardNumber = cardEditionExtractDetails.cardReference;
        editionDetail.language = document.querySelector(`[id="collec${card}"] .clangue`).selectedOptions[0].innerText;
        editionDetail.rarity = cardEditionExtractDetails.cardRarity;
        editionDetail.state = document.querySelector(`[id="collec${card}"] .cstate`).selectedOptions[0].innerText;

        // Add this edition into the list
        edition.detailed.push(editionDetail);
    }

    cardObject.edition.push(edition);

    return cardObject;
}


document.querySelectorAll('.collecline').forEach(colleclineElement => {
    let cardId = colleclineElement.id; // contains the id of the card and all occurence across editions
    let cardIdNumber = cardId.replace('collecline', '')
    let cardIdEdition = colleclineElement.querySelector(`input`).value.split("-") // array of values related to this edition
    let activeCard = cardList.find(card => card.cardId === cardId);

    // Check if the card is already inside the list
    if (activeCard === undefined) {

        activeCard = {
            "cardId": "123456",
            "category": "",
            "name": "blabla",
            "imageLink": "htt",
            "totalQuantity": 1,
            "edition": []
        };

        activeCard.cardId = cardId;
        activeCard.name = colleclineElement.querySelector(`td[colspan="5"] a`).innerText;
        activeCard.imageLink =  `http://www.otk-expert.fr/cartes/yugioh_ext/${document.querySelector(`[id=ed${cardIdEdition[0]}] input`).value}.jpg`;
        activeCard.totalQuantity = parseInt(colleclineElement.querySelector(`[id="enum${cardIdNumber}"]`).innerText);

        activeCard.category = colleclineElement.classList[1].replace('fond_', '');

        // Add the edition to the card
        activeCard = addEddition(activeCard, colleclineElement, cardIdEdition);

        // Update the card list
        cardList.push(activeCard);
    } else {
        let activeCardIndex = cardList.find(card => card.cardId === cardId);
        console.log(`already exist ${activeCard.name}`);
        activeCard.totalQuantity = activeCard.totalQuantity + parseInt(colleclineElement.querySelector(`[id="enum${cardIdNumber}"]`).innerText);

        // Add the edition to the card
        activeCard = addEddition(activeCard, colleclineElement, cardIdEdition);

        // Update the card list
        cardList[activeCardIndex] = activeCard;
    }

});

// turn the object into a string, in order to save it into a textarea 
let jsonData = JSON.stringify(cardList);
console.log(jsonData);

/**
 * Just to put all the content into the clipboard, for more flexibility
 */

// Create new element
let el = document.createElement('textarea');
// Set value (string to be copied)
el.value = jsonData;
// Set non-editable to avoid focus and move outside of view
el.setAttribute('readonly', '');
el.style = { position: 'absolute', left: '-9999px' };
document.body.appendChild(el);
// Select text inside element
el.select();
// Copy text to clipboard
document.execCommand('copy');
// Remove temporary element
document.body.removeChild(el);
