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

   function getTotalCalories() {
      let total = 0;
      data.items.forEach(function(item){
         total += item.calories;
      })
      data.totalCalories = total;
      return data.totalCalories;
   }

   function getItemById(id) {
      let found = null;
      data.items.forEach(function(item){
         if(item.id === id){
            found = item;
         }
      });
      data.currentItem = found;
      return found;
   }

   function getCurrentItem(){
      return data.currentItem;
   }

   function updateItem(name, calories){
      //calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function(item){
         if(item.id == data.currentItem.id){
            item.name = name;
            item.calories = calories;
            found = item;
         }
      });
      return found;
   }

   function deleteItem(id){
      //delete item from data

      data.items.forEach(function(item, index){
         if(item.id === id){
            data.items.splice(index,1);
         }
      });
   }

   function clearAllData(){
      data.items = [];
   }

   return {
      getItems: getItems,
      logData: logData,
      addItem: addItem,
      getTotalCalories: getTotalCalories,
      getItemById: getItemById,
      getCurrentItem: getCurrentItem,
      updateItem: updateItem,
      deleteItem: deleteItem,
      clearAllData: clearAllData
   }

})();

//UI controller
const UICtrl = (function() {

   const UISelectors = {
      itemList: "#item-list",
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
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

   function addListItem(item){
      //show list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      //create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}                      Calories</em>
                        <a href="#" class="secondary-content">
                           <i class="edit-item fa fa-pencil"></i>
                        </a>`;

      //insert li element
      document.querySelector(UISelectors.itemList).appendChild(li);

      //clear inputs
      clearInputs();
   }

   function clearInputs() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
   }

   function hideList() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
   }

   function updateTotalCalories(calories){
      document.querySelector(UISelectors.totalCalories).textContent = calories;
   }

   function clearEditState(){
      clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
   }

   function showEditState(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
   }

   function addItemToForm(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      showEditState();
   }

   function updateListItem(updatedItem){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn node list to array
      listItems = Array.from(listItems);      

      listItems.forEach(function(item){
         const itemId = item.id;

         if(itemId === `item-${updatedItem.id}`){
            document.querySelector(`#${itemId}`).innerHTML = `<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories}                      Calories</em>
            <a href="#" class="secondary-content">
               <i class="edit-item fa fa-pencil"></i>
            </a>`
         }
      });
      clearEditState();
   }

   function deleteListItem(id){
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();

      clearEditState();
   }

   function removeItems(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(item){
         item.remove();
      });
      hideList();
   }

   return {
      populateItemList: populateItemList,
      getSelectors: getSelectors,
      getItemInput: getItemInput,
      addListItem: addListItem,
      hideList: hideList,
      updateTotalCalories: updateTotalCalories,
      clearEditState: clearEditState,
      addItemToForm: addItemToForm,
      updateListItem: updateListItem,
      deleteListItem: deleteListItem,
      removeItems: removeItems
   }

})();


//App controller
const App = (function(item, ui) {
   //load events
   function loadEventListeners() {
      const UISelectors = ui.getSelectors();

      //add item event
      document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

      //disable submit on enter
      document.addEventListener("keypress", function(e){
         if(e.keyCode === 13 || e.which === 13){
            e.preventDefault();
            return false;
         }
      })

      //click edit icon
      document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

      //submit item changes
      document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

      //delete item click
      document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

      //back button click
      document.querySelector(UISelectors.backBtn).addEventListener("click", ui.clearEditState);

      //clear button click
      document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItems);
   }

   //add item submit
   function itemAddSubmit(e) {
      //get input value from UI
      const input = ui.getItemInput();

      //check if inputs are empty
      if(input.name !== '' && input.calories !== '') {
         //Add item
         const newItem = item.addItem(input.name, input.calories);
         //add item to ui
         ui.addListItem(newItem);

         //get total calories
         const totalCalories = item.getTotalCalories();

         //show total calories in ui
         ui.updateTotalCalories(totalCalories);
      }   
      
      e.preventDefault();
   }

   function itemEditClick(e){
      if(e.target.classList.contains('edit-item')){
         //get list item id
         const listId = parseInt(e.target.parentElement.parentElement.id.slice(-1));
         
         //get item
         const itemToEdit = item.getItemById(listId);

         //add item to form
         ui.addItemToForm();
      }
      e.preventDefault();
   }

   function itemUpdateSubmit(e){
      //get input values
      const input = UICtrl.getItemInput();

      //update data
      const updatedItem = item.updateItem(input.name, input.calories);

      //update ui
      ui.updateListItem(updatedItem);

      //get total calories
      const totalCalories = item.getTotalCalories();
      //show total calories in ui
      ui.updateTotalCalories(totalCalories);
      
      e.preventDefault();
   }

   function itemDeleteSubmit(e) {
      //get current item
      const currentItem = item.getCurrentItem();

      //delete item from data
      item.deleteItem(currentItem.id);

      //delete from ui
      ui.deleteListItem(currentItem.id);

      //get total calories
      const totalCalories = item.getTotalCalories();
      //show total calories in ui
      ui.updateTotalCalories(totalCalories);

      e.preventDefault();
   }

   function clearAllItems(e){
      //delete all from data
      item.clearAllData();

      //remove items from ui
      ui.removeItems();

      //get total calories
      const totalCalories = item.getTotalCalories();
      //show total calories in ui
      ui.updateTotalCalories(totalCalories);
      
      e.preventDefault();
   }

   function init() {
      //set init state / clear edit state
      ui.clearEditState();
      //load events
      loadEventListeners();

      //fetch items
      const items = item.getItems();

      if(items.length === 0){
         ui.hideList();
      } else {
         //populate list
         ui.populateItemList(items);
      }

      //get total calories
      const totalCalories = item.getTotalCalories();
      //show total calories in ui
      ui.updateTotalCalories(totalCalories);
   }

   return {
      init: init
   }
   
})(ItemCtrl, UICtrl);

//Init app
App.init();