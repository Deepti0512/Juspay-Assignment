import { React } from "./library/React.js";

// set the components, their states and logic

function wrapper() {
  let string1 = "Welcome To Juspay!!";
  let string2 = "We make online transactions simple :) ";
  let [text, setText] = React.useState(string1);
  return {
    render: () => {
      document.getElementById("app").textContent = text;
    },
    click: () => setText(text === string1 ? string2 : string1),
  };
}


// manipulate the Dom

const toggleBtn = document.getElementById("toggleButton");
toggleBtn.addEventListener("click", () => {
  let App = React.render(wrapper);
  App.click();
  App.render();
  App = React.render(wrapper);
});

