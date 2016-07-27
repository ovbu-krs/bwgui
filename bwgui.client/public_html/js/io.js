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
        

/* global data, textStatus, errorThrown */

var initialData = [{id_object: 1, id_event: 1, params: 1},
                   {id_object: 2, id_event: 2, params: 2}];
                



this.DataModel = function() 
{
    var self = this;
    self.items = ko.observableArray();
    
    self.addData = function(name, element)
    {
        self.items.push({id: name, value: ko.observableArray(element)});
        //for (var i = 0; i < element.length; ++i) 
        //{
        //     self.addItemOfElemenetById(name, element[i]);
        //}
       
      

        console.log('отработало addData('+name+','+element+')');
    };
    
   
    //self.items.push(ko.observable(1));
    console.log('массив проинициализирован');
    
  
    self.getData = function(element)
    {
        console.log('отрабатывает getData('+element+')');
        var mas = self.items.slice(0, self.items.count);
        return  mas[element].value;
        //return self.items[element];
    };
    
    self.getDataById = function(id)
    {
        console.log('отрабатывает getDataById('+id+')');
        var mas = self.items.slice(0, self.items.count);
        for (var i = 0; i < mas.length; ++i) 
        {
            if(mas[i].id===id)
                return mas[i].value;
        }
        return null;
        
    };
    
   
    self.getItemOfElemenet = function(element, idx)
    {
        console.log('отрабатывает getItemOfElemenet('+element+','+ idx+')');
        var mas = self.getData(element);
        return  mas.slice(0, mas.count)[idx];
       
    };
    
    self.getItemOfElemenetById = function(id, idx)
    {
        console.log('отрабатывает getItemOfElemenetById('+id +','+idx+')');
        var mas = self.getDataById(id);
        return  mas.slice(0, mas.count)[idx];
       
    };
    
    self.deleteItemOfElemenet = function(element, idx)
    {
        console.log('отрабатывает deleteItemOfElemenet('+element+','+idx+')');
        var mas = self.getData(element);
        mas.splice(idx, 1)[0];
       
    };
    self.setItemOfElemenet = function(element, idx, _eitem) 
    {
        self.getData(element).splice(idx,1);
        ko.tasks.runEarly();
        self.getData(element).splice(idx, 0, _eitem);
        console.log('отработало editItemOfElemenet('+element+','+ idx+','+ _eitem+')');
       
                
    };
    self.addItemOfElemenet = function(element, _aitem) 
    {
        self.getData(element).push(_aitem); 
        console.log('отработало addItemOfElemenet('+element+','+ _aitem+')');
    };
    
    self.addItemOfElemenetById = function(id, _aitem) 
    {
        self.getDataById(id).push(_aitem); 
        console.log('отработало addItemOfElemenetById('+id+','+ _aitem+')');
    };


    self.jumpToFirstPage = function() {
        self.gridViewModel.currentPageIndex(0);
    };

    self.getGridViewModel = function(element, columns)
    {
        console.log('отработывает getGridViewModel( '+element+','+ columns+')');  
        return new ko.simpleGrid.viewModel({
        data: self.getData(element),
        columns: columns,
        pageSize: 4
        });
        
    };
    
    self.getGridViewModelById = function(id, columns)
    {
        console.log('отработывает getGridViewModelById('+id+','+ columns+')');  
        return new ko.simpleGrid.viewModel({
        data: self.getDataById(id),
        columns: columns,
        pageSize: 4
        });
        
    };
    
    self.PutData =function()
    {
        console.log('начало работать PutData'); 
        self.CallWS('{"idApp":0, "idObj":0, "idEvnt":0, "args":{"tableowner":"pgsql","schemaname":"bwgui_processor"}}');
        console.log('отработало PutData'); 
    };

    self.CallWS = function(_param)
    {
        var ws_url = "http://ovbu:8080/bwgui.ws2/servlet";
        //var full_url = ws_url +"?keys"+ _param;
        $.ajax({
                    url: ws_url,
                    data: "parameter="+ _param,
                    dataType: "text",
                    crossDomain: true,
                    success: self.WorkRez,
                    error: self.DisplayErr,
                    fail: self.WorkRez

                });

               /* $.ajax({
                            url: 'BWGUIServlet',
                            data: "keys="+ $("#name").val(),
                            success: function(data){
                                $("#uot").val(data);
                            }
                        }       */
    };
    
    this.makeUI = function(parent, content)
    {      
        console.log('начало работать makeUI('+parent+','+ content+')'); 
        var div = document.createElement("div");
        div.innerHTML = content;
        document.getElementById(parent).appendChild(div);
        
      
        
        
        //console.log('отрабатывает applyBindingsToNode');
        //console.log('grid2: '+self.getDataById('grid2'));
        //ko.applyBindingsToNode(document.getElementById('grid2'), self.getDataById('grid2'));
        
        console.log('отработало makeUI('+parent+','+ content+')'); 
        
    };
     
    
    self.WorkRez = function(_data, _textStatus)
    {
        console.log('начало работать WorkRez'); 
        
        if (JSON.parse(_data).hasOwnProperty("data"))
        {
            self.addData(JSON.parse(_data)["objId"], JSON.parse(_data)["data"]);
        }
        
        if (JSON.parse(_data).hasOwnProperty("view")) 
        {
            self.makeUI(JSON.parse(_data)["objId_parent"], JSON.parse(_data)["view"]);
            //self.addItemOfElemenetById('grid2', '1');
        }
        
          self.getDataById('grid2').valueHasMutated();
         ko.utils.arrayPushAll(self.getDataById('grid2'), JSON.parse(_data)["data"]);
        

        console.log('oтработало WorkRez'); 
    };
    self.DisplayErr = function(_XMLHttpRequest, _textStatus, _errorThrown)
    {
        //document.getElementById("3").innerHTML = _XMLHttpRequest + "("+_textStatus+")";
        console.log('отработало DisplayErr'); 
    };
    
        
    console.log('отработало PagedGridModel');  
};

function Init()
{
    dModel = new DataModel();
    dModel.addData('grid', initialData);
    ko.applyBindings(dModel);
    console.log('применился биндинг');
};
/*
ko.bindingProvider.instance.preprocessNode = function(node) {
    // Use DOM APIs such as setAttribute to modify 'node' if you wish.
    // If you want to leave 'node' in the DOM, return null or have no 'return' statement.
    // If you want to replace 'node' with some other set of nodes,
    //    - Use DOM APIs such as insertChild to inject the new nodes
    //      immediately before 'node'
    //    - Use DOM APIs such as removeChild to remove 'node' if required
    //    - Return an array of any new nodes that you've just inserted
    //      so that Knockout can apply any bindings to them
    console.log('!!!!!!!!!!!вызов preprocessNode');
};
*/

