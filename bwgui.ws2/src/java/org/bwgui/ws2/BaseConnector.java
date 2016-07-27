/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.bwgui.ws2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


/**
 *
 * @author Oleg
 */
public class BaseConnector 
{
    public static String Exec(String args) 
    {
        String rez = "";
        try (
                Connection connection = DriverManager.getConnection("jdbc:postgresql://192.168.1.143:5432/postgres", "postgres", "postgres"); 
                Statement satement = connection.createStatement(); 
                ResultSet result = satement.executeQuery("select bwgui_processor.do_event('" + args + "')");
             ) 
        {
            while(result.next())
            {
                rez += result.getString(1) + "\n";
                //System.out.println( rs.getString(0));
            }
        }
        catch (SQLException e) 
        {
            //rez = "errr";
            rez = e.getMessage();
        }
        return rez;
    }
}
