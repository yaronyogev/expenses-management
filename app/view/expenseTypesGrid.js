Ext.define('ExpenseType', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'active', type: 'boolean'}
     ]
});

Ext.define('expenses.view.expenseTypesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'expensetypesgrid',
    store:
    {
        storeId: 'expenseTypesStore',
        model: 'ExpenseType',
        proxy: {
            type: 'ajax',
            url: '/expensetypes_list',
            reader: {type: 'json', root: 'expensetypes'}
         }
    },
    columns:
    [
        {dataIndex: 'name', text: 'Name'},
        {dataIndex: 'active', text: 'Active'}
    ]
});