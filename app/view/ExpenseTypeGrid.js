Ext.define('expenses.view.ExpenseTypeGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    requires: [
          'expenses.store.ExpenseTypeStore'
    ],
    object_type: 'expense_type',
    xtype: 'expensetypegrid',
    url: '/expense_types',
    app: null,
    rtl: true,
    store: Ext.create('expenses.store.ExpenseTypeStore')
});
