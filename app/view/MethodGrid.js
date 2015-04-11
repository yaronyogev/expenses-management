Ext.define('expenses.view.MethodGrid', {
    extend: 'expenses.view.GeneralTypeGrid',
    requires: [
          'expenses.store.MethodStore',
          'expenses.view.MonthlyPaymentColumn',
          'expenses.view.DeferredDaysColumn'
    ],
    object_type: 'method',
    xtype: 'methodsgrid',
    url: '/methods',
    store: Ext.create('expenses.store.MethodStore'),
    columns:
    [
        {xtype: 'namecolumn'},
        {xtype: 'monthlypaymentcolumn'},
        {xtype: 'deferreddayscolumn'},
        {xtype: 'activecolumn'},
        {xtype: 'actioncolumn'}
    ]
});
