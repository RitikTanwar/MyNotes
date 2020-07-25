//Add evenlistener
showNotes();
let addbtn = document.querySelector(`.addbtn`);
addbtn.addEventListener(`click`, function(e) {
    let addtxt = document.querySelector(`.addtxt`);
    let addtittle = document.querySelectorAll(`#addtitle`);
    let notes = localStorage.getItem(`notes`);
    // let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        txt: addtxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem(`notes`, JSON.stringify(notesObj));
    addtitle.value = "";
    addtxt.value = "";
    showNotes();
    console.log(notesObj);
});
console.log(addbtn);

function showNotes() {
    let notes = localStorage.getItem(`notes`);
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="notecard mx-2 my-2 card">
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.txt}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
        `
    });

    let notesElm = document.getElementById(`notes`);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show`;
    }
}


function deleteNote(index) {
    console.log(`I am deleting this node`, index);

    let notes = localStorage.getItem(`notes`);
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, index + 1);
    localStorage.setItem(`notes`, JSON.stringify(notesObj));
    showNotes();


}

let searchTxt = document.getElementById(`searchTxt`);
searchTxt.addEventListener(`input`, function() {
    inputVal = searchTxt.value.toLowerCase();
    // console.log(`inout event triggered`, inputVal);
    let notecard = document.getElementsByClassName(`notecard`);
    Array.from(notecard).forEach(function(element, index) {
        let cardTxt = element.getElementsByTagName(`p`)[0].innerHTML;
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
});
