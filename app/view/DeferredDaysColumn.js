Ext.define('expenses.view.DeferredDaysColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.deferreddayscolumn',
    config: {
        dataIndex: 'deferred_days',
        text: 'undefined',
        field: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 0,
                allowDecimals: false,
            autoStripChars: true,
            listeners: {
                 validateedit: function (cellediting, e) {
                      if (!e.field.isValid()) {
                           e.field.setFocus();
                           return false;
                      }
                      return true;
                 }
            }
        }
    }
});
