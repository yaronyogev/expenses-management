Ext.define('expenses.view.ExpenseTypeGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    requires: [
          'expenses.store.ExpenseTypeStore',
          'Ext.grid.plugin.CellEditing',
          'Ext.selection.CellModel'
    ],
    object_type: 'expense_type',
    xtype: 'expensetypegrid',
    url: '/expense_types',
    app: null,
    rtl: true,
    store: Ext.create('expenses.store.ExpenseTypeStore')
});
