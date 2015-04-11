Ext.define('expenses.view.PersonGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    requires: [
          'expenses.store.PersonStore'
    ],
    object_type: 'person',
    xtype: 'persongrid',
    url: '/persons',
    store: Ext.create('expenses.store.PersonStore')
});
