Ext.define('expenses.model.GeneralType', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'active', type: 'boolean'}
     ],

     get_default: function ()
     {
          return {id: 0, name: '', active: true};
     }
});
