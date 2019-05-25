$("#add_Order_form").submit(function (event) {
    event.preventDefault();

    

            data = {
                "supplierName": $("#addOrder_inputSupplier").val(),
                "companyName": $("#addOrder_inputCompany").val(),
                "email": $("#addOrder_inputEmail").val(),
                "phone": $("#addOrder_inputPhone").val(),
                "product": $("#addProduct_inputProductName").val(),
                "qty": $("#addOrdder_inputQty").val()
            }
            
            $.ajax("http://localhost:8083/sellnbye/api/order", {
                data: JSON.stringify(data),
                contentType: 'application/json',
                type: 'POST'
            }).done(function (response) {
                if (response === true) {
                    location.reload();
                    alert("Added Successfully");
                }
                else {
                    alert("Adding order failed");
                }
            });
        
    
});