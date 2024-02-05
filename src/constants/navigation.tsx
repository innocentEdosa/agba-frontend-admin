import {
  BookIcon,
  Element3Icon,
  TeacherIcon,
  UserOctagonIcon,
  UserSquareIcon,
  Wallet3Icon,
} from "@/Vectors";

const prefix = "";

export const navigation = [
  {
    name: "Dashboard",
    path: `${prefix}/`,
    icon: <Element3Icon />,
  },
  {
    name: "Course Management",
    path: `${prefix}/courses`,
    icon: <BookIcon />,
  },
  {
    name: "Learners Management",
    path: `${prefix}/learners`,
    icon: <TeacherIcon />,
  },
  {
    name: "Authors Management",
    path: `${prefix}/authors`,
    icon: <UserOctagonIcon />,
  },
  {
    name: "Admin Management",
    path: `${prefix}/manage-admins`,
    icon: <UserSquareIcon />,
  },
  {
    name: "Payments",
    path: `${prefix}/payments`,
    icon: <Wallet3Icon />,
  },
];
