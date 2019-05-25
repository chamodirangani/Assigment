package com.paf.n3ag6.dao;

import java.io.ByteArrayInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import com.paf.n3ag6.database.DbConnection;
import com.paf.n3ag6.models.Supplier;
import com.paf.n3ag6.models.SupplierUpdateModel;


public class SupplierDao {

	private Connection _dbConnection;

	public SupplierDao() {
		this._dbConnection = new DbConnection().getConnection();
	}

	public ArrayList<Supplier> getAllSuppliers() {
		ArrayList<Supplier> supplierList = new ArrayList<Supplier>();

		try {
			Statement stmt = this._dbConnection.createStatement();
			String sql;
			sql = "SELECT * FROM supplier";
			ResultSet rs = stmt.executeQuery(sql);

			while (rs.next()) {
				Supplier sup = new Supplier();
				
				sup.setSuppliername(rs.getString("supplierName"));
				sup.setCompanyname(rs.getString("companyName"));
				sup.setProductitem(rs.getString("productItem"));
				sup.setAddress(rs.getString("address"));
				sup.setContact(rs.getString("contact"));
				sup.setEmail(rs.getString("email"));
				
				supplierList.add(sup);
			}

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][getAllSuppliers] - " + ex.getMessage());
		}
		return supplierList;
	}

	public Supplier getSupplier(String supplierName) {
		Supplier sup = new Supplier();

		try {

			String sql;
			sql = "SELECT * FROM products WHERE supplier = ?";

			PreparedStatement stmt = this._dbConnection.prepareStatement(sql);

			stmt.setString(1, supplierName);

			ResultSet rs = stmt.executeQuery();

			if (rs.next()) {
				
				sup.setSuppliername(rs.getString("supplierName"));
				sup.setCompanyname(rs.getString("companyName"));
				sup.setProductitem(rs.getString("productItem"));
				sup.setAddress(rs.getString("address"));
				sup.setContact(rs.getString("contact"));
				sup.setEmail(rs.getString("email"));
				
			}

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][getSupplier] - " + ex.getMessage());
		}

		return sup;
	}

	public boolean addSupplier(Supplier sup) {
		boolean isSuccess;
		try {

			String sql;
			sql = "INSERT INTO supplier (supplierName,companyName,productItem,address,contact,email) VALUES (?,?,?,?,?,?)";

			PreparedStatement stmt = this._dbConnection.prepareStatement(sql);

			stmt.setString(1, sup.getSuppliername());
			stmt.setString(2, sup.getCompanyname());
			stmt.setString(3, sup.getProductitem());
			stmt.setString(4, sup.getAddress());
			stmt.setString(5, sup.getContact());
			stmt.setString(6, sup.getEmail());

			isSuccess = stmt.executeUpdate() > 0;

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][addSupplier] - " + ex.toString());
			isSuccess = false;
		}
		return isSuccess;
	}

	public boolean updateSupplier(String supplierId, Supplier sup) {

		boolean isSuccess = false;

		try {

			String sql = "UPDATE supplier SET supplierName=?, companyName=?, productItem=?, address=?, contact=?, email=? WHERE supplierId=?";

			PreparedStatement stmt = this._dbConnection.prepareStatement(sql);

			stmt.setString(1, sup.getSuppliername());
			stmt.setString(2, sup.getCompanyname());
			stmt.setString(3, sup.getProductitem());
			stmt.setString(4, sup.getAddress());
			stmt.setString(5, sup.getContact());
			stmt.setString(6, sup.getEmail());
			stmt.setString(7, supplierId);

			isSuccess = stmt.executeUpdate() > 0;

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][updateSupplier] - " + ex.toString());
		}

		return isSuccess;
	}

	public boolean updateSupplier(SupplierUpdateModel supplier) {
		boolean isSuccess;
		try {

			String sql;
			sql = "UPDATE supplier SET companyName = ? ,productItem = ? , address = ? WHERE supplierName = ?";

			PreparedStatement stmt = this._dbConnection.prepareStatement(sql);

			stmt.setString(4, supplier.getSupplierName());
			stmt.setString(1, supplier.getCompanyName());
			stmt.setString(2, supplier.getProductItem());
			stmt.setString(3, supplier.getAddress());

			isSuccess = stmt.executeUpdate() > 0;

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][updateSupplier] - " + ex.toString());
			isSuccess = false;
		}
		return isSuccess;
	}

	
	public boolean deleteSupplier(String Suppliername) {
		boolean isSuccess = false;
		try {

			String sql;
			sql = "DELETE FROM supplier WHERE supplierName = ?";

			PreparedStatement stmt = this._dbConnection.prepareStatement(sql);

			stmt.setString(1, Suppliername);
			

			isSuccess = stmt.executeUpdate() > 0;

		} catch (Exception ex) {
			System.out.println("[Error][SupplierDao][deleteSupplier] - " + ex.toString());
			isSuccess = false;
		}
		return isSuccess;
	} 
	
	
	public void dispose() {
		try {
			if (!this._dbConnection.isClosed()) {
				System.out.println("[Info][UserDao][dispose] - Closing DB connection");
				this._dbConnection.close();
			}
		} catch (Exception e) {
			System.out.println("[Error][UserDao][dispose] - " + e.getMessage());
		}
	};
}



