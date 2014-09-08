Ext.define('expenses.controller.ExpenseType', {
    extend: 'expenses.controller.GeneralType',
    modelClass: 'expenses.model.ExpenseType',
    gridXtype: 'expensetypegrid',
    
    init: function (application) {
        this.callParent([application]);
    },

    views: [
        'ExpenseTypeGrid'
    ],
    models: [
        'expenses.model.ExpenseType'
    ]
});
