package com.paf.n3ag6.database;

import java.sql.Connection;
import java.sql.DriverManager;

public class DbConnection{
	
	public Connection getConnection(){
		try {
	        Class.forName("com.mysql.jdbc.Driver");
	        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/paf_n3a_g6_database?useSSL=false","root", "root");
	        System.out.println("[Info][DbConnection][getConnection] - Opening DB connection");
	        return connection;
	    }catch(Exception ex) {
	    	System.out.println("[Error][DbConnection][getConnection] - "  + ex.toString());
	    	return null;
	    }
	}
	
}