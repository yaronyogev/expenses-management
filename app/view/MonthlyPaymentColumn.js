Ext.define('expenses.view.MonthlyPaymentColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.monthlypaymentcolumn',
    config: {
        dataIndex: 'monthly_payment',
        text: 'undefined',
        field: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 1,
            maxValue: 31,
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
