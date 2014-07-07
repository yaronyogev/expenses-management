Ext.define('expenses.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.Msg',
        'Ext.layout.container.Border',
        'Ext.form.Label'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },
    
    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'View',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[
        {
            title: 'Accounts for user: ' + user,
            xtype: "accountsgrid",
            itemId: "account-details",
            padding: "5px",
            items:
            [
             {xtype: "label", text: "User: " + user}
            ]
        }
        ,{
            title: 'Expenses List',
            xtype: 'expensesgrid',
            id: "expenses-grid"            
        }
        ,{
            title: 'Expense Types',
            xtype: 'expensetypesgrid',
            id: "expense-types-grid"            
        }]
    }]
});
