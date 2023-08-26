class StateManager {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.notifySubscribers();
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notifySubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this.state);
    });
  }
}

class Renderer {
  constructor(elementId, stateManager) {
    this.element = document.getElementById(elementId);
    this.stateManager = stateManager;
    stateManager.subscribe(this);
  }

  update(newState) {
    this.element.textContent = `${newState}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const counter = parseInt(localStorage.getItem("counter")) || 0;
  const counterManager = new StateManager(counter);
  const text = localStorage.getItem("text") || "Hello";
  const textManager = new StateManager(text);

  const appRenderer2 = new Renderer("app", textManager);
  const toggleButton = document.getElementById("toggleButton");

  toggleButton.addEventListener("click", () => {
    const currentState = textManager.getState();
    const newState = currentState === "Hello" ? "Bye" : "Hello";
    textManager.setState(newState);
    localStorage.setItem("text", newState);
  });
  const appRenderer = new Renderer("counter", counterManager);
  const incrementButton = document.getElementById("incrementButton");
  const decrementButton = document.getElementById("decrementButton");
  const resetButton = document.getElementById("resetButton");

  incrementButton.addEventListener("click", () => {
    const currentState = counterManager.getState();
    const newState = currentState + 1;
    counterManager.setState(newState);
    localStorage.setItem("counter", newState);
  });

  decrementButton.addEventListener("click", () => {
    const currentState = counterManager.getState();
    const newState = currentState - 1;
    counterManager.setState(newState);
    localStorage.setItem("counter", newState);
  });

  resetButton.addEventListener("click", () => {
    const newState = 0;
    counterManager.setState(newState);
    localStorage.setItem("counter", newState);
  });

  // Initial render
  appRenderer.update(counter);
  appRenderer2.update(text);
});
