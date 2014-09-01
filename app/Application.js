Ext.define('expenses.Application', {
    extend: 'Ext.app.Application',
    name: 'expenses',
    requires:[
        'Ext.Msg',
        'Ext.data.JsonStore',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.grid.column.CheckColumn',
        'Ext.data.proxy.Rest'
    ],
    
    
    active_account: {name: '', owner: ''},
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
        Ext.getCmp('app-main').setAccountDetails(user, active_account);
    },

    get_active_account: function()
    {
        return active_account;
    },

    models: [
        'ExpenseType'
    ],
    
    views: [
        'AccountsGrid',
        'ExpensesGrid',
        'ExpenseTypeGrid'
    ],

    controllers: [
        'Expenses',
        'ExpenseTypes',
        'Accounts'
    ],

    stores: [
        // TODO: add stores here
    ]
});
