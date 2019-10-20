//console.log("Client side javascript file is loaded!");
// fetch("http://puzzle.mead.io/puzzle")
//   .then(response => {
//     response.json().then(data => {
//       console.log(data);
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
//test changes
const messageOne = document.querySelector("#errorDisplay");
const messageTwo = document.querySelector("#resultDisplay");

function fetchResults(location) {
  messageOne.innerHTML = "Loading...";
  fetch("http://localhost:8080/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.innerHTML = data.error;
        messageTwo.innerHTML = "";
      } else {
        messageOne.innerHTML = `${data.location}`;
        messageTwo.innerHTML = `
        ${data.forecast}`;
      }
    });
  });
}

function submitForm(e) {
  e.preventDefault();
  //console.log(e.target.data);
  const data = Object.fromEntries(new FormData(form).entries());
  console.log("fatching results...");
  fetchResults(data.address);
}
var form = document.querySelector("form");
form.addEventListener("submit", submitForm);
