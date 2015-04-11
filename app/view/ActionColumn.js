Ext.define('expenses.view.ActionColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.actioncolumn',
    config: {
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
                          url: store.proxy.url,
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
});
