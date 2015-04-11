Ext.define('expenses.model.Method', {
     extend: 'expenses.model.GeneralType',
     fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'monthly_payment', type: 'int'},
        {name: 'payment_deferred_days', type: 'int'},
        {name: 'active', type: 'boolean'}
     ],

     get_default: function ()
     {
          return {
               id: 0,
               name: '',
               monthly_payment: 0,
               payment_deferred_days: 0,
               active: true
          };
     },
     proxy: {
         type: 'rest',
         url: '/methods',
         reader: {type: 'json', root: 'rows'},
         pageParam: undefined,
         limitParam: undefined
     }
});
