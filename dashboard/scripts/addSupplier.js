$("#Supplier_form").submit(function (event) {
    event.preventDefault();

    
        /*var reader = new FileReader();
        reader.onload = function () {*/

            data = {
                "suppliername": $("#inputSupplierName").val(),
                "companyname": $("#addSup_inputCompany").val(),
                "productitem": $("#addSupplier_inputItem").val(),
                "address": $("#addSupplier_inputAddress").val(),
                "contact": $("#addSupplier_inputContact").val(),
                "email": $("#addSupplier_inputEmail").val()
            }
            
            $.ajax("http://localhost:8083/sellnbye/api/supplier", {
                data: JSON.stringify(data),
                contentType: 'application/json',
                type: 'POST'
            }).done(function (response) {
                if (response === true) {
                    location.reload();
                    alert("Added Successfully");
                }
                else {
                    alert("Adding user failed");
                }
            });
        
    
});