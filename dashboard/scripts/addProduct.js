$("#add_Product_form").submit(function (event) {
    event.preventDefault();

    if ($("#addProduct_inputProductImage").prop('files')[0].size / 1024 / 1024 > 1) {
        alert('Please use an image less than 1MB')
    } else {
        var reader = new FileReader();
        reader.readAsDataURL($("#addProduct_inputProductImage").prop('files')[0]);
        reader.onload = function () {

            data = {
                "creator": $("#addProduct_inputCreator").val(),
                "productName": $("#addProduct_inputProductName").val(),
                "productImage": reader.result,
                "productDescription": $("#addProduct_inputDescription").val(),
                "productPrice": $("#addProduct_inputPrice").val(),
                "productCount": $("#addProduct_inputQty").val()
            }
            
            $.ajax("http://localhost:8083/sellnbye/api/product", {
                data: JSON.stringify(data),
                contentType: 'application/json',
                type: 'POST'
            }).done(function (response) {
                if (response === true) {
                    location.reload();
                    alert("Added Successfully");
                }
                else {
                    alert("Adding product details failed");
                }
            });
        };
    }
});