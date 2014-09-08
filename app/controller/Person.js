Ext.define('expenses.controller.Person', {
    extend: 'expenses.controller.GeneralType',
    modelClass: 'expenses.model.Person',
    gridXtype: 'persongrid',
    init: function (application) {
        this.callParent([application]);
    },

    views: [
        'PersonGrid'
    ],
    models: [
        'expenses.model.Person'
    ]
});
