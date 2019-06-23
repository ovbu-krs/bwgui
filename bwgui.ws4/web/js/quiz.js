var initialData = [{id_object: 1, id_event: 1, params: 1},
                   {id_object: 2, id_event: 2, params: 2}];
                
                


this.PagedGridModel = function(items) 
{
    var self = this;

            
    self.items = ko.observableArray(items);

 
    
     self.getVal = function(idx)
    {
        
        console.log('отрабатывает getVal('+idx+')');
        return  self.items.slice(0,self.items.count)[idx];
       
    };
     self.editThisItem = function(idx, _eitem) {

        self.items.splice(idx,1);
        ko.tasks.runEarly();
        self.items.splice(idx, 0, _eitem);
        console.log('отработало editThisItem('+idx+')');
       
                
    };
     self.addThisItem = function(_aitem) {
        
            self.items.push(_aitem); 
        
        console.log('отработало addThisItem('+_aitem.id_object+')');
       
                
    };

     self.addItem = function() {
         
            self.items.push({id_object: 0, id_event: 0, params: 0}); 
         
        console.log('отработало addItem');
       
                
    };

    self.sortByName = function() {
        self.items.sort(function(a, b) {
            return a.id_object < b.id_object ? -1 : 1;
        });
    };

    self.jumpToFirstPage = function() {
        self.gridViewModel.currentPageIndex(0);
    };

    self.gridViewModel = new ko.simpleGrid.viewModel({
        data: self.items,
        columns: [
            { headerText: "id_object", rowText: "id_object" },
            { headerText: "id_event", rowText: "id_event" },
            { headerText: "params", rowText: "params" }
        ],
        pageSize: 4
        });
        
     console.log('отработало PagedGridModel');  
};

ko.applyBindings(new PagedGridModel(initialData));