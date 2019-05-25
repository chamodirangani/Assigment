$("#users_userlist").ready(function () {

    $.ajax("http://localhost:8082/sellnbye/api/user", {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        var newItem = "";
        $.each(response, function (index, value) {

            newItem += `<hr class="soften">
            <div class="row-fluid">
                <div class="span2">
                    <img src="${value.profilePicture}" alt="" height="130" width="100">
                </div>
                <div class="span6">
                    <h5 class="username_header_id">${value.username}</h5>
                    <p>
                        ${value.email}
                    </p>
                    </br>
                    <p>
                        ${value.contactNo}
                    </p>
                </div>
                <div class="span4 alignR">
                    <form class="form-horizontal qtyFrm">
                        <h3> ${value.userType}</h3><br>
                        <div class="btn-group">
                        <button type="button" id="user_editUser_btn" class="btn btn-primary">
                            EDIT
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <button type="button" id="user_deleteUser_btn" class="btn btn-danger">
                            DELETE
                        </button>
                        </div>
                    </form>
                </div>
            </div>`;
        });

        $("#users_userlist").append(newItem);
    });
});

$("#login_form").submit(function (event) {
    event.preventDefault();
    data = {
        "password": SHA256($("#login_inputPassword").val()).toUpperCase(),
        "username": $("#login_inputUserName").val()
    }
    $.ajax("http://localhost:8082/sellnbye/api/user/login", {
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST'
    }).done(function (response) {
        console.log(response);
    });
});

$('body').on('click', '#user_editUser_btn', function (event) {
    var username = $(event.target).parent().parent().parent().parent().find('.username_header_id').html();

    $.ajax(`http://localhost:8082/sellnbye/api/user/${username}`, {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        $("#edituser_inputUsername").val(response.username);
        $("#edituser_inputContactnumber").val(response.contactNo);
        $("#edituser_inputEmail").val(response.email);

        if (response.isActive) {
            $("#edituser_isActive").prop('checked', true);
        } else {
            $("#edituser_isActive").prop('checked', false);
        }
    });

    $('#exampleModal').modal('show');
});

$('body').on('click', '#user_deleteUser_btn', function (event) {
    var username = $(event.target).parent().parent().parent().parent().find('.username_header_id').html();

    $.ajax(`http://localhost:8082/sellnbye/api/user/${username}`, {
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

$("#edituser_form").submit(function (event) {
    event.preventDefault();

    var requestData = {
        username : $("#edituser_inputUsername").val(),
        isActive : $("#edituser_isActive").prop('checked'),
        contactNo : $("#edituser_inputContactnumber").val(),
        email : $("#edituser_inputEmail").val()
    };
    console.log(requestData);

    $.ajax("http://localhost:8083/sellnbye/api/user", {
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