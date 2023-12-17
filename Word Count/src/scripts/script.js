const input_text = document.getElementById("input-text");
const characters = document.getElementById("characters");
const charWithoutSpace = document.getElementById("characterWithoutSpace");
const sentence = document.getElementById("sentence");
const paragraphs = document.getElementById("paragraphs");
const words = document.getElementById("words");

input_text.addEventListener("input", () => {
    let text = input_text.value;
    input_text.value = text;
    characters.innerText = text.length;
    charWithoutSpace.innerText = charactersWithoutSpace(text);
    paragraphs.innerText = countParagraph(text);
    sentence.innerText = countSentence(text);
    words.innerText = countWord(text);
})

function charactersWithoutSpace(input) {
    let regex = /[^\s]/g;
    if (input.match(regex) != null) {
        return input.match(regex).length;
    }
    return 0;
}

function countSentence(input) {
    let regex = /[A-Z](.|\n)+?[.?!]/g;
    if (input.match(regex) != null) {
        return input.match(regex).length;
    }
    return 0;
}

function countParagraph(input) {
    let regex = /[A-Z](.|\n)+?[.?!](\n|$)/g;
    if (input.trim().match(regex) != null) {
        return input.match(regex).length;
    }
    return 0;
}

function countWord(input) {
    let regex = /(?![0-9])\w{1,}/g;
    if (input.match(regex) != null) {
        return input.match(regex).length;
    }
    return 0;
}