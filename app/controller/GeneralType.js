Ext.define('expenses.controller.GeneralType', {
    extend: 'Ext.app.Controller',
    requires: [
        'expenses.model.GeneralType'
    ],

    config: {    
        app: null,
        grid: null,
        model: null,
        store: null,
       
        modelClass: null,
        gridXtype: null,
    },
    initTypeController: function() {
        this.app = this.getApplication();
        var panel_grid_path = 'panel > ' + this.gridXtype;
        var button_path = panel_grid_path + '> add_new_object_of_type';
        this.control({
            panel_grid_path: {
                render: this.grid_rendered
            },
            button_path: {
                click: this.add_object_type
            }
        });
    },

    grid_rendered: function(grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
        this.model = this.store.model;
        var account = this.app.get_active_account();
        this.store.proxy.extraParams = {
            account_name: account.name,
            account_owner: account.owner,
            account_user: account.user_name
        }
        grid.getStore().load();
    },
    
    add_object_type: function() {
        var me = this;
        me.store.insert(0, [this.model.get_default()]);
        var task = new Ext.util.DelayedTask(function(){
            var plugin = me.grid.getPlugin('cell_edit');
            plugin.startEditByPosition({row: 0, column: 0});
        });
        task.delay(50);
        return true;
    }
});
