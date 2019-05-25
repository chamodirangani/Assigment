$("#products_productlist").ready(function () {

    $.ajax("http://localhost:8083/sellnbye/api/product", {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        var newItem = "";
        $.each(response, function (index, value) {

            newItem += `<hr class="soften">
            <div class="row-fluid">
                <div class="span2">
                    <img src="${value.productImage}" alt="" height="130" width="100">
                </div>
                <div class="span6">
                    
                    <h5 class="productName_header_id">${value.productName}</h5>
                    <p>
                       Product Creator: ${value.creator}
                    </p>
                    </br>
                    <p>
                        Available Quantity: ${value.productCount}
                    </p>
                </div>
                <div class="span4 alignR">
                    <form class="form-horizontal qtyFrm">
                        <h3>Rs: ${value.productPrice}</h3><br>
                        <div class="btn-group">
                        <button type="button" id="product_editProduct_btn" class="btn btn-primary">
                            EDIT
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <button type="button" id="product_deleteProduct_btn" class="btn btn-danger">
                            DELETE
                        </button>
                        </div>
                    </form>
                </div>
            </div>`;
        });

        $("#products_productlist").append(newItem);
    });
});

$('body').on('click', '#product_editProduct_btn', function (event) {
    var productname = $(event.target).parent().parent().parent().parent().find('.productName_header_id').html();

    $.ajax(`http://localhost:8082/sellnbye/api/product/${productname}`, {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        $("#editproduct_inputname").val(response.productName);
        $("#editproduct_inputDPrice").val(response.productPrice);
        $("#editproduct_inputQty").val(response.productCount);
    });

    $('#exampleModal1').modal('show');
});


$('body').on('click', '#product_deleteProduct_btn', function (event) {
    var productname = $(event.target).parent().parent().parent().parent().find('.productName_header_id').html();

    $.ajax(`http://localhost:8083/sellnbye/api/product/${productname}`, {
        contentType: 'application/json',
        type: 'DELETE'
    }).done(function (response) {
        location.reload();
        if (response) {
            alert("Successfully Deleted");
        } else {
            alert("Delete Failed");
        }
    });
});

$("#product_form").submit(function (event) {
    event.preventDefault();

    var requestData = {
        productName : $("#editproduct_inputname").val(),
        productPrice : $("#editproduct_inputDPrice").val(),
        productCount : $("#editproduct_inputQty").val()
    };
    console.log(requestData);

    $.ajax("http://localhost:8083/sellnbye/api/product", {
                data: JSON.stringify(requestData),
                contentType: 'application/json',
                type: 'PUT'
            }).done(function (response) {
                if (response === true) {
                    location.reload();
                    alert("Edited successfully");
                }
                else {
                    alert("Editing user failed");
                }
            });

    $('#exampleModal').modal('toggle');
});