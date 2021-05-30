let addBtn = document.getElementById("addBtn");
let searchBar = document.getElementById("searchBar");

addBtn.addEventListener("click", addTxt);
document.addEventListener("DOMContentLoaded", showNotes);
searchBar.addEventListener("input", searchNote);

function addTxt(e) {
  let txtNote = document.getElementById("addNote");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  notesObj.push(txtNote.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  console.log(notesObj);
  txtNote.value = "";
  showNotes();
}

function showNotes(e) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  let html = ``;

  notesObj.forEach((element, index) => {
    html += `

      <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick=deleteThis(this.id)  class="btn btn-danger">Delete Note</button>
          </div>
        </div>
      `;
  });
  let noteElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML =
      "Nothing to Show here! Press 'Add A Note' to add notes!!!";
  }
}

function deleteThis(index) {
  console.log("I am deleting ", index);
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function searchNote(e) {
  let inputVal = searchBar.value.toLowerCase();
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach((element) => {
    let noteText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (noteText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}
