Ext.define('expenses.controller.Person', {
    extend: 'expenses.controller.GeneralType',
    requires: [
        'expenses.model.Person'
    ],
    init: function () {
        this.initTypeController();
    },
    modelClass: 'expenses.model.Person',
    gridXtype: 'persongrid',

    views: [
        'PersonGrid'
    ],
    models: [
        'expenses.model.Person'
    ]
});
