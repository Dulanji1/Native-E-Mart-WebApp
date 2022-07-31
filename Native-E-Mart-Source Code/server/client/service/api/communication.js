// General function for all ajax calls
function ajaxCall(callParams, dataParams, callback) {

    const session = getSession();
    let token = '';
    if(session){
        token = session.token;
    }

    $.ajax({
        type: callParams.Type,
        url: callParams.Url,
        quietMillis: 100,
        dataType: callParams.DataType,
        data: dataParams,
        cache: false,
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        },
        complete: callback
    });
}
