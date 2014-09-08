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
    init: function(application) {
        this.app = application;
        var panel_grid_path = 'panel > ' + this.gridXtype;
        var controls = [];
        controls[panel_grid_path] =
            {render: this.grid_rendered};
        controls[panel_grid_path + ' #add_new_object_of_type'] =
            {click: this.add_object_type};
        controls[panel_grid_path + ' #load_from_csv_file'] =
            {click: this.upload_csv};
        this.control(controls);
    },

    grid_rendered: function(grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
        this.model = Ext.create(this.modelClass);
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
    },
    
    upload_csv: function() {
        this.grid.upload_csv();
    }
});
