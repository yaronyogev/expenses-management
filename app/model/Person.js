Ext.define('expenses.model.Person', {
     extend: 'expenses.model.GeneralType',
     proxy: {
         type: 'rest',
         url: '/persons',
         reader: {type: 'json', root: 'rows'}
     }
});
