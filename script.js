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

const fetchPexels = async (url, query) => {
    try {
        const fullUrl = query ? `${url}${query}` : url;
        const response = await fetch(fullUrl, {
            headers: {
                Authorization: API_KEY
            }
        })
        const data = await response.json();
        console.log(data);
        displayImages(data);
        toggleButtons(data);
    } catch (error) {
        console.log(error);
    }
}

const searchImages = () => {
    if (searchInput.value !== "") {
        const query = `query=${searchInput.value}`;
        fetchPexels(pexelsURL, query);
    }
}

const displayImages = async (data) => {
    resultsContainer.replaceChildren();
    data.photos.map(photo => createCard(photo));
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

    card.addEventListener("click", () => displayModal(data));
}

const handlePages = (pageUrl) => {
    return () => {
        if (pageUrl) {
            fetchPexels(pageUrl);
        };
    };
}

const toggleButtons = (data) => {
    if (data.prev_page) {
        document.getElementById("prevButton").disabled = false;
        document.getElementById("prevButton").onclick = handlePages(data.prev_page);
    } else {
        document.getElementById("prevButton").disabled = true;
    }
    
    if (data.next_page) {
        document.getElementById("nextButton").classList.disabled = false;
        document.getElementById("nextButton").onclick = handlePages(data.next_page);
    } else {
        document.getElementById("nextButton").disabled = true;
    }
}

const displayModal = (data) => {
    const picModal = new bootstrap.Modal(document.getElementById('picModal'));
    document.querySelector("#picModal .modal-content").style.backgroundColor = data.avg_color;
    document.querySelector("#picModal img").src = data.src.large2x;
    document.querySelector("#picModal img").alt = data.alt;
    document.querySelector("#picModal a:first-of-type").href = data.photographer_url;
    document.querySelector("#picModal a:first-of-type").innerText = data.photographer;
    document.querySelector("#picModal a:last-of-type").href = data.url;
    document.querySelector("#picModal a:last-of-type").innerText = "View on Pexels";
    picModal.show();
}

window.addEventListener("DOMContentLoaded", () => fetchPexels(pexelsURL, `query=sea`))