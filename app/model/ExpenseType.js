Ext.define('expenses.model.ExpenseType', {
     extend: 'expenses.model.GeneralType',
     proxy: {
         type: 'rest',
         url: '/expense_types',
         reader: {type: 'json', root: 'rows'},
         pageParam: undefined,
         limitParam: undefined
     }
});
