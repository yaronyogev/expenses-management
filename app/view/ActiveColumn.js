Ext.define('expenses.view.ActiveColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.activecolumn',
    config: {
        dataIndex: 'active',
        text: 'undefined',
        xtype: 'checkcolumn',
        listeners: {
            checkchange: function (cbcol, row, checked) {
                this.up('grid').on_active_edit(cbcol, row, checked);
            }
        }
    }
});
