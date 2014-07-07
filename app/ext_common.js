function get_json_err_text(json_response)
{
    if (!json_response.errors)
        return "unknown error";
    return json_response.errors.title ? json_response.errors.title :
        typeof json_response.errors == "string" ? json_response.errors :
        "unknown error";
}

/* handle case where call returned but with error code */
function handle_ajax_call_failure(response, msg)
{
    Ext.Msg.alert("Failure", msg + " :<BR><BR>" + get_json_err_text(response));
}

function handle_request_failure(response) 
{
    // failure of HTTP request
    var message = response.isTimeout ? "timed out" :
        response.statusText;
    Ext.Msg.alert("Failure", "Request failed: " + message);
}

function handle_form_failure(form, ajax_response)
{
    if (Ext.Msg.isVisible())
        Ext.Msg.hide();
    reset_mask();
    var err_msg = "unknown error";
    var result = ajax_response.result;
    if (result != undefined)
    {
        if (result.errors != undefined && result.errors.title != undefined)
            err_msg = result.errors.title;
    }
    else if (form.statusText != undefined)
        err_msg = form.statusText;
    var standard_ok = Ext.MessageBox.buttonText.ok; 
    var msg_config =
    {
        title: "Error",
        msg: err_msg,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
        buttonText: {ok: "Close"},
        minWidth: 250,
        fn: function()
        {
            if (result && typeof result.field == "string")
            {
                field = Ext.getCmp(result.field);
                if(field.focus)
                    field.focus();
            }
        }
    };
    Ext.Msg.show(msg_config);
    Ext.MessageBox.buttonText.ok = standard_ok;
}
var cur_masked_element = null;
var cur_mb = null; // keep pointer to message box

function set_mask(elem, msg)
{
    cur_masked_element = elem;
    cur_masked_element.mask(msg);
}

function reset_mask()
{
    if (cur_masked_element != null)
        cur_masked_element.unmask();
    cur_masked_element = null;
    mb_hide();
}

function set_cur_mb(mb)
{
    cur_mb = mb;
}

function get_cur_mb()
{
    return cur_mb;
}

function mb_hide()
{
    if (cur_mb != null)
    {
        if (cur_mb == Ext.Msg)
            Ext.Msg.hide();
        else
            cur_mb.destroy ? cur_mb.destroy() : cur_mb.hide();
    }
    cur_mb = null;
}
