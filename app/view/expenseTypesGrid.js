Ext.define('expenses.view.ExpenseTypesGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
          'expenses.model.ExpenseType',
          'Ext.grid.plugin.CellEditing',
          'Ext.selection.CellModel'
    ],
    id: 'expense_types_grid',
    xtype: 'expensetypesgrid',
    app: null,
    rtl: true,
    store:
    {
        storeId: 'expense_types_store',
        model: 'expenses.model.ExpenseType',
        autoSync: true,
        writer: Ext.create('Ext.data.proxy.Rest', {
            encode: true,
            root: 'rows',
            writeAllFields: true,
            listeners: {
                exception: function (proxy, response, operation) {
                    console.log('response:', response);
                    console.log('operation:', operation);
                }
            }
        })
    },
    columns:
    [
        {
            dataIndex: 'name',
            text: 'Name',
            width: 300,
            field: {
               xtype: 'textfield',
               blankText: 'Enter name of expense type',
               allowBlank: false,
               listeners: {
                    validateedit: function (cellediting, e) {
                         if (!e.field.isValid()) {
                              e.field.setFocus();
                              return false;
                         }
                         return true;
                    }
               },
               validText: 'Name of expense type is missing'
            }
        },
        {dataIndex: 'active', text: 'Active'},
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [
               {
                    icon: 'app/images/delete.png',
                    tooltip: 'Delete',
                    handler: function(grid, row) {
                         var store = grid.getStore();
                         var rec = store.getAt(row);
                         var conn = new Ext.data.Connection;
                         conn.request({
                              url: '/expense_types',
                              params: {
                                  action: 'delete',
                                  id: rec.get('id')
                              },
                              success: function (response) {
                                  var resp = Ext.decode(response.responseText);
                                  if (resp.success)
                                      store.removeAt(row);
                                  else
                                      handle_ajax_call_failure(resp, 'Failed to delete');
                              },
                              failure: handle_request_failure
                         });
                    }
               }
            ]
        }
    ],
    tbar: [
          {xtype: 'button', text: 'Add Expense Type', itemId: "addexpensetype"}
    ],
    
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            pluginId: 'cell_edit',
            clicksToEdit: 1,
            listeners: {
               edit: function (editor, e) {
                    e.record.commit();
               }
            }
        })
    ],
    selModel: {selType: 'cellmodel'}
});
