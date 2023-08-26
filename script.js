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
    localStorage.setItem("counter", newState);
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
    this.element.textContent = `Counter: ${newState}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const counter = parseInt(localStorage.getItem("counter")) || 0;
  const counterManager = new StateManager(counter);

  const appRenderer = new Renderer("counter", counterManager);
  const incrementButton = document.getElementById("incrementButton");
  const decrementButton = document.getElementById("decrementButton");
  const resetButton = document.getElementById("resetButton");

  incrementButton.addEventListener("click", () => {
    const currentState = counterManager.getState();
    const newState = currentState + 1;
    counterManager.setState(newState);
  });

  decrementButton.addEventListener("click", () => {
    const currentState = counterManager.getState();
    const newState = currentState - 1;
    counterManager.setState(newState);
  });

  resetButton.addEventListener("click", () => {
    const newState = 0;
    counterManager.setState(newState);
  });

  // Initial render
  appRenderer.update(counter);
});
