var cardId = document.querySelector('.collecline').id; // contains the id of the card and all occurence across editions
var cardIdNumber = cardId.replace('collecline','')

var cardIdEdition = document.querySelector(`[id="${cardId}"] input`).value.split("-") // array of values related to this edition


// Remove unwanted collumn
document.querySelectorAll('td.cfleche').forEach(e => {e.closest('td').remove();});
document.querySelectorAll('.inlinecardy').forEach(e => {e.remove()});
document.querySelectorAll('td .csell').forEach(e => {e.closest('td').remove();});
document.querySelectorAll('td .ctrade').forEach(e => {e.closest('td').remove();});
document.querySelectorAll('td .cprice').forEach(e => {e.closest('td').remove();});
document.querySelectorAll('td .csticky').forEach(e => {e.closest('td').remove();});
document.querySelectorAll('[alt="Dupliquer"]').forEach(e => {e.closest('td').remove();});
document.querySelectorAll(`.tabcard a img[alt="visu"]`).forEach(e => {e.closest('span.tabcard').remove();});

// replace the image
// document.querySelector(`[id:"collec${cardIdNumber}"] .inlinecardy img`).src = document.querySelector(`[id="${cardId}"] .inlinecardy img`).src; //replace it

// unhide the picture
document.querySelector('.collecline .inlinecardy').style.display = 'block';






// in the loop

var cardId = document.querySelector('.collecline').id; // contains the id of the card and all occurence across editions
var cardIdNumber = cardId.replace('collecline', '')

var cardIdEdition = document.querySelector(`[id="${cardId}"] input`).value.split("-") // array of values related to this edition


// get the name
document.querySelector(`.collecline td[colspan="5"] a`).innerText

// get the image path
document.querySelector(`[id="${cardId}"] .inlinecardy img`).src;

// get amount in this edition
parseInt(document.querySelector(`.collecline [id="enum${cardIdNumber}"]`).innerText)

var activeCardIdEdition = cardIdEdition[0];
// get the edition details
// retrieve array with edition, reference and rarity
var editionExtract = document.querySelector(`[id="collec${cardIdEdition}"] [id="ed${cardIdEdition}"] a`).innerText.split(" - ");
//  "Deck de Structure : La Horde de Zombies - SR07-FR006 - Commune"
var cardEditionDetails = {
    editionName: editionExtract[0],
    cardReference: editionExtract[1],
    cardRarity: editionExtract[2]
}

// get the card state
document.querySelector(`[id="collec${activeCardIdEdition}"] .cstate`).selectedOptions[0].innerText;

// get the card language
document.querySelector(`[id="collec${cardIdEdition[0]}"] .clangue`).selectedOptions[0].innerText

