console.log('This is app.js');
// localStorage.clear();
showNotes();
//If user add a  note add it to local storage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');
    if(notes == null){
        notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value="";
    console.log(notesObj);
    showNotes() ;
});
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes == null){
        notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html= "";
    notesObj.forEach(function(element,index){
        html +=
        `<div class="notecard card mx-2 my-3">
        <div class="card-body">
            <h5 class="card-title">Note ${index+1} </h5>
            <p class="card-text">${element} </p>
            <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete Note</button>
        </div>
    </div>`
    });
    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML='Nothing to Show !!';
    }
}
function deleteNote(index){
    console.log(`I'm deleting the note ${index}`);
    let notes=localStorage.getItem('notes');
    if(notes == null){
        notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}
let search=document.getElementById('searchTxt');
search.addEventListener('input',function(e){
    let inputVal=search.value.toLowerCase();
    console.log('input event fired ', inputVal);
    let notecards=document.getElementsByClassName(`notecard`);
    Array.from(notecards).forEach(function(element){
        let cardTxt=element.getElementsByTagName(`p`)[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})
