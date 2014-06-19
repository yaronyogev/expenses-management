Ext.define('expenses.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'expenses.view.Main',
        'expenses.view.expensesGrid'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main',
        id: 'app-main'
    }]
});
