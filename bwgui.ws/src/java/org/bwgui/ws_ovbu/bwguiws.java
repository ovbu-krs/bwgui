/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.bwgui.ws_ovbu;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;


/**
 *
 * @author Oleg
 */
@WebService(serviceName = "bwguiws")
public class bwguiws {

    
    /**
     * Операция веб-службы
     * @param parameter строка с параметрами
     * @return оббработанный результат
     */
    @WebMethod(operationName = "do_event")
    public String do_event(@WebParam(name = "parameter") String parameter) {
        //TODO write your implementation code here:
        return BWGUIServlet.Exec(parameter);
    }
}
