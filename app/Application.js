Ext.define('expenses.Application', {
    name: 'expenses',
    requires:[
        'Ext.Msg'
    ],
    
    
    active_account: {name: "", owner: ""},
    activeAccount: function () {
        return active_account;
    },
    
    launch: function ()
    {
        if (accounts.length == 1) {
            /* single account found - use it */
            active_account = accounts[0];
            return;
        }
        // XXX - open selection dialog
        active_account = accounts[0];
            Ext.Msg.alert("Application launch", "Expenses app launched");
        Ext.getCmp('app-main').setAccountDetails(user, active_account);
    },

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        "Expenses",
        "Accounts"
    ],

    stores: [
        // TODO: add stores here
    ]
});
