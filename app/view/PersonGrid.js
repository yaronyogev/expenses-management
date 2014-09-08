Ext.define('expenses.view.PersonGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    requires: [
          'expenses.store.PersonStore',
          'Ext.grid.plugin.CellEditing',
          'Ext.selection.CellModel'
    ],
    //id: 'person_grid',
    object_type: 'person',
    xtype: 'persongrid',
    url: '/persons',
    app: null,
    rtl: true,
    store: Ext.create('expenses.store.PersonStore')
});
