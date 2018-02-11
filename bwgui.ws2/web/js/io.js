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




/* global data, textStatus, errorThrown, System */


var initialData = [{id_object: 1, id_event: 1, params: 1},
                   {id_object: 2, id_event: 2, params: 2}];
                
//Context ctx = (new javax.naming.InitialContext.InitialContext()).getParamater("ip_server");



DataModel = function() 
{
    var self = this;
    self.items = ko.observableArray();
    self.cur_server ;
     
    self.set_server = function(_server)
    {
        self.cur_server = _server;
        self.put_log('cur_server: '+self.cur_server);
    };
    self.put_log = function(_txt)
    {
       console.log(_txt);
       
    };
    
    self.addData = function(name, element)
    {
        self.items.push({id: name, value: ko.observableArray(element)});
        //for (var i = 0; i < element.length; ++i) 
        //{
        //     self.addItemOfElemenetById(name, element[i]);
        //}
       
        self.put_log('отработало addData('+name+','+element+')');
    };
    
   
    //self.items.push(ko.observable(1));
    self.put_log('массив проинициализирован');
    
  
    self.getData = function(element)
    {
        self.put_log('отрабатывает getData('+element+')');
        var mas = self.items.slice(0, self.items.count);
        return  mas[element].value;
        //return self.items[element];
    };
    
    self.getDataById = function(id)
    {
        self.put_log('отрабатывает getDataById('+id+')');
        var mas = self.items.slice(0, self.items.count);
        for (var i = 0; i < mas.length; ++i) 
        {
            if(mas[i].id===id)
            {
                //self.put_log(mas[i].value);
                return mas[i].value.slice(0, mas.count);
            }
        }
        return null;
        
    };
    
   
    self.getItemOfElemenet = function(element, idx)
    {
        self.put_log('отрабатывает getItemOfElemenet('+element+','+ idx+')');
        var mas = self.getData(element);
        return  mas.slice(0, mas.count)[idx];
       
    };
    
    self.getItemOfElemenetById = function(id, idx)
    {
        self.put_log('отрабатывает getItemOfElemenetById('+id +','+idx+')');
        var mas = self.getDataById(id);
        return  mas.slice(0, mas.count)[idx];
       
    };
    
    self.deleteItemOfElemenet = function(element, idx)
    {
        self.put_log('отрабатывает deleteItemOfElemenet('+element+','+idx+')');
        var mas = self.getData(element);
        mas.splice(idx, 1)[0];
       
    };
    self.setItemOfElemenet = function(element, idx, _eitem) 
    {
        self.getData(element).splice(idx,1);
        ko.tasks.runEarly();
        self.getData(element).splice(idx, 0, _eitem);
        self.put_log('отработало editItemOfElemenet('+element+','+ idx+','+ _eitem+')');
       
                
    };
    self.addItemOfElemenet = function(element, _aitem) 
    {
        self.getData(element).push(_aitem); 
        self.put_log('отработало addItemOfElemenet('+element+','+ _aitem+')');
    };
    
    self.addItemOfElemenetById = function(id, _aitem) 
    {
        self.getDataById(id).push(_aitem); 
        self.put_log('отработало addItemOfElemenetById('+id+','+ _aitem+')');
    };


    self.jumpToFirstPage = function() {
        self.gridViewModel.currentPageIndex(0);
    };

    self.getGridViewModel = function(_element, _columns)
    {
        self.put_log('отработывает getGridViewModel( '+_element+','+ _columns+')');  
        return new ko.simpleGrid.viewModel({
        data: self.getData(_element),
        columns: _columns,
        pageSize: 4
        });
        
    };
    
    self.getGridViewModelById = function(_id, _columns)
    {
        self.put_log('отработывает getGridViewModelById('+_id+','+ _columns+')');  
        return new ko.simpleGrid.viewModel({
        data: self.getDataById(_id),
        columns: _columns,
        pageSize: 10
        });
        
    };
    
    self.DoEvent =function(_idObj, _idEvnt)
    {
        self.put_log('начало работать PutData('+_idObj+','+ _idEvnt+')'); 
        self.CallWS('{"idApp":0, "idObj":'+_idObj+', "idEvnt":'+_idEvnt+', "args":{"tableowner":"postgres","schemaname":"bwgui_processor"}}');
        self.put_log('отработало PutData('+_idObj+','+ _idEvnt+')'); 
    };

    self.CallWS = function(_param)
    {
        //ip сервера задается через function Init()
        var ws_url = "http://"+self.cur_server+"/bwgui.ws2/servlet";
        
        
        self.put_log('отработывает запрос: '+ws_url+'?parameter='+_param); 
        $.ajax({
                    url: ws_url,
                    data: "parameter="+ _param,
                    dataType: "text",
                    crossDomain: true,
                    success: self.WorkRez,
                    error: self.DisplayErr,
                    fail: self.FailErr

                });

               /* $.ajax({
                            url: 'BWGUIServlet',
                            data: "keys="+ $("#name").val(),
                            success: function(data){
                                $("#uot").val(data);
                            }
                        }       */
    };
    
    this.makeUI = function(_parent_id, _id, _content)
    {      
        if(_parent_id!=='')
        {
            self.put_log('начало работать makeUI('+'#'+_parent_id+','+_id+','+ _content+')'); 
            $('#'+_parent_id).append(_content);
            ko.cleanNode(document.getElementById(_id));
            ko.applyBindings(self, document.getElementById(_id));
            self.put_log('отработало makeUI('+_parent_id+','+ _content+')'); 
        }
        
    
    };
    this.makeStyle = function(_parent_id, _id, _content)
    {      
        if(_parent_id!=='')
        {
            self.put_log('начало работать makeStyle('+'#'+_parent_id+','+_id+','+ _content+')'); 
            $('head').append(_content);
            self.put_log('отработало makeStyle('+'#'+_parent_id+','+_id+','+ _content+')'); 
        }
        
    
    };
    self.FailErr = function(_data, _textStatus)
    {
        self.put_log('начало работать FailErr'); 
    };
    
    self.WorkRez = function(_data, _textStatus)
    {
        self.put_log('начало работать WorkRez '+_data); 
       
       
        //сначала данные потом интерфйес
        
        if (JSON.parse(_data).hasOwnProperty("data"))
        {
            self.addData(JSON.parse(_data)["objId"], JSON.parse(_data)["data"]);
        }
        if (JSON.parse(_data).hasOwnProperty("view")) 
        {
            self.makeUI(JSON.parse(_data)["objId_parent"], JSON.parse(_data)["objId"], JSON.parse(_data)["view"]);
            //self.addItemOfElemenetById('grid2', '1');
        }
        if (JSON.parse(_data).hasOwnProperty("css")) 
        {
            self.makeStyle(JSON.parse(_data)["objId_parent"], JSON.parse(_data)["objId"], JSON.parse(_data)["css"]);
            //self.addItemOfElemenetById('grid2', '1');
        }
        
        
       
        
        //  self.getDataById('grid2').valueHasMutated();
         //ko.utils.arrayPushAll(self.getDataById('grid2'), JSON.parse(_data)["data"]);
        

        self.put_log('oтработало WorkRez'); 
    };
    self.DisplayErr = function(_XMLHttpRequest, _textStatus, _errorThrown)
    {
        //document.getElementById("3").innerHTML = _XMLHttpRequest + "("+_textStatus+")";
        self.put_log('отработало DisplayErr'); 
    };
    
        
    self.put_log('отработало PagedGridModel');  
};

function Init()
{
    dModel = new DataModel();

    dModel.addData('grid', initialData);
    dModel.set_server(this.location.host);
    
    console.log('переменные инициализированы');
    
    ko.applyBindings(dModel);
    
    console.log('применился биндинг');
};

/*
function get_ip()
{
    
    ////..var ctx=javax.naming.InitialContext.create();
    console.log('hostname:'+location.hostname);
    console.log('host:'+location.host);
    return location.host;
}
*/

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
    self.put_log('!!!!!!!!!!!вызов preprocessNode');
};
*/

