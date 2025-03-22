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
let varukorg = []; // Array för att lagra produkter i varukorgen

// Lista för att lagra historiken
let historik = []; // Array för att lagra tidigare borttagna produkter

// Funktion för att lägga till en produkt i varukorgen
function läggTillIVarukorg(id) {
    console.log(`Lägger till produkt med id: ${id}`); // Logga vilken produkt som läggs till
    const produkt = produkter.find(p => p.id === id); // Hitta produkten i produktlistan
    const varukorgsProdukt = varukorg.find(p => p.id === id); // Kontrollera om produkten redan finns i varukorgen

    if (varukorgsProdukt) {
        varukorgsProdukt.antal++; // Öka antalet om produkten redan finns
    } else {
        varukorg.push({ ...produkt, antal: 1 }); // Lägg till produkten om den inte finns
    }
    console.log("Varukorg efter tillägg:", varukorg); // Logga varukorgens innehåll
    uppdateraVarukorg(); // Uppdatera varukorgen i gränssnittet
}

// Funktion för att ta bort en produkt från varukorgen
function taBortFrånVarukorg(id) {
    const varukorgsProdukt = varukorg.find(p => p.id === id); // Hitta produkten i varukorgen
    if (varukorgsProdukt) {
        varukorgsProdukt.antal--; // Minska antalet
        if (varukorgsProdukt.antal === 0) {
            historik.push({ ...varukorgsProdukt }); // Lägg till produkten i historiken om antalet är 0
            varukorg = varukorg.filter(p => p.id !== id); // Ta bort produkten från varukorgen
        }
    }
    uppdateraVarukorg(); // Uppdatera varukorgen i gränssnittet
    uppdateraHistorikDropdown(); // Uppdatera historik-dropdown
}

// Funktion för att uppdatera varukorgens innehåll
function uppdateraVarukorg() {
    const varukorgList = document.getElementById("varukorg-list"); // Hämta elementet för varukorgslistan
    const totalPrisElement = document.getElementById("varukorg-total"); // Hämta elementet för totalpriset

    if (!varukorgList || !totalPrisElement) {
        console.error("Varukorgslistan eller totalpris-elementet saknas i HTML.");
        return;
    }

    varukorgList.innerHTML = ""; // Töm listan
    let totalPris = 0; // Variabel för att hålla totalpriset

    varukorg.forEach(produkt => {
        const li = document.createElement("li"); // Skapa ett nytt list-element
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
            <div class="vagn-knappar">
                <img src="img/delete.webp" alt="minusTecken" onclick="taBortFrånVarukorg(${produkt.id})">
            </div>
        `;
        varukorgList.appendChild(li); // Lägg till produkten i listan
        totalPris += produkt.pris * produkt.antal; // Lägg till produktens pris till totalpriset
    });

    totalPrisElement.textContent = `Totalt: ${totalPris} Kr`; // Uppdatera totalpriset i gränssnittet
}

// Funktion för att visa varukorgen
function visaVarukorg() {
    document.getElementById("varukorg-modal").classList.remove("hidden"); // Visa varukorgsmodulen
}

// Funktion för att stänga varukorgen
function stängVarukorg() {
    document.getElementById("varukorg-modal").classList.add("hidden"); // Dölj varukorgsmodulen
}

// Funktion för att uppdatera dropdown-innehållet
function uppdateraDropdownVarukorg() {
    const dropdownVarukorgList = document.getElementById("dropdown-varukorg-list"); // Hämta elementet för dropdown-listan

    dropdownVarukorgList.innerHTML = ""; // Töm listan

    varukorg.forEach(produkt => {
        const li = document.createElement("li"); // Skapa ett nytt list-element
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
            <img src="img/delete.webp" alt="Ta bort" class="minus-knapp" onclick="taBortFrånVarukorg(${produkt.id})">
        `;
        dropdownVarukorgList.appendChild(li); // Lägg till produkten i dropdown-listan
    });
}

// Funktion för att uppdatera historik-dropdown
function uppdateraHistorikDropdown() {
    const historikList = document.getElementById("historik-list"); // Hämta elementet för historiklistan
    historikList.innerHTML = ""; // Töm listan
    historik.forEach(produkt => {
        const li = document.createElement("li"); // Skapa ett nytt list-element
        li.innerHTML = `<span>${produkt.namn}</span> <span>${produkt.pris} Kr</span>`;
        historikList.appendChild(li); // Lägg till produkten i historiklistan
    });
}

// Event Listeners
document.getElementById("stäng-varukorg").addEventListener("click", stängVarukorg); // Lyssna på klick för att stänga varukorgen
document.querySelector(".nav-icon[alt='Varukorg']").addEventListener("click", visaVarukorg); // Lyssna på klick för att visa varukorgen

// Hämta element
const varukorgIkon = document.getElementById("varukorg-ikon"); // Hämta varukorgsikonen
const varukorgDropdown = document.getElementById("varukorg-dropdown-content"); // Hämta varukorgsdropdown

// Visa dropdown vid klick
varukorgIkon.addEventListener("click", () => {
    varukorgDropdown.classList.add("visible"); // Visa dropdown
});

// Håll dropdown synlig vid hover
varukorgDropdown.addEventListener("mouseenter", () => {
    varukorgDropdown.classList.add("visible"); // Håll dropdown synlig
});

// Dölj dropdown när man slutar hovra
varukorgDropdown.addEventListener("mouseleave", () => {
    varukorgDropdown.classList.remove("visible"); // Dölj dropdown
});

// Hämta element
const menuIkon = document.getElementById("menu-ikon"); // Hämta menyikonen
const menuDropdown = document.getElementById("menu-dropdown-content"); // Hämta menydropdown

// Visa/dölj dropdown vid klick
menuIkon.addEventListener("click", () => {
    const isVisible = menuDropdown.classList.contains("visible"); // Kontrollera om dropdown är synlig
    document.querySelectorAll(".dropdown-content").forEach(content => content.classList.remove("visible")); // Dölj alla andra dropdowns
    if (!isVisible) {
        menuDropdown.classList.add("visible"); // Visa menyn om den inte redan är synlig
    }
});

// Dölj dropdown om användaren klickar utanför
document.addEventListener("click", (event) => {
    if (!menuIkon.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.classList.remove("visible"); // Dölj menyn om användaren klickar utanför
    }
});

// Funktion för att visa historik-dropdown vid hover
document.getElementById("historik-ikon").addEventListener("mouseenter", () => {
    document.getElementById("historik-dropdown").classList.remove("hidden"); // Visa historik-dropdown
});

// Funktion för att dölja historik-dropdown när man slutar hovra
document.getElementById("historik-ikon").addEventListener("mouseleave", () => {
    document.getElementById("historik-dropdown").classList.add("hidden"); // Dölj historik-dropdown
});