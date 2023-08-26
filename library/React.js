export const React = (function () {
  let state;
  function useState(initialValue) {
    state = state || initialValue;
    function setState(newValue) {
      state = newValue;
    }
    return [state, setState];
  }
  function render(component) {
    const a = component();
    a.render();
    return a;
  }
  return { useState, render };
})();
