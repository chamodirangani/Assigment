$("#Supplier_form1").submit(function (event) {
    event.preventDefault();


        var reader = new FileReader();
        reader.onload = function () {

            data = {
                "supplierId": $("inputSupplierId").val(),
                "supplierName": $("inputSupplierName").val(),
                "companyName": $("#addSupplier_inputCompany").val(),
                "productItem": $("addSupplier_inputItem").val(),
                "address": $("#addSupplier_inputAddress").val(),
                "contact": $("#addSupplier_inputContact").val(),
                "email": $("#addSupplier_inputEmail").val()
            }

            $.ajax("http://localhost:8082/sellnbye/api/supplier/"+data.supplierId, {
                data: JSON.stringify(data),
                contentType: 'application/json',
                type: 'PUT'
            }).done(function (response) {
                if (response === true) {
                    location.reload();
                    alert("Updated Successfully");
                }
                else {
                    alert("Updating supplier failed");
                }
            });
        };

});
