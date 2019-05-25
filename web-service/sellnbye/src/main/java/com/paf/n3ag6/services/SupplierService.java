package com.paf.n3ag6.services;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import com.paf.n3ag6.dao.SupplierDao;

import com.paf.n3ag6.models.SupplierUpdateModel;
import com.paf.n3ag6.models.Supplier;

@Path("/supplier")
public class SupplierService {
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Supplier> GetSupplierList() {
		SupplierDao supDao = new SupplierDao();
		try {
			ArrayList<Supplier> suppList = new ArrayList<Supplier>();
			suppList = supDao.getAllSuppliers();
			return suppList;
		} finally {
			supDao.dispose();
		}
	}

	@GET
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Supplier GetSupplier(@PathParam("name") String name) {
		SupplierDao userDao = new SupplierDao();
		try {
			Supplier supplier = new Supplier();
			supplier = userDao.getSupplier(name);
			return supplier;
		} finally {
			userDao.dispose();
			System.out.println("[Info][supplierService][GetSupplier] - userDao disposed.");
		}
	}

	@DELETE
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean DeleteSupplier(@PathParam("name") String name) {
		SupplierDao suppDao = new SupplierDao();
		try {
			return suppDao.deleteSupplier(name);
		} finally {
			suppDao.dispose();
			System.out.println("[Info][SupplierService][DeleteSupplier] - suppDao disposed.");
		}
	}
	
	@POST
	@Path("")
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean AddSupplier(Supplier sup) {
		SupplierDao supDao = new SupplierDao();
		try {
			
			return supDao.addSupplier(sup);
		} finally {
			supDao.dispose();
		}
	}

	@PUT
	@Path("/{name}")
	public Response EditUserStatus(@PathParam("name") String name) {

		String output = "Jersey say : ";

		return Response.status(200).entity(output).build();

	}

	@PUT
	@Path("")
	public boolean EditUser(SupplierUpdateModel supplier) {
		SupplierDao supplierDao = new SupplierDao();
		try {
			
				return supplierDao.updateSupplier(supplier);
			
		} finally {
			supplierDao.dispose();
		}
	}
	
	@POST
	@Path("/{name}/address")
	public Response AddAddressStatus(@PathParam("name") String name) {

		String output = "Jersey say : ";

		return Response.status(200).entity(output).build();

	}

	@DELETE
	@Path("/{name}/address/{id}")
	public Response DeleteAddressStatus(@PathParam("name") String name, @PathParam("id") int id) {

		String output = "Jersey say : ";

		return Response.status(200).entity(output).build();

	}

	@PUT
	@Path("/{supplierId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean UpdateProduct(@PathParam("supplierId") String supplierId, Supplier sup) {
		SupplierDao supplierDao = new SupplierDao();
		try {

			return supplierDao.updateSupplier(supplierId, sup);

		} finally {
			supplierDao.dispose();
		}
	}

}




