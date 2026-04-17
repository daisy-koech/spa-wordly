document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const input = document.getElementById("input").value.trim();
        const errorMessage = document.getElementById("error-message");

        //check if input field is empty
        if(!input) {
            errorMessage.textContent = "Enter a word";
            return;
        }
        console.log(input);
        //clear the error if input is valid
        errorMessage.textContent = "";

    //API url using user input
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
    fetch(url)
    .then(response => response.json())
    .then(word => {
        //in case of invalid word search
        if (word.title === "No Definitions Found") {
            errorMessage.textContent = "No word found";
            return;
        }
        displayWordDetails(word);
    })
    .catch(error => console.error("Error fetching data", error))


    function displayWordDetails(word) {
        const wordDetails = document.getElementById("word-details");
        //clear previous results
        wordDetails.innerHTML = "";

        //get the first entry from the API response
        const entry = word[0];
        //get the first meaning
        const meaning = entry.meanings[0];
        //get definition value from the definition object
        const definitionObject = meaning.definitions[0];

        const definition = definitionObject.definition;
        const pronunciation = entry.phonetic || entry.phonetics[0].text || "Unavailable";
        const synonym = meaning.synonyms.join(", ") || "Unavailable";

        //new list to display results
        const el = document.createElement("li");
        el.innerHTML = `
        <p>Pronunciation: ${pronunciation}</p>
        <p>Definition: ${definition}</p>
        <p>Synonym: ${synonym}</p>
        `;

        wordDetails.appendChild(el);
    }

    });
});

