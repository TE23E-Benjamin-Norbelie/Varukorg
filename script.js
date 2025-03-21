// Varukorgsdata
let varukorg = [];

// Funktion för att lägga till en produkt i varukorgen
function läggTillIVarukorg(id) {
    const produktElement = document.querySelector(`.produkt[data-id="${id}"]`);
    const namn = produktElement.getAttribute("data-namn");
    const pris = parseInt(produktElement.getAttribute("data-pris"));

    // Kontrollera om produkten redan finns i varukorgen
    const produkt = varukorg.find(item => item.id === id);
    if (produkt) {
        produkt.antal++;
    } else {
        varukorg.push({ id, namn, pris, antal: 1 });
    }

    uppdateraVarukorg();
    uppdateraDropdownVarukorg(); // Uppdatera dropdown
}

// Funktion för att ta bort en produkt från varukorgen
function taBortFrånVarukorg(id) {
    const produktIndex = varukorg.findIndex(item => item.id === id);
    if (produktIndex !== -1) {
        varukorg[produktIndex].antal--;
        if (varukorg[produktIndex].antal === 0) {
            varukorg.splice(produktIndex, 1);
        }
    }

    uppdateraVarukorg();
    uppdateraDropdownVarukorg(); // Uppdatera dropdown
}

// Funktion för att uppdatera varukorgens innehåll
function uppdateraVarukorg() {
    const varukorgList = document.getElementById("varukorg-list");
    const totalPrisElement = document.getElementById("total-pris");

    // Töm listan
    varukorgList.innerHTML = "";

    // Lägg till varje produkt i listan
    let totalPris = 0;
    varukorg.forEach(produkt => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
        `;
        varukorgList.appendChild(li);
        totalPris += produkt.pris * produkt.antal;
    });

    // Uppdatera totalpris
    totalPrisElement.textContent = `Totalt: ${totalPris} Kr`;
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
    const dropdownTotalPrisElement = document.getElementById("dropdown-total-pris");

    // Töm listan
    dropdownVarukorgList.innerHTML = "";

    // Lägg till varje produkt i listan
    let totalPris = 0;
    varukorg.forEach(produkt => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${produkt.namn} (${produkt.antal})</span>
            <span>${produkt.pris * produkt.antal} Kr</span>
        `;
        dropdownVarukorgList.appendChild(li);
        totalPris += produkt.pris * produkt.antal;
    });

    // Uppdatera totalpris
    dropdownTotalPrisElement.textContent = `Totalt: ${totalPris} Kr`;
}

// Event Listeners
document.getElementById("stäng-varukorg").addEventListener("click", stängVarukorg);
document.querySelector(".nav-icon[alt='Varukorg']").addEventListener("click", visaVarukorg);