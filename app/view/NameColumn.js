Ext.define('expenses.view.NameColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.namecolumn',
    config: {
        dataIndex: 'name',
        text: 'undefined',
        width: 300,
        field: {
            xtype: 'textfield',
            blankText: 'undefined',
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
            validText: 'undefined',
        }
    }
});
