Ext.define('Expense', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'when', type: 'date'},
        {name: 'type', type: 'int'},
        {name: 'amount', type: 'float'},
        {name: 'description', type: 'string'},
        {name: 'payment_method', type: 'int'},
        {name: 'who', type: 'string'},
        {name: 'payment_date', type: 'date'}
     ]
});

Ext.define('expenses.view.expensesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'expensesgrid',
    store:
    {
        storeId: 'expensesStore',
        model: 'Expense',
        proxy: {
            type: 'ajax',
            url: '/expenses_list',
            reader: {type: 'json', root: 'expenses'}
         }
    },
    columns:
    [
        {dataIndex: 'when', text: 'Date'},
        {dataIndex: 'type', text: 'Type'},
        {dataIndex: 'amount', text: 'Amount'},
        {dataIndex: 'description', text: 'Description'},
        {dataIndex: 'payment_method', text: 'Pay. Mtd'},
        {dataIndex: 'who', text: 'Who'},
        {dataIndex: 'payment_date', text: 'Charge Date'}
    ]
});