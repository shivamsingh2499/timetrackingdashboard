var main = document.querySelector("main");
console.log(main);
let data;
const clearActivities = () => {
  //Clear all activities from html
  const activities = document.querySelectorAll(".card");
  console.log(activities);
  activities.forEach((a) => a.remove());
};

function loadData(check) {
  clearActivities();
  console.log(check);
  fetch("./data.json").then((response) => {
    console.log(response);
    response
      .json()
      .then((response) => {
        response.map((elm) => {
          let div = document.createElement("div");
          div.className = "card";
          main.appendChild(div);
          let innerDiv = document.createElement("div");
          innerDiv.className = "card1";
          div.appendChild(innerDiv);
          let img = document.createElement("img");
          img.className = "left";
          img.src = elm.img;
          innerDiv.appendChild(img);
          let innerDiv1 = document.createElement("div");
          innerDiv.appendChild(innerDiv1);
          innerDiv1.className = "down";
          let innerDiv2 = document.createElement("div");
          innerDiv1.appendChild(innerDiv2);
          innerDiv2.className = "wrap";
          let para = document.createElement("p");
          innerDiv2.appendChild(para);
          para.className = "heading";
          para.innerHTML = elm.title;
          let innerimg = document.createElement("img");
          innerDiv2.appendChild(innerimg);
          innerimg.className = "icon";
          innerimg.src = "./images/icon-ellipsis.svg";
          let h1 = document.createElement("h1");
          innerDiv1.appendChild(h1);
          h1.className = "hour";
          h1.innerHTML =
            check === "daily"
              ? `${elm.timeframes.daily.current}hr`
              : check === "weekly"
              ? `${elm.timeframes.weekly.current}hr`
              : `${elm.timeframes.monthly.current}hr`;
          let foot = document.createElement("p");
          innerDiv1.appendChild(foot);
          foot.className = "footer";
          foot.innerHTML =
            check === "daily"
              ? `Yesterday - ${elm.timeframes.daily.previous}hr`
              : check === "weekly"
              ? `Last week - ${elm.timeframes.weekly.previous}hr`
              : `Last month - ${elm.timeframes.monthly.previous}hr`;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

loadData("weekly");
let daily = document.querySelector(".daily");
let weekly = document.querySelector(".weekly");
let monthly = document.querySelector(".monthly");
function filterData(data) {
  if (data === "daily") {
    daily.classList.add("active");
    weekly.classList.remove("active");
    monthly.classList.remove("active");
  } else if (data === "weekly") {
    daily.classList.remove("active");
    weekly.classList.add("active");
    monthly.classList.remove("active");
  } else 
   {
    daily.classList.remove("active");
    weekly.classList.remove("active");
    monthly.classList.add("active");
  }
  
  loadData(data);
}

daily.addEventListener("click", () => {
  filterData("daily");
});
weekly.addEventListener("click", () => {
  filterData("weekly");
});
monthly.addEventListener("click", () => {
  filterData("monthly");
});
