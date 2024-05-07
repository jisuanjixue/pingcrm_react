import * as Routes from "../utils/routes";
import { Dashboard, OfficeIcon, PrinterIcon, UsersIcon } from "../components/icons/Icons";

const DashboardMenus = [
  {
    iconName: Dashboard,
    url: Routes.root(),
    linkName: "Dashboard",
    urlName: "",
  },
  {
    iconName: OfficeIcon,
    url: Routes?.organizations(),
    linkName: "Organizations",
    urlName: "organizations",
  },
  {
    iconName: UsersIcon,
    url: Routes.contacts(),
    linkName: "Contacts",
    urlName: "contacts",
  },
  {
    iconName: PrinterIcon,
    url: Routes.reports(),
    linkName: "Reports",
    urlName: "reports",
  },
];

export default DashboardMenus;
