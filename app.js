console.log("Welcome to the Notes app. This is app.js")

showNotes();

// if user adds the note , add it to a local storage

let addBtn = document.getElementById('Btn');

addBtn.addEventListener("click", function(e){
    let addtext = document.getElementById("addtext");
    let notes = localStorage.getItem("notes");

    if(notes  == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addtext.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";// to empty the text area
    console.log(notesObj); 

    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes  == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        html += `<div class="card mx-2 my-2" style="width: 18rem;">
         <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         </div>
        </div>`;

    });

    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Add a note using Add Note Section `
    }
}



// function to delete a note
function deleteNote(index){
    console.log("I am deleting",index);
    let notes = localStorage.getItem("notes");

    if(notes  == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    // splice kya krta h index pe jataa and ek element delete krdeta h
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');

search.addEventListener("input", function(){

    let inputval = search.value.toLowerCase();
    console.log("input event fired",inputval);
    let noteCards = document.getElementsByClassName("card");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0];// 0 is used taaki p tag ka phla element uthaya jayee
        console.log(cardTxt);
        if(cardTxt.innerText.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
    
})

// further feature
// 1. Add title on note (like key value pair)
// 2. mark a note as important 
// 3. separate notes by user
// sync and host to web server
