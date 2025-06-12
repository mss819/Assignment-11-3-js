var inputSiteName = document.getElementById("siteName");
var inputSiteUrl = document.getElementById("siteUrl");
var bookmarks;
if (localStorage.getItem("bookmark") == null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmark"));
  disblay();
}

function create() {
  if (
    inputSiteName.classList.contains("is-valid") &&
    inputSiteUrl.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: inputSiteName.value,
      url: inputSiteUrl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    console.log(bookmarks);
    disblay(bookmarks);
    clear();
  } else {
    alert("not match");
  }
}

function disblay() {
  var box = "";
  for (var i = 0; i < bookmarks.length; i++) {
    box += `
      <tr ">
   <td class="w-25">${i + 1}</td>
    <td class="w-25">${bookmarks[i].siteName}</td>
    <td class="w-25"><a href="${
      bookmarks[i].url
    }"><button type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
    <td class="w-25"><button onclick="Delete(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>
 `;
  }
  document.getElementById("item").innerHTML = box;
}

function clear() {
  inputSiteName.value = null;
  inputSiteUrl.value = null;
  inputSiteName.classList.remove("is-valid", "is-invalid");
  inputSiteUrl.classList.remove("is-valid", "is-invalid");
}

function Delete(deletedindex) {
  bookmarks.splice(deletedindex, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));

  disblay();
}

function validatInputs(element) {
  var regex = {
    siteName: /^[A-Z][a-z]{3,20}$/,
    siteUrl:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}
