var types_grid = null;

Ext.define('expenses.view.ExpenseTypesGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
          'expenses.store.ExpenseTypeStore',
          'Ext.grid.plugin.CellEditing',
          'Ext.selection.CellModel'
    ],
    id: 'expense_types_grid',
    xtype: 'expensetypesgrid',
    app: null,
    rtl: true,
    store: Ext.create('expenses.store.ExpenseTypeStore'),
    columns:
    [
        {
            dataIndex: 'name',
            text: strs.get('expense_type_grid_name'),
            width: 300,
            rtl: true,
            field: {
               xtype: 'textfield',
               blankText: strs.get('expense_type_blank'),
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
               validText: strs.get('expense_type_name_missing')
            }
        },
        {
            dataIndex: 'active',
            text: strs.get('expense_type_grid_active'),
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
        {
            xtype: 'button',
            text: strs.get('add_expense_type'),
            itemId: 'addexpensetype'
        },
        {
            xtype: 'button',
            text: strs.get('load_from_file'),
            handler: function () {
                types_grid.upload_csv();
            }
        }
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
                     Ext.Msg.alert(strs.get('edit_failed'),
                         get_json_err_text(json_response),
                         function () {
                              cell_editing.startEditByPosition({row: e.row,
                                   column: e.column});
                         });
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
                     Ext.Msg.alert(strs.get('edit_failed'),
                         get_json_err_text(json_response),
                         function () {
                             this.getPlugin('cell_edit').startEditByPosition({
                                 row: e.row,
                                 column: cbcol.getIndex()});
                         });
                 }
             },
             failure: handle_request_failure
         });
         return true;
     },
     
     upload_csv: function ()
     {
          var win = Ext.getCmp('csv_upload_window');
          if (win) {
               win.show();
               return;
          }
          var form_buttons =
          [
           {
               text: strs.get('upload_file'),
               icon: 'app/images/accept.png',
               formBind: true,
               handler: types_grid.do_file_upload
           },
           {
               text: strs.get('clear'),
               tooltip: 'Clear selected file',
               handler: function () {
                    this.up('form').getForm().reset();
               }
           },
           {
               text: strs.get('close'),
               icon: 'app/images/cancel.png',
               handler: function () {
                    Ext.getCmp('csv_upload_window').close();
               }
           }
          ];
          var form_items = [{
              xtype: 'filefield',
              id: 'csv_file',
              name: 'csv_file',
              width: 500,
              fieldLabel: 'File',
              allowBlank: false,
              blankText: "Please use the 'Browse' button to select a file"
          }];
          var win_cfg = {
              title: strs.get('load_expense_types_from_csv_file'),
              id: 'csv_upload_window',
              layout: 'fit',
              items: [{
                  xtype: 'form',
                  id: 'csv_upload_form',
                  method: 'POST',
                  defaults: {width: 600, labelWidth: 75},
                  autoHeight: true,
                  maxHeight: 150,
                  autoWidth: true,
                  items: form_items,
                  border: false,
                  bodyStyle: 'padding: 5px;',
                  buttonAlign: 'center',
                  buttons: form_buttons,
                  listeners: {
                      afterrender: function(form) {
                          form.getForm().isValid();
                      }
                  }
              }]
          };
          win = Ext.widget('window', win_cfg);
          win.show();
     },

     do_file_upload : function () {
         var form = this.up('form').getForm();
         var fn = form.findField('csv_file').getRawValue();
         var post_params = form.getFieldValues();
         post_params.action = 'upload_csv';
         post_params.account_name = accounts[0].name;
         post_params.account_owner = accounts[0].owner;
         post_params.account_user = user;
         Ext.getCmp('csv_upload_window').hide();
         set_cur_mb(Ext.Msg.wait('Uploading file - please wait..', 'Uploading'));
         form.submit({
             url: '/upload',
             params: post_params,
             success: function (form, response) {
                 mb_hide();
                 var json_response = Ext.JSON.decode(response.response.responseText);
                 if (json_response.success) {
                     types_grid.expand();
                     types_grid.getStore().load();
                     Ext.Msg.alert({
                         title: strs.get('types_file_loaded'),
                         msg: strs.get('loaded_expense_types_from_file') + ' ' + fn
                     });
                 }
                 else {
                     // failure processing request
                     Ext.Msg.alert(strs.get('load_failed'),
                         strs.get('failed_load_from_file_x') + ' ' +
                         result.file + ': ' + get_json_err_text(json_response));
                 }

             },
             failure: function(form, ajax_response) {
                 var win = Ext.getCmp('csv_upload_window');
                     Ext.Msg.alert(strs.get('load_failed'),
                         strs.get('failed_load_from_file_x') + ' ' + fn);
                 win.destroy();
             }
         });
     }
});
