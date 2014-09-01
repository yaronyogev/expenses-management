Ext.define('expenses.view.ExpenseTypeGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    object_type_name: 'expense_type',
    requires: [
          'expenses.store.ExpenseTypeStore',
          'Ext.grid.plugin.CellEditing',
          'Ext.selection.CellModel'
    ],
    id: 'expense_type_grid',
    xtype: 'expensetypegrid',
    url: '/expense_types',
    app: null,
    rtl: true,
    store: Ext.create('expenses.store.ExpenseTypeStore')
});
