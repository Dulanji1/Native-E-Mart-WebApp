function myAccountOnClickHandler() {
    console.log('clicked');
    const sessionData = getSession();

    if (!sessionData.authenticated) {
        window.location.href = "./dashboard/auth-login.html";
        return;
    }

    $.confirm({
        title: 'My Account',
        columnClass: 'col-md-12',
        content: `
            <div class="card mt-3">
                <div class="card-header">
                Profile
                </div>
                <div class="card-body">
                    <div>
                      <div class="form-group">
                        <label for="txtEmail">Email address</label>
                        <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Enter email" disabled>
                      </div>
                      <div class="form-group">
                        <label for="txtName">Name</label>
                        <input type="text" class="form-control" id="txtName" placeholder="Name">
                        <span class="text-danger err-name d-none">Enter valid name.</span>
                      </div>
                      <div class="form-group">
                        <label for="txtPhone">Phone</label>
                        <input type="Tel" class="form-control" id="txtPhone" placeholder="Phone">
                        <span class="text-danger err-phone d-none">Enter valid phone number.</span>
                      </div>
                      <button type="button" class="btn btn-danger" onclick="resetPassword()">Reset-Password</button>
                      <button type="button" id="btnUpdateUser" class="btn btn-primary float-right">Submit</button>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
              <div class="card-header">
                Orders
              </div>
              <div class="card-body">
                <table class="table" id="tblPortfolio">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                </tbody>
            </table>
              </div>
            </div>
            
    `,
        buttons: {
            cancel: function () {
                //close
            },
        },
        onContentReady: function () {
            $('#tblPortfolio').DataTable();

            this.$content.find("#txtEmail").val(sessionData.authData.user.email);
            this.$content.find("#txtName").val(sessionData.authData.user.name);
            this.$content.find("#txtPhone").val(sessionData.authData.user.phone);

            $('.succ-message').addClass('d-none');

            const scope = this.$content;

            $('#btnUpdateUser').on('click', function () {
                $('.err-phone').addClass('d-none');
                $('.err-name').addClass('d-none');

                const email = scope.find("#txtEmail").val();
                const name = scope.find("#txtName").val();
                const phone = scope.find("#txtPhone").val();

                if (name.length < 1) {
                    $('.err-name').removeClass('d-none');
                    return;
                }

                if (phone.length < 9) {
                    $('.err-phone').removeClass('d-none');
                    return;
                }

                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "PUT"; // POST type function
                ajaxCallParams.Url = UPDATE_USER_END_POINT; // Pass Complete end point Url e-g Payment Controller, Create Action
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                // Set Data parameters
                ajaxDataParams.email = email;
                ajaxDataParams.phone = phone;
                ajaxDataParams.name = name;

                ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
                    // check qpi request is success
                    if (result.status === 200) {
                        // fetch the data
                        const authData = result.responseJSON;

                        const oldData  = getSession();
                        console.log();
                        oldData.authData.user = authData.data.user;
                        SetSession(oldData);
                    }
                });
            });
        }
    });
}
