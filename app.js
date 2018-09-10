//Storage controller

//Item controller
const ItemCtrl = (function() {
   //Item constructor
   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   //Data structure / state
   const data = {
      items: [
         {id: 0, name: 'Bigos', calories: 200},
         {id: 1, name: 'Pierogi', calories: 300},
         {id: 2, name: 'Naleśniki', calories: 400}
      ],
      currentItem: null,
      totalCalories: 0
   }

   function getItems() {
      return data.items;
   }

   function logData() {
      return data;
   }

   function addItem(name, calories) {
      console.log(name, calories);
      //create id
      let id;

      if(data.items.length > 0) {
         id = data.items.length;
      } else {
         id = 0;
      }

      //calories to number
      calories = parseInt(calories);

      //create new item
      const newItem = new Item(id, name, calories);
      
      //add to items array
      data.items.push(newItem);

      return newItem;
   }

   return {
      getItems: getItems,
      logData: logData,
      addItem: addItem
   }

})();

//UI controller
const UICtrl = (function() {

   const UISelectors = {
      itemList: "#item-list",
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories'
   }
   
   function populateItemList(items) {
      let output = '';

      items.forEach(function(item){
         output += `<li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>
                     </li>`;
      });

      //Insert items
      document.querySelector(UISelectors.itemList).innerHTML = output;
   }

   function getSelectors() {
      return UISelectors;
   }

   function getItemInput() {
      return {
         name: document.querySelector(UISelectors.itemNameInput).value,
         calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
   }

   return {
      populateItemList: populateItemList,
      getSelectors: getSelectors,
      getItemInput: getItemInput
   }

})();


//App controller
const App = (function(item, ui) {
   //load events
   function loadEventListeners() {
      const UISelectors = ui.getSelectors();

      //add item event
      document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
   }

   //add item submit
   function itemAddSubmit(e) {
      //get input value from UI
      const input = ui.getItemInput();

      //check if inputs are empty
      if(input.name !== '' && input.calories !== '') {
         //Add item
         const newItem = item.addItem(input.name, input.calories);
      }   
      
      e.preventDefault();
   }

   function init() {
      //load events
      loadEventListeners();

      //fetch items
      const items = item.getItems();

      //populate list
      ui.populateItemList(items);
   }
   return {
      init: init
   }
   
})(ItemCtrl, UICtrl);

//Init app
App.init();