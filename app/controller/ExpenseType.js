Ext.define('expenses.controller.ExpenseType', {
    extend: 'expenses.controller.GeneralType',
    requires: [
        'expenses.model.ExpenseType'
    ],
    init: function () {
        this.initTypeController();
    },
    config: {
        modelClass: 'expenses.model.ExpenseType',
        gridXtype: 'expensetypegrid',
    },
    views: [
        'ExpenseTypeGrid'
    ],
    models: [
        'expenses.model.ExpenseType'
    ]
});
