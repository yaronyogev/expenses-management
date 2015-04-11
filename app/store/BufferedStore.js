Ext.define('expenses.store.BufferedStore' , {
    extends: 'Ext.data.JsonStore',
    buffered: true,
    pageSize: 50
});
