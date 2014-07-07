Ext.define('expenses.model.ExpenseType', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'id', type: 'int'},
        {name: 'entity_id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'active', type: 'boolean'}
     ],
     proxy: {
         type: 'rest',
         url: '/expense_types',
         reader: {type: 'json', root: 'rows'}
     },

     get_default: function ()
     {
          return {id: 0, name: '', active: true};
     }
});
