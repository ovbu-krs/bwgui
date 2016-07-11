/*!
 * BWGUI Library v1.0.0
 * https://bwgui.org/
 *
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://bwgui.org/license
 *
 * Date: 2016-06-26
 */
        

var initialData = [{id_object: 1, id_event: 1, params: 1},
                   {id_object: 2, id_event: 2, params: 2}];
                
                


this.PagedGridModel = function(items) 
{
    var self = this;
    self.items = ko.observableArray();
    self.items.push(ko.observableArray(items));
    //self.items.push(ko.observable(1));
    console.log('массив проинициализирован');

    self.getElemenet = function(element)
    {
        console.log('отрабатывает getElemenet('+element+')');
        var mas = self.items.slice(0, self.items.count);
        return  mas[element];
    };
    
    self.getItemOfElemenet = function(element, idx)
    {
        console.log('отрабатывает getItemOfElemenet('+idx+')');
        var mas = self.getElemenet(element);
        return  mas.slice(0, mas.count)[idx];
       
    };
    self.deleteItemOfElemenet = function(element, idx)
    {
        console.log('отрабатывает deleteItemOfElemenet('+element+','+idx+')');
        var mas = self.getElemenet(element);
        mas.splice(idx, 1)[0];
       
    };
    self.setItemOfElemenet = function(element, idx, _eitem) 
    {
        self.getElemenet(element).splice(idx,1);
        ko.tasks.runEarly();
        self.getElemenet(element).splice(idx, 0, _eitem);
        console.log('отработало editItemOfElemenet('+element+','+idx+')');
       
                
    };
    self.addItemOfElemenet = function(element, _aitem) 
    {
        self.getElemenet(element).push(_aitem); 
        console.log('отработало addItemOfElemenet('+_aitem.id_object+')');
    };


    self.jumpToFirstPage = function() {
        self.gridViewModel.currentPageIndex(0);
    };

    self.gridViewModel = function(element, columns)
    {
        return new ko.simpleGrid.viewModel({
        data: self.getElemenet(element),
        columns: columns,
        pageSize: 4
        });
        console.log('отработало gridViewModel');  
    };    
        
    console.log('отработало PagedGridModel');  
};

ko.applyBindings(new PagedGridModel(initialData));

function CallWS(_param)
{
    var ws_url = "http://10.45.200.68:8080/bwgui.ws/BWGUIServlet";
    var full_url = ws_url +"?keys"+ _param;
    $.ajax({
                url: ws_url,
                data: "keys="+ _param,
                dataType: "json",
                crossDomain: true,
                success: DisplayRez
            });
}
