// ===============================
// Pullover Verwaltung
// Teil 1: Linke Liste erstellen
// ===============================


const itemList = document.getElementById("itemList");
const detail = document.getElementById("detail");


// Pullover erstellen
const pullover = [];


// A1-A10
for(let i = 1; i <= 10; i++){

    pullover.push("A" + i);

}


// B1-B10
for(let i = 1; i <= 10; i++){

    pullover.push("B" + i);

}


// C1-C10
for(let i = 1; i <= 10; i++){

    pullover.push("C" + i);

}


// Liste links anzeigen

pullover.forEach((name)=>{


    const item = document.createElement("div");

    item.className = "item";

    item.innerHTML = `
        👕 ${name}
    `;


    item.onclick = function(){

        // aktive Markierung
        document.querySelectorAll(".item")
        .forEach(x => x.classList.remove("active"));

        item.classList.add("active");


        // Detailansicht laden
        zeigePullover(name);

    };


    itemList.appendChild(item);


});



// Test Detailansicht

function zeigePullover(name){


    detail.innerHTML = `

    <div class="card">

        <div class="cardHeader">

            <h1>${name}</h1>

            <div class="status">
                Verfügbar
            </div>

        </div>


        <p>
        Pullover ${name} ausgewählt.
        </p>


    </div>

    `;


}
// ===============================
// Teil 2: Moderne Detailkarte
// ===============================


function zeigePullover(name){

    detail.innerHTML = `

    <div class="card">


        <div class="cardHeader">

            <h1>👕 ${name}</h1>

            <div class="status">
                Verfügbar
            </div>

        </div>



        <div class="images">


            <label class="imageBox">

                <span>Bild 1</span>

                <input type="file" accept="image/*">

            </label>



            <label class="imageBox">

                <span>Bild 2</span>

                <input type="file" accept="image/*">

            </label>



            <label class="imageBox">

                <span>Bild 3</span>

                <input type="file" accept="image/*">

            </label>


        </div>



        <div class="grid">


            <div class="field">

                <label>Kategorie</label>

                <input 
                id="category"
                type="text"
                placeholder="z.B. Hoodie">

            </div>



            <div class="field">

                <label>Größe</label>

                <input 
                id="size"
                type="text"
                placeholder="z.B. M">

            </div>



            <div class="field">

                <label>Farbe</label>

                <input 
                id="color"
                type="text"
                placeholder="z.B. Schwarz">

            </div>



            <div class="field">

                <label>Preis (€)</label>

                <input 
                id="price"
                type="number"
                placeholder="39.99">

            </div>



            <div class="field">

                <label>Status</label>

                <select id="status">

                    <option>Verfügbar</option>

                    <option>Reserviert</option>

                    <option>Verkauft</option>

                </select>

            </div>


        </div>



        <div class="buttons">


            <button class="save">

                💾 Speichern

            </button>


            <button class="delete">

                🗑 Löschen

            </button>


        </div>



    </div>

    `;


}
// ===============================
// Teil 3: Automatisches Speichern
// ===============================


// gespeicherte Daten laden

let gespeicherteDaten = 
JSON.parse(localStorage.getItem("pulloverDaten")) || {};


// Daten speichern

function datenSpeichern(){

    localStorage.setItem(
        "pulloverDaten",
        JSON.stringify(gespeicherteDaten)
    );

}


// aktuelle Auswahl merken

let aktuellerPullover = "";


// alte Funktion erweitern

const alteAnzeige = zeigePullover;


zeigePullover = function(name){

    aktuellerPullover = name;

    alteAnzeige(name);


    // gespeicherte Daten einsetzen

    if(gespeicherteDaten[name]){


        document.getElementById("category").value =
        gespeicherteDaten[name].category || "";


        document.getElementById("size").value =
        gespeicherteDaten[name].size || "";


        document.getElementById("color").value =
        gespeicherteDaten[name].color || "";


        document.getElementById("price").value =
        gespeicherteDaten[name].price || "";


        document.getElementById("status").value =
        gespeicherteDaten[name].status || "Verfügbar";


    }


    bilderAktivieren();

};



// Speichern Button

document.addEventListener("click",function(e){


    if(e.target.classList.contains("save")){


        gespeicherteDaten[aktuellerPullover]={

            category:
            document.getElementById("category").value,


            size:
            document.getElementById("size").value,


            color:
            document.getElementById("color").value,


            price:
            document.getElementById("price").value,


            status:
            document.getElementById("status").value


        };


        datenSpeichern();


        alert(
        aktuellerPullover+" gespeichert"
        );


    }


});



// Bilder aktivieren

function bilderAktivieren(){


    const boxes =
    document.querySelectorAll(".imageBox");


    boxes.forEach((box,index)=>{


        const input =
        box.querySelector("input");


        input.addEventListener(
        "change",
        function(){


            const datei =
            this.files[0];


            if(!datei)return;


            const reader =
            new FileReader();


            reader.onload=function(e){


                box.innerHTML=`

                <img 
                src="${e.target.result}"
                >


                <input 
                type="file"
                accept="image/*"
                >

                `;


                if(!gespeicherteDaten[aktuellerPullover])
                {
                    gespeicherteDaten[aktuellerPullover]={};
                }


                if(!gespeicherteDaten[aktuellerPullover].bilder)
                {
                    gespeicherteDaten[aktuellerPullover].bilder=[];
                }


                gespeicherteDaten[aktuellerPullover]
                .bilder[index]=e.target.result;


                datenSpeichern();


            };


            reader.readAsDataURL(datei);


        });


    });


}
// ===============================
// Teil 4: Bilder laden + Suche + Status
// ===============================


// Bilder beim Öffnen anzeigen

function gespeicherteBilderLaden(){

    if(!gespeicherteDaten[aktuellerPullover]) return;


    const bilder =
    gespeicherteDaten[aktuellerPullover].bilder || [];


    const boxes =
    document.querySelectorAll(".imageBox");


    boxes.forEach((box,index)=>{


        if(bilder[index]){


            box.innerHTML = `

            <img src="${bilder[index]}">

            <input 
            type="file"
            accept="image/*">

            `;


        }


    });


}



// alte Funktion erweitern

const alteBilderAktivierung =
bilderAktivieren;


bilderAktivieren=function(){

    alteBilderAktivierung();

    gespeicherteBilderLaden();

};



// ===============================
// Suche verbessern
// ===============================


const suche =
document.getElementById("search");


suche.addEventListener("input",function(){


    const text =
    this.value.toLowerCase();


    document.querySelectorAll(".item")
    .forEach(item=>{


        const wert =
        item.innerText.toLowerCase();


        if(wert.includes(text)){

            item.style.display="block";

        }
        else{

            item.style.display="none";

        }


    });


});



// ===============================
// Status Farbe ändern
// ===============================


document.addEventListener(
"change",
function(e){


    if(e.target.id==="status"){


        const statusBox =
        document.querySelector(".status");


        if(e.target.value==="Verfügbar"){


            statusBox.style.background="#22c55e";


        }


        if(e.target.value==="Reserviert"){


            statusBox.style.background="#eab308";


        }


        if(e.target.value==="Verkauft"){


            statusBox.style.background="#ef4444";


        }


    }


});