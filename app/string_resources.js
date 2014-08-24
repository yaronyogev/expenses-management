Ext.define('expenses.Strings', {
    DEF_LANG: 'en-us',
    lang: 'he-il',
    
    get: function (str_id) {
        if (!this.lang)
            this.lang = this.DEF_LANG;
        var strs_def = this.strings[this.DEF_LANG],
            strs = this.strings[this.lang],
            str = Ext.valueFrom(strs[str_id], strs_def[str_id]);
        return str;
    },
    
    strings:
    {
        'en-us':
        {
            /* View Port */
            'viewport_west_title': 'View',
            /*Accounts*/
            'accounts_for_user': 'Accounts for user',
            'accounts_grid_name': 'Name',
            'accounts_grid_owner': 'Owner',
            'user': 'User',
            /* Expense Types */
            'expense_types': 'Expense Types',
            'add_expense_type': 'Add Expense Type',
            'expense_type_grid_name': 'Name',
            'expense_type_grid_active': 'Active',
            'expense_type_blank': 'Enter name of expense type',
            'expense_type_name_missing': 'Name of expense type is missing',
            'load_expense_types_from_csv_file': 'Load expense types from CSV file',
            'types_file_loaded': 'Types file loaded',
            'loaded_expense_types_from_file': 'Loaded expense types from file',
            /* Expenses */
            'expenses_list': 'Expenses List',
            'enter_expense': 'Enter Expense',
            'expense_grid_date': 'Date',
            'expense_grid_type': 'Type',
            'expense_grid_amount': 'Amount',
            'expense_grid_description': 'Description',
            'expense_grid_paymt_mtd': 'Pay. Mtd',
            'expense_grid_who': 'Who',
            'expense_grid_charge_date': 'Charge Date',
            /* Error handling */
            'error': 'Error',
            /* Common */
            'upload_file': 'Upload File',
            'clear': 'clear',
            'close': 'Close',
            'failure': 'Failure',
            'edit_failed': 'Edit Failed',
            'request_failed': 'Request Failed',
            'load_from_file': 'Load From File...',
            'load_failed': 'Load from file failed',
            'failed_load_from_file_x': 'Failed to load types from'
        }
        , 'he-il':
        {
            /* View Port */
            'viewport_west_title': 'תצוגה',
            /*Accounts*/
            'accounts_for_user': 'חשבונות משתמש',
            'accounts_grid_name': 'חשבון',
            'accounts_grid_owner': 'בעלים',
            /* Expense Types */
            'expense_types': 'סוגי הוצאות',
            'add_expense_type': 'הוסף סוג הוצאה',
            'expense_type_grid_name': 'סוג',
            'expense_type_grid_active': 'פעיל',
            'expense_type_blank': 'הכנס שם עבור סוג הוצאה',
            'expense_type_name_missing': 'שם סוג הוצאה חסר',
            'load_expense_types_from_csv_file': 'טען סוגי הוצאות מתוך קובץ',
            'types_file_loaded': 'טעינת קובץ סוגי הוצאות הושלמה',
            'loaded_expense_types_from_file': 'סוגי הוצאות נטענו מקובץ',
            /* Expenses */
            'expenses_list': 'רישום הוצאות',
            'enter_expense': 'הכנס הוצאה',
            'expense_grid_date': 'תאריך',
            'expense_grid_type': 'סוג',
            'expense_grid_amount': 'סכום',
            'expense_grid_description': 'תיאור',
            'expense_grid_paymt_mtd': 'שיטת תשלום',
            'expense_grid_who': 'מי',
            'expense_grid_charge_date': 'ת.חיוב',
            /* Error handling */
            'error': 'שגיאה',
            /* Common */
            'upload_file': 'העלה קובץ',
            'clear': 'נקה הכל',
            'close': 'סגור',
            'failure': 'בעיה',
            'edit_failed': 'עריכה נכשלה',
            'request_failed': 'בקשה נכשלה',
            'load_from_file': 'טען מקובץ...',
            'load_failed': 'טעינה מקובץ נכשלה',
            'failed_load_from_file_x': 'נכשלה טעינת הנתונים מקובץ'
        }
    }
});
var strs = Ext.create('expenses.Strings');

