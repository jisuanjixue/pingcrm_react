import { Dashboard, OfficeIcon, UsersIcon, PrinterIcon } from "../components/icons/Icons"
import * as Routes from "../utils/routes";


export const dashboardMenus = [
  {
    iconName: Dashboard,
    url: Routes.root(),
    linkName: "Dashboard",
    urlName: ''
  },
  {
    iconName: OfficeIcon,
    url: Routes.organizations(),
    linkName: "Organizations",
    urlName: 'organizations'
  },
  {
    iconName: UsersIcon,
    url: Routes.contacts(),
    linkName: "Contacts",
    urlName: 'contacts'
  },
  {
    iconName: PrinterIcon,
    url: Routes.reports(),
    linkName: "Reports",
    urlName: 'reports'
  },
];