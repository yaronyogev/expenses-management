Ext.define('expenses.controller.Expenses', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            'viewport > expensesgrid': {
                render: this.onPanelRendered
            }
        });
    },

    onPanelRendered: function() {
        console.log('The expenses grid was rendered');
    }

    
});
