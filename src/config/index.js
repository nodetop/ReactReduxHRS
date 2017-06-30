import config_development from './development';
import config_production from './production';

let CONFIG = config_development;

console.log('Environment :: ' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  CONFIG = config_production;
}

CONFIG['ADMIN'] = 'Admin';
CONFIG['HR'] = 'HR';
CONFIG['GUEST'] = 'Guest';
CONFIG['EMPLOYEE'] = 'Employee';
CONFIG['WORKING_DAY'] = 'WORKING_DAY';
CONFIG['LEAVE_DAY'] = 'LEAVE_DAY';
CONFIG['DEFAULT_PASSWORD'] = 'java@123';
CONFIG['jwt_secret_key'] = 'HR_APP';
CONFIG['DATA'] = [
  {'path': '/monthly_attendance', 'label': 'My Attendance', 'plabel': 'Attendance'},
  {'path': '/home', 'label': 'Employees Attendance', 'plabel': 'Attendance'},
  {'path': '/uploadAttendance', 'label': 'Upload Attendance', 'plabel': 'Attendance'},
  {'path': '/manage_users', 'label': 'Profile', 'plabel': 'Manage Employees'},
  {'path': '/disabled_employes', 'label': 'Disable Employee', 'plabel': 'Manage Employees'},
  {'path': '/manage_working_hours', 'label': 'Office Hours', 'plabel': 'Manage Hours'},
  {'path': '/manage_user_pending_hours', 'label': 'Pending Hours', 'plabel': 'Manage Hours'},
  {'path': '/manage_user_working_hours', 'label': 'Employee Hours', 'plabel': 'Manage Hours'},
  {'path': '/manage_leaves', 'label': 'Leaves', 'plabel': 'Manage Leaves'},
  {'path': '/leaves_summary', 'label': 'Leaves Summary', 'plabel': 'Manage Leaves'},
  {'path': '/apply_leave', 'label': 'Apply Leave', 'plabel': 'Manage Leaves'},
  {'path': '/manage_salary', 'label': 'Salaries', 'plabel': 'Manage Salary'},
  {'path': '/view_salary', 'label': 'View Salary', 'plabel': 'Manage Salary'},
  {'path': '/manage_payslips', 'label': 'Payslips', 'plabel': 'Manage Salary'},
  {'path': '/mail_templates', 'label': 'Mail Templates', 'plabel': 'Templates'},
  {'path': '/add_variables', 'label': 'Add Variables', 'plabel': 'Templates'},
  {'path': '/upload_policy_documents', 'label': 'Upload Documents', 'plabel': 'Policy Documents'},
  {'path': '/my_leaves', 'label': 'My Leaves'},
  {'path': '/salary', 'label': 'My Salary'},
  {'path': '/my_profile', 'label': 'My Profile'},
  {'path': '/my_inventory', 'label': 'My Inventory'},
  {'path': '/documents', 'label': 'My Documents'},
  {'path': '/policy_documents', 'label': 'Policy Documents'},
  {'path': '/holidays', 'label': 'Holidays'},
  {'path': '/inventory_system', 'label': 'Inventory'},
  {'path': '/team_view', 'label': 'Team'},
  {'path': '/logout', 'label': 'Logout'}
];
CONFIG['PAGEROLES'] = [];

export {CONFIG};
