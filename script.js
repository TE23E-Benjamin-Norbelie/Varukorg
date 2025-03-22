// Lista över produkter
const produkter = [
    { id: 1, namn: "Björne", pris: 175 },
    { id: 2, namn: "Roger", pris: 185 },
    { id: 3, namn: "Johan", pris: 230 },
    { id: 4, namn: "Björn", pris: 195 },
    { id: 5, namn: "Helge", pris: 270 },
    { id: 6, namn: "Svennis", pris: 335 },
    { id: 7, namn: "Holger", pris: 245 },
    { id: 8, namn: "Nalle", pris: 160 }
];

// Varukorgsdata
let varukorg = [];

// Lista för att lagra historiken
let historik = [];

// Funktion för att lägga till en produkt i varukorgen
function läggTillIVarukorg(id) {
    console.log(`Lägger till produkt med id: ${id}`);
    const produkt = produkter.find(p => p.id === id);
    const varukorgsProdukt = varukorg.find(p => p.id === id);

    if (varukorgsProdukt) {
        varukorgsProdukt.antal++; // Öka antalet om produkten redan finns
    } else {
        varukorg.push({ ...produkt, antal: 1 }); // Lägg till produkten om den inte finns
    }
    console.log("Varukorg efter tillägg:", varukorg);
    uppdateraVarukorg(); // Uppdatera varukorgen
}

// Funktion för att ta bort en produkt från varukorgen
function taBortFrånVarukorg(id) {
    const varukorgsProdukt = varukorg.find(p => p.id === id);
    if (varukorgsProdukt) {
        varukorgsProdukt.antal--;
        if (varukorgsProdukt.antal === 0) {
            historik.push({ ...varukorgsProdukt });
            varukorg = varukorg.filter(p => p.id !== id);
        }
    }
    uppdateraVarukorg();
    uppdateraHistorikDropdown();
}

// Funktion för att uppdatera varukorgens innehåll
function uppdateraVarukorg() {
    const varukorgList = document.getElementById("varukorg-list");
    const totalPrisElement = document.getElementById("varukorg-total");

    if (!varukorgList || !totalPrisElement) {
        console.error("Varukorgslistan eller totalpris-elementet saknas i HTML.");
        return;
    }

    varukorgList.innerHTML = ""; // Töm listan
    let totalPris = 0;

    varukorg.forEach(produkt => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
            <div class="vagn-knappar">
                <img src="img/delete.webp" alt="minusTecken" onclick="taBortFrånVarukorg(${produkt.id})">
            </div>
        `;
        varukorgList.appendChild(li);
        totalPris += produkt.pris * produkt.antal; // Summera totalpriset
    });

    totalPrisElement.textContent = `Totalt: ${totalPris} Kr`; // Uppdatera totalpris

    // Spara varukorgen i LocalStorage
    localStorage.setItem("varukorg", JSON.stringify(varukorg));
}

// Funktion för att visa varukorgen
function visaVarukorg() {
    document.getElementById("varukorg-modal").classList.remove("hidden");
}

// Funktion för att stänga varukorgen
function stängVarukorg() {
    document.getElementById("varukorg-modal").classList.add("hidden");
}

// Funktion för att uppdatera dropdown-innehållet
function uppdateraDropdownVarukorg() {
    const dropdownVarukorgList = document.getElementById("dropdown-varukorg-list");

    // Töm listan
    dropdownVarukorgList.innerHTML = "";

    // Lägg till varje produkt i listan
    varukorg.forEach(produkt => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
            <img src="img/delete.webp" alt="Ta bort" class="minus-knapp" onclick="taBortFrånVarukorg(${produkt.id})">
        `;
        dropdownVarukorgList.appendChild(li);
    });
}

// Funktion för att uppdatera historik-dropdown
function uppdateraHistorikDropdown() {
    const historikList = document.getElementById("historik-list");
    historikList.innerHTML = "";
    historik.forEach(produkt => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${produkt.namn}</span> <span>${produkt.pris} Kr</span>`;
        historikList.appendChild(li);
    });
}

// Funktion för att ladda varukorgen från LocalStorage
function laddaVarukorg() {
    const sparadVarukorg = localStorage.getItem("varukorg");
    if (sparadVarukorg) {
        varukorg = JSON.parse(sparadVarukorg); // Återskapa varukorgen från LocalStorage
        uppdateraVarukorg(); // Uppdatera varukorgen i gränssnittet
    }
}

// Event Listeners
document.getElementById("stäng-varukorg").addEventListener("click", stängVarukorg);
document.querySelector(".nav-icon[alt='Varukorg']").addEventListener("click", visaVarukorg);

// Hämta element
const varukorgIkon = document.getElementById("varukorg-ikon");
const varukorgDropdown = document.getElementById("varukorg-dropdown-content");

// Visa dropdown vid klick
varukorgIkon.addEventListener("click", () => {
    varukorgDropdown.classList.add("visible");
});

// Håll dropdown synlig vid hover
varukorgDropdown.addEventListener("mouseenter", () => {
    varukorgDropdown.classList.add("visible");
});

// Dölj dropdown när man slutar hovra
varukorgDropdown.addEventListener("mouseleave", () => {
    varukorgDropdown.classList.remove("visible");
});

// Hämta element
const menuIkon = document.getElementById("menu-ikon");
const menuDropdown = document.getElementById("menu-dropdown-content");

// Visa/dölj dropdown vid klick
menuIkon.addEventListener("click", () => {
    const isVisible = menuDropdown.classList.contains("visible");
    // Dölj alla andra dropdowns
    document.querySelectorAll(".dropdown-content").forEach(content => content.classList.remove("visible"));
    // Visa eller dölj menyn
    if (!isVisible) {
        menuDropdown.classList.add("visible");
    }
});

// Dölj dropdown om användaren klickar utanför
document.addEventListener("click", (event) => {
    if (!menuIkon.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.classList.remove("visible");
    }
});

// Funktion för att visa historik-dropdown vid hover
document.getElementById("historik-ikon").addEventListener("mouseenter", () => {
    document.getElementById("historik-dropdown").classList.remove("hidden");
});

// Funktion för att dölja historik-dropdown när man slutar hovra
document.getElementById("historik-ikon").addEventListener("mouseleave", () => {
    document.getElementById("historik-dropdown").classList.add("hidden");
});

// Ladda varukorgen från LocalStorage när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    laddaVarukorg();
});