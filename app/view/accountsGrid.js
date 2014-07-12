Ext.define('Account', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'name', type: 'string'},
        {name: 'owner', type: 'string'},
        {name: 'user_name', type: 'string'}
     ]
});

Ext.define('expenses.view.AccountsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'accountsgrid',
    store: Ext.create('Ext.data.JsonStore', {
        storeId: 'accountsStore',
        model: 'Account',
        proxy: {
            type: 'ajax',
            url: '/account_list',
            reader: {
                type: 'json',
                root: 'accounts'
            }
        }
    }),
    viewConfig: {
      stripeRows: true,
      trackOver: true
    },
    columns:
    [
        {dataIndex: 'name', text: 'Name', width: 200},
        {dataIndex: 'owner', text: 'Owner', flex: 1}
    ],
    listeners: {
        render: function (grid)
        {
            grid.getStore().loadData(accounts);
        }
    }
});

/*
// store configs
    storeId: 'myStore',

    proxy: {
        type: 'ajax',
        url: 'get-images.php',
        reader: {
            type: 'json',
            root: 'images',
            idProperty: 'name'
        }
    },
*/