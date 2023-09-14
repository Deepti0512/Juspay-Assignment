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
  // Create separate StateManager instances for each state
  const counterManager = new StateManager(0);
  const textManager = new StateManager("Hello");

  // Create Renderer instances for each component
  const appRenderer = new Renderer("app", textManager);
  const counterRenderer = new Renderer("counter", counterManager);

  // Set up event listeners for each component
  // Example: Handle click events for a button to update the state
  const toggleButton = document.getElementById("toggleButton");
  const incrementButton = document.getElementById("incrementButton");
  const decrementButton = document.getElementById("decrementButton");
  const resetButton = document.getElementById("resetButton");

  toggleButton.addEventListener("click", () => {
    const currentState = textManager.getState();
    const newState = currentState === "Hello" ? "Bye" : "Hello";
    textManager.setState(newState);
  });

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
  // Initial render for each component
  appRenderer.update(textManager.getState());
  counterRenderer.update(counterManager.getState());
});
