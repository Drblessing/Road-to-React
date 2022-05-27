var BASE_URL = "https://hn.algolia.com/api/v1/";

function doSearch(query) {
  var url = BASE_URL + "search?query=" + query + "&hitsPerPage=200";
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result.hits;
    });
}

function addButtonEvent() {
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      onSearch();

      // (4) remove old list if there is already a list
      // (1) get value from input field
      // (2) search list from API with value
      // (3) append list to DOM
    });
}

function onSearch() {
  removeList();
  doSearch(getValueFromElementById("searchInput")).then(appendList);
}

function removeList() {
  var listNode = document.getElementById("list");

  if (listNode) {
    listNode.parentNode.removeChild(listNode);
  }
}

function appendList(list) {
  var listNode = document.createElement("div");
  listNode.setAttribute("id", "list");
  document.getElementById("app").appendChild(listNode);

  // append items to list
  list.forEach(function (item) {
    var itemNode = document.createElement("div");
    itemNode.appendChild(document.createTextNode(item.title));
    listNode.appendChild(itemNode);
    list.forEach(appendItem(listNode));
  });
}

function appendItem(listNode) {
  return function (item) {
    var itemNode = document.createElement("div");
    itemNode.appendChild(document.createTextNode(item.title));
    listNode.appendChild(itemNode);
  };
}

function getValueFromElementById(id) {
  return document.getElementById(id).value;
}

addButtonEvent();
