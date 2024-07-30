// ALBUM DI FOTOGRAFIE
// crea un account su pexels per ottenere API key
// esegui fetch su https://api.pexels.com/v1/search?query=INSERISCIQUERY
// crea card per ogni immagine

const pexelsURL = `https://api.pexels.com/v1/search?`;
const API_KEY = `qUy5SWmnbTdl8tMEeuXKN00gEjGfFfwdnfyeCV8aGH06pEZbLT30KfQP`;
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results-container");
const buttonsContainer = document.getElementById("buttons-container")

const getPexels = async (query = `query=sea`) => {
    try {
        const response = await fetch(pexelsURL + query, {
            headers: {
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        console.log(data);
        displayImages(data)
    } catch (error) {
        console.log(error);
    }
}

const searchImages = () => {
    if (searchInput.value !== "") {
        const query = `query=${searchInput.value}`;
        getPexels(query);
    }
}

const displayImages = async (data) => {
    resultsContainer.replaceChildren();
    data.photos.map(photo => createCard(photo));
    createButtons(data);
}

const createCard = (data) => {
    const col = document.createElement("div");
    col.setAttribute("class", "col");

    const card = document.createElement("div");
    card.setAttribute("class", "card h-100 border-0");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img h-100 object-fit-cover");
    img.src = data.src.large;
    img.alt = data.alt;

    card.appendChild(img);
    col.appendChild(card);
    resultsContainer.appendChild(col);
}

const createButtons = (data) => {
    buttonsContainer.replaceChildren();

    if (data.prev_page) {
        const prevButton = document.createElement("button");
        prevButton.setAttribute("class", "btn btn-secondary");
        prevButton.innerText = "Previous";
        prevButton.addEventListener("click", () => {
            getPexels(data.prev_page.replace(pexelsURL, ""));
        })
        buttonsContainer.appendChild(prevButton);
    }
    
    if (data.next_page) {
        const nextButton = document.createElement("button");
        nextButton.setAttribute("class", "btn btn-secondary");
        nextButton.innerText = "Next";
        nextButton.addEventListener("click", () => {
            getPexels(data.next_page.replace(pexelsURL, ""));
        })
        buttonsContainer.appendChild(nextButton);
    }
}

window.addEventListener("DOMContentLoaded", () => getPexels())