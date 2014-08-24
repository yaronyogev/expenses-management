Ext.define('Expense', {
     extend: 'Ext.data.Model',
     fields: [
        {name: 'when', type: 'date'},
        {name: 'type', type: 'int'},
        {name: 'amount', type: 'float'},
        {name: 'description', type: 'string'},
        {name: 'payment_method', type: 'int'},
        {name: 'who', type: 'string'},
        {name: 'payment_date', type: 'date'}
     ]
});

Ext.define('expenses.view.ExpensesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'expensesgrid',
    store:
    {
        storeId: 'expensesStore',
        model: 'Expense',
        proxy: {
            type: 'ajax',
            url: '/expenses_list',
            reader: {type: 'json', root: 'expenses'}
         }
    },
    tbar: [
        {
             xtype: 'button',
             text: strs.get('enter_expense'),
             handler: this.add_expense
        }
    ],
    columns:
    [
        {dataIndex: 'when', text: strs.get('expense_grid_date')},
        {dataIndex: 'type', text: strs.get('expense_grid_type')},
        {dataIndex: 'amount', text: strs.get('expense_grid_amount')},
        {dataIndex: 'description', text: strs.get('expense_grid_description')},
        {dataIndex: 'payment_method', text: strs.get('expense_grid_paymt_mtd')},
        {dataIndex: 'who', text: strs.get('expense_grid_who')},
        {dataIndex: 'payment_date', text: strs.get('expense_grid_charge_date')}
    ],
    
    expense_get_default_values: function ()
    {
        var today = new Date();
        var rec = Ext.create("Expense", {
            'when': today,
            'type': 0,
            'amount': 0,
            'description': '',
            'payment_method': 0,
            'who': user,
            'payment_date': today
        });
        return rec;
    },

    add_expense: function()
    {
        var rec = this.expense_get_default_values();
        this.expense_create(rec, this);
    },

    expense_create: function (rec, grid)
    {
          var conn = new Ext.data.Connection(),
          store = grid.getStore();
          /* Make an AJAX request */
          conn.request({
              url: "/expenses_list",
              params: {
                  action: "expense_add",
                  when: rec.get("when"),
                  type: rec.get("type"),
                  amount: rec.get("amount"),
                  description: rec.get("description"),
                  payment_method: rec.get("payment_method"),
                  who: rec.get("who"),
                  payment_date: rec.get("payment_date")
              },
              success: this.handle_expense_added,
              failure: handle_form_failure
          });
    },

    handle_expense_added: function (response, options)
    {
        var json_response = Ext.JSON.decode(response.responseText);
        if (json_response.success)
        {
            this.getStore().reload();
            var grid = Ext.getCmp("expenses_grid"),
                edit_plugin = grid.plugins[0],
                task = new Ext.util.DelayedTask(
                        function()
                        {
                            edit_plugin.startEditByPosition({row: 0, column: 0});
                        });
            task.delay(100);
        }
        else
            Ext.Msg.alert("Failed adding expense", get_json_err_text(json_response));
    }

});
