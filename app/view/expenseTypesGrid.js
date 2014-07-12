var types_grid = null;

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
        proxy:
        {
            type: 'ajax',
            reader: {type: 'json', root: 'rows'},
            url: '/expense_types',
            extraParams: {
               account_name: accounts[0].name,
               account_owner: accounts[0].owner,
               account_user: user
            }
        },
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
        {
            dataIndex: 'active',
            text: 'Active',
            xtype: 'checkcolumn',
            listeners: {
                checkchange: function (cbcol, row, checked) {
                    types_grid.on_active_edit(cbcol, row, checked);
                }
            }
        },
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
                                  id: rec.get('id'),
                                  account_name: accounts[0].name,
                                  account_owner: accounts[0].owner,
                                  account_user: user
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
    selModel: {selType: 'cellmodel'},
    
    listeners:{
        render: function (grid) {
            types_grid = grid;
        },
        edit: function (editor, e) {
            this.on_cell_edit(editor, e);
        }
    },
    
    on_cell_edit: function(cell_editing, e) {
         /* Make an AJAX request */
         var id = e.record.get('id');
         var conn = new Ext.data.Connection();
         conn.request({
             url: '/expense_types',
             params: {
                 action: id == 0 ? 'add' : 'update',
                 id: id,
                 name: e.record.get('name'),
                 active: e.record.get('active'),
                 account_name: accounts[0].name,
                 account_owner: accounts[0].owner,
                 account_user: user

             },
             success: function(response) {
                 var json_response = Ext.JSON.decode(response.responseText);
                 if (json_response.success)
                 {
                     var rec = e.record;
                     if (id == 0) {
                         rec.beginEdit();
                         rec.set('id', json_response.id)
                         rec.endEdit();
                     }
                     rec.commit();
                 }
                 else
                 {
                     // failure processing request
                     Ext.Msg.alert(get_json_err_text(json_response));
                     cell_editing.startEditByPosition({
                         row: e.row,
                         column: e.column});
                 }
             },
             failure: handle_request_failure
         });
         return true;
     },
     on_active_edit: function(cbcol, row, checked) {
         /* Make an AJAX request */
         var rec = types_grid.store.getAt(row);
         var id = rec.get('id');
         var conn = new Ext.data.Connection();
         conn.request({
             url: '/expense_types',
             params: {
                 action: 'update',
                 id: id,
                 name: rec.get('name'),
                 active: checked,
                 account_name: accounts[0].name,
                 account_owner: accounts[0].owner,
                 account_user: user

             },
             success: function(response) {
                 var json_response = Ext.JSON.decode(response.responseText);
                 if (json_response.success)
                     rec.commit();
                 else
                 {
                     // failure processing request
                     Ext.Msg.alert(get_json_err_text(json_response));
                     this.getPlugin('cell_edit').startEditByPosition({
                         row: e.row,
                         column: cbcol.getIndex()});
                 }
             },
             failure: handle_request_failure
         });
         return true;
     }

});
