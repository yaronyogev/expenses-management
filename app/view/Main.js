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
        title: strs.get('viewport_west_title'),
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[
        {
            title: strs.get('accounts_for_user'),
            xtype: "accountsgrid",
            itemId: "account-details",
            padding: "5px",
            items:
            [
             {xtype: "label", text: strs.get('user') + ': ' + user}
            ]
        },
        {
            title: strs.get('expenses_list'),
            xtype: 'expensesgrid',
            id: "expenses-grid"            
        },
        {
            title: strs.get('expense_types'),
            xtype: 'expensetypegrid',
            id: "expense-type-grid"            
        },
        {
            title: strs.get('persons'),
            xtype: 'persongrid',
            id: "person-grid"            
        }]
    }]
});
