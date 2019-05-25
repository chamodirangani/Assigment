$("#orders_orderlist").ready(function () {

    $.ajax("http://localhost:8083/sellnbye/api/order", {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        var newItem = "";
        $.each(response, function (index, value) {

            newItem += `<hr class="soften">
            <div class="row-fluid">
                <div class="span6">
                    
                    <h5 class="order_header_id">${value.companyName}</h5>
                    <p>
                       Supplier: ${value.supplierName}
                    </p>
                    <p>
                        Needed Product: ${value.product}
                    </p>
                    <p>
                        Needed Quantity: ${value.qty}
                    </p>
                </div>
                <div class="span4 alignR">
                <form class="form-horizontal qtyFrm">
                    
                    <div class="btn-group">
                    <button type="button" id="order_editorder_btn" class="btn btn-primary">
                        EDIT
                    </button>
                    <br/>
                    <br/>
                    <br/>
                    <button type="button" id="order_deleteorder_btn" class="btn btn-danger">
                        DELETE
                    </button>
                    </div>
                </form>
            </div>
        </div>`;
        });

        $("#orders_orderlist").append(newItem);
    });
});

$('body').on('click', '#order_editorder_btn', function (event) {
    var ordername = $(event.target).parent().parent().parent().parent().find('.order_header_id').html();

    $.ajax(`http://localhost:8082/sellnbye/api/order/${ordername}`, {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        $("#editorder_companyname").val(response.companyName);
        $("#editorder_supplierName").val(response.supplierName);
        $("#editorder_inputProduct").val(response.product);
        $("#editproduct_inputQty").val(response.qty);
    });

    $('#exampleModal3').modal('show');
});


$('body').on('click', '#order_deleteorder_btn', function (event) {
    var ordername = $(event.target).parent().parent().parent().parent().find('.order_header_id').html();

    $.ajax(`http://localhost:8083/sellnbye/api/order/${ordername}`, {
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
