Ext.define('expenses.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'expenses.view.Main'
    ],

    rtl: true,
    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main',
        id: 'app-main'
    }]
});
