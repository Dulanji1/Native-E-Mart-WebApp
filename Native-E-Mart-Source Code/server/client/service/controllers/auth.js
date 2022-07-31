function login()
{
    $('.err-message').addClass('d-none');

    // validation
    const email = $('#txtUserName').val();
    const password = $('#txtPassword').val();

    if (email.length === 0)
    {
        $('.err-username').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-username').addClass('d-none');
    }

    if (password.length === 0)
    {
        $('.err-password').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-password').addClass('d-none');
    }

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = AUTH_END_POINT; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.email = email;
    ajaxDataParams.password = password;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            const authData = result.responseJSON;

            // get current session and set nessary data
            const sessionData = getSession();

            sessionData.authenticated = true;
            sessionData.token = authData.data.token;
            sessionData.authData = authData.data;

            // save data to session
            SetSession(sessionData);

            // check if the logged user is admin
            if (authData.data.user.role.name === 'Administrator')
            {
                window.location.replace('index.html');
            }
            else
            {
                window.location.replace('../index.html');
            }

            return;
        }

        // show the error message
        $('.err-message').removeClass('d-none').html(result.responseJSON.message);
    });
}

function createNewUser()
{
    $('.err-message').addClass('d-none');
    $('.err-email').addClass('d-none');
    $('.err-password').addClass('d-none');
    $('.err-phone').addClass('d-none');
    $('.err-password-match').addClass('d-none');

    // fetch data
    const email = $('#txtEmail').val();
    const password = $('#txtPassword').val();
    const confirmPassword = $('#txtConfirmPassword').val();
    const phoneNumber = $('#txtPhone').val();

    // check validations
    if (email.length <= 5)
    {
        $('.err-email').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-email').addClass('d-none');
    }

    if (password.length <= 5)
    {
        $('.err-password').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-password').addClass('d-none');
    }

    if (confirmPassword != password)
    {
        $('.err-password-match').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-password-match').addClass('d-none');
    }

    if (phoneNumber.length < 10)
    {
        $('.err-phone').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-phone').addClass('d-none');
    }

    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = CREATE_USER_END_POINT; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.name = email;
    ajaxDataParams.email = email;
    ajaxDataParams.password = password;
    ajaxDataParams.phone = phoneNumber;
    ajaxDataParams.role = 'User';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            const authData = result.responseJSON;

            $.confirm({
                title        : 'Congratulations',
                content      : authData.message,
                type         : 'green',
                typeAnimated : true,
                buttons      : {
                    gotoHome : {
                        text     : 'Goto Home',
                        btnClass : 'btn-green',
                        action()
                        {
                            window.location.href = '../index.html';
                        },
                    },
                },
            });
        }
        else if (result.status === 403)
        {
            // show the error message
            $('.err-message').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
        }
        else if (result.status === 400)
        {
            // show the error message
            $('.err-message').removeClass('d-none').html(result.responseJSON.message);
        }
    });
}

function resetPassword()
{
    debugger;
    $('.err-message').addClass('d-none');
    $('.succ-message').addClass('d-none');

    const email = $('#txtEmail').val();
    const validEmail = validateEmail(email);

    if (!validEmail)
    {
        $('.err-message').removeClass('d-none');

        return;
    }

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = RESET_PASSWORD_END_POINT; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.email = email;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            const authData = result.responseJSON;

            $.confirm({
                title        : 'Congratulations',
                content      : authData.message,
                type         : 'green',
                typeAnimated : true,
                buttons      : {
                    gotoHome : {
                        text     : 'Goto Home',
                        btnClass : 'btn-green',
                        action()
                        {
                            window.location.href = '../index.html';
                        },
                    },
                },
            });

            return;
        }

        // show the error message
        $('.err-message').removeClass('d-none').html(result.responseJSON.message);
    });
}
