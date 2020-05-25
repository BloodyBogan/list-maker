const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const itemsContainer = document.querySelector('.items');

let items = {
  list: [],
};

const template = function () {
  if (items.list.length < 1) {
    return '<p>You have no items in your list!</p>';
  }

  return (
    '<ul class="items__list">' +
    items.list
      .map((item) => {
        return '<li><p>' + item + '</p></li>';
      })
      .join('') +
    '</li>'
  );
};

const render = function () {
  if (!itemsContainer) return;

  itemsContainer.innerHTML = template();
};

render();

button.addEventListener('click', () => {
  if (!input.value || input.value.length < 1) return;

  items.list.push(input.value);
  render();

  input.value = '';
  input.focus();
});
