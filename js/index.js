document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((books) => displayBooks(books))
    .catch((error) => console.error(error));
});

//function to display books
function displayBooks(books) {
  books.forEach((book) => {
    const list = document.querySelector("#list");
    const li = document.createElement("li");
    li.textContent = book.title;
    list.appendChild(li);
    li.addEventListener("click", () => {
      displayBookDetails(book);
    });
  });
}

//function to display book details
function displayBookDetails(book) {
  const showPanel = document.querySelector("#show-panel");
  const names = book.users.map((user) => `<li>${user.username}</li>`).join("");
  showPanel.innerHTML = `
    <img src="${book.img_url}"
    <br>
    <p class="title">${book.title}</p>
    <p>${book.description}</p>
    <ul>${names}</ul>
    <button class="like">LIKE</button>
  `;
  const like = showPanel.querySelector(".like");
  like.addEventListener("click", () => addLike(book));
}

//function to add likes
function addLike(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      users: [...book.users, { id: 1, username: "pouros" }],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
