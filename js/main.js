// Selecting elements
const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const itemsContainer = document.querySelector('.items');

// Initiating the list array
let list = [];

// Extending the default storage-objects to handle arrays
// (only handles string, hence the JSON.stringify() & JSON.parse())
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

const template = function () {
  // Creating a new array that consists of items stored
  // in the list array in localStorage
  let storedList = localStorage.getObj('list');

  // Checking if it's empty or not
  if (storedList.length < 1) {
    return '<p>You have no items in your list!</p>';
  }

  // If it's not empty, create the corresponding elements
  // for each of the items in the storedList array
  return (
    '<ul class="items__list">' +
    storedList
      .map((item) => {
        return '<li><p>' + item + '</p></li>';
      })
      .join('') +
    '</ul>'
  );
};

const render = function () {
  // Checking if the actual container for the elements exists
  if (!itemsContainer) return;

  // Setting the container's innerHTML to the created elements
  // from template() function
  itemsContainer.innerHTML = template();
};

// Checking if there is a 'list key' in localStorage
if (!localStorage.list) {
  // If not, it's set
  localStorage.setObj('list', list);
  // Calling render() to show the message
  render();
} else {
  // If it's already set, calling render()
  render();
}

// Listening for clicks on the 'ADD' button
button.addEventListener('click', () => {
  // Checking if there's an actual value in the input field
  if (!input.value || input.value.length < 1) return;

  // Setting the list array to the one from localStorage
  list = localStorage.getObj('list');
  // Adding the input value to it
  list.push(input.value);
  // Putting it back to localStorage
  localStorage.setObj('list', list);
  // Rendering the updated array
  render();

  // After all of the above is done, the input field
  // clears and focuses
  input.value = '';
  input.focus();
});
