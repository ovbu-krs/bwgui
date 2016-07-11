/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.bwgui.ws;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
/**
 *
 * @author dalavrov
 */
public class DB {
    public static String Get(String[] args) {
       Connection connection;
       Statement stmt;
       ResultSet rs;
       String errMessage = "Чтото неполучилось";
       String out= "";
        
       try{
           try{
           Class.forName("org.postgresql.Driver");
           } catch (Exception e) {
           errMessage = e.getMessage();
           return  "Хуев как дров \n подключи драйвер базы" + e.getMessage();
         }
           connection = DriverManager.getConnection(
                   "jdbc:postgresql://10.45.200.68:5432/Transport", "postgres", "vpul");
           String query = 
                   "select description from public.test where id = " + args[0].toString() + 
                                " and name like '" + args[1].toString() + "' ";
           stmt = connection.createStatement();
           rs = stmt.executeQuery(query);
          
           
           try{
              while(rs.next()){
                      out += rs.getString(1) + "\n";
                    //System.out.println( rs.getString(0));
              }
              rs.close();
              
           } catch (SQLException e) {
               errMessage = e.getMessage();
               return errMessage;
             }
           
       } catch (Exception e) {
           errMessage = e.getMessage();
           return errMessage;
         }
       if (out =="") out = "Нихуя не понял";
       return out;
       }
    public static String Exec(String args) {
       Connection connection;
       Statement stmt;
       ResultSet rs;
       String errMessage = "Чтото неполучилось";
       String out= "";
       try{
           try{
           Class.forName("org.postgresql.Driver");
           } catch (Exception e) {
           errMessage = e.getMessage();
           return  "Хуев как дров \n подключи драйвер базы" + e.getMessage();
         }
           connection = DriverManager.getConnection(
                   "jdbc:postgresql://10.45.200.68:5432/Transport", "postgres", "vpul");
           String query = 
                   "select json_build_array('" + args + "')";
           stmt = connection.createStatement();
           rs = stmt.executeQuery(query);
           try{
              while(rs.next()){
                      out += rs.getString(1) + "\n";
                    //System.out.println( rs.getString(0));
              }
              rs.close();
              connection.close();
              stmt.close();
              
           } catch (SQLException e) {
               errMessage = e.getMessage();
               return errMessage;
             }
           
       } catch (Exception e) {
           errMessage = e.getMessage();
           return errMessage;
         }
       if (out =="") out = "Нихуя не понял";
       return out;
       }
   
    
    
}
