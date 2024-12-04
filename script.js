"use strict";

const postsButton = document.getElementById("posts-button");
const usersButton = document.getElementById("users-button");
const dataContainer = document.getElementById("data-container");

postsButton.addEventListener("click", () => {
  fetchData("posts");
});

usersButton.addEventListener("click", () => {
  fetchData("users");
});

async function fetchData(endpoint) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${endpoint}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    dataContainer.innerHTML = ""; // Clear the container

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Customize card content based on endpoint
      if (endpoint === "posts") {
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        `;
      } else if (endpoint === "users") {
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>Username: ${item.username}</p>
          <p>Email: ${item.email}</p>
        `;
      }

      dataContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
