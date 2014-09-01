Ext.define('expenses.controller.ExpenseTypes', {
    extend: 'Ext.app.Controller',
    requires: [
        'expenses.model.ExpenseType'
    ],
    
    app: null,
    grid: null,
    model: null,
    store: null,
    
    init: function() {
        this.app = this.getApplication();
        this.model = Ext.create('expenses.model.ExpenseType');
        this.control({
            'panel > expensetypegrid': {
                render: this.grid_rendered
            },
            '#addexpensetype': {
                click: this.add_expense_type
            }
        });
    },

    grid_rendered: function(grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
        var account = this.app.get_active_account();
        this.store.proxy.extraParams = {
            account_name: account.name,
            account_owner: account.owner,
            account_user: account.user_name
        }
        grid.getStore().load();
    },
    
    add_expense_type: function() {
        var me = this;
        me.store.insert(0, [this.model.get_default()]);
        var task = new Ext.util.DelayedTask(function(){
            var plugin = me.grid.getPlugin('cell_edit');
            plugin.startEditByPosition({row: 0, column: 0});
        });
        task.delay(50);
        return true;
    },

    views: [
        'ExpenseTypeGrid'
    ]

    
});
