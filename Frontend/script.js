const container = document.querySelector(".container");
const input = document.querySelector("input");

let usersArray = [];

const createCardList = (array) => {
    container.innerHTML = "";

    array.forEach((obj) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `<div class="name">Name</div><div class="name-content">${obj.username}</div><div class="email">Email</div><div class="email-content">${obj.email}</div>`;
        container.appendChild(card);
    });
};

fetch("https://arcane-peak-77334.herokuapp.com/")
    .then((data) => {
        return data.json();
    })
    .then((result) => {
        console.log(result);
        usersArray = result;
        createCardList(usersArray);
    });

input.addEventListener("input", (event) => {
    const searchStr = event.target.value.toLowerCase();

    const filteredArray = usersArray.filter((ele) => {
        return (
            ele.username.toLowerCase().includes(searchStr) ||
            ele.email.toLowerCase().includes(searchStr)
        );
    });

    createCardList(filteredArray);
});

// particle js configuration
particlesJS.load("particles-js", "particles.json");


// adding users

const key = document.querySelector('img');

key.addEventListener("click", () => {
    const username = prompt("Enter User Name");
    const email = prompt("Enter User Email");
    const userKey = prompt("Enter User Key");
    const secretKey = prompt("Enter Secret Key");

    const newUser = {
        username,
        email
    };
    const user = {
        newUser,
        userKey,
        secretKey
    };

    fetch("https://arcane-peak-77334.herokuapp.com/addUser", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((data) => data.json())
        .then((info) => {
            console.log(info);
            usersArray = info;
            createCardList(usersArray);
        })
        .catch((error) => {
            console.log(error);
            alert("User NOT added");
        })

})