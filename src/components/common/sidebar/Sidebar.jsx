import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiKey, FiLayout, FiSend, FiLogOut } from "react-icons/fi";
import { GoStack } from "react-icons/go";
import { BsHddStack } from "react-icons/bs";
import { Layout, Menu } from "antd";
import logoIcon from "../../../assets/logo.png";
import { googleLogout } from "@react-oauth/google";
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";
// import logoText from ".../../../assets/logo-text.svg";
//constants
// import { Paths, SidebarConst, TOKENS } from "utils/constants";
// import { SetStorage } from "middleware/cache";
// import { useRecoilState } from "recoil";
// import { currentUserState } from "middleware/state";

// interface LinkItem {
//   label: React.ReactNode;
//   key: string;
//   icon?: React.ReactNode;
//   disabled?: boolean;
// }

const { Sider } = Layout;

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState();
  // const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);

  // const { email, first_name, last_name } = currentUser;

  const generalItems = [
    {
      key: "/dashboard/Feed",
      label: "Feed",
      icon: <GoStack />,
    },
    {
      key: "/dashboard/LeaderBoards",
      label: "Leaderboards",
      icon: <FiLayout />,
    },
    {
      key: "/dashboard/Summaries",
      label: "Summaries",
      icon: <FiKey />,
    },
    {
      key: "/dashboard/Predictions",
      label: "Predictions",
      icon: <FiSend />,
    },
    {
      key: "/dashboard/MyChannels",
      label: "MyChannels",
      icon: <BsHddStack />,
    },
    {
      key: "/dashboard/Favourites",
      label: "Favourites",
      icon: <BsHddStack />,
    },
  ];

  const handleRedirect = () => {
    window.location.href = "http://localhost:3000";

    // window.location.href = "https://www.luckyorgenius.com/";
  };
  const handleFeedback = () => {
    window.open("https://forms.gle/BMLEm7QYyngN3yXdA", "_blank");
  };
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);

  return (
    <Sider
      trigger={
        <div className="mb-4 mx-[4px]">
          {!collapsed ? (
            <div className="w-full flex pl-6 text-[#ffffff60] items-center h-full text-xl rounded-lg font-raleway gap-2 text-xs py-[10px] hover:bg-[#ffffff20] hover:text-[#ffffff80]">
              {" "}
              <RiExpandLeftLine /> Collapse
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-full text-xl bg-[#ffffff20] rounded-xl py-[10px]">
              <RiExpandRightLine />
            </div>
          )}
        </div>
      }
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="desktop h-screen border-r-2 hidden md:block border-primary !sticky !top-0 !left-0"
    >
      {!collapsed ? (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img className="logo-icon" alt="" src={logoIcon} />
        </div>
      ) : (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img className="logo-icon" alt="" src={"/images/logo_icon.png"} />
        </div>
      )}
      <span
        className={
          !collapsed
            ? "flex font-poppins pl-5 pt-4 font-bold text-gray500"
            : "flex font-poppins pl-2 pt-4 font-bold text-gray500"
        }
      >
        {"General"}
      </span>
      <Menu
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        onClick={(item) => {
          if (item.key === "/Feedback") {
            handleFeedback();
          } else {
            navigate(item.key);
          }
        }}
        className="font-raleway text-xs relative"
      >
        {generalItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}

        <Menu.Item
          key="/"
          icon={<FiLogOut />}
          onClick={async () => {
            await localStorage.clear();
            googleLogout();
            window.location.reload();
            console.log("clear");
            handleRedirect();
          }}
        >
          {"Logout"}
        </Menu.Item>
      </Menu>
      <div className="flex font-raleway text-xs px-7 w-full gap-2 items-center absolute bottom-12  py-4 text-white rounded-lg">
        <img
          src={userData?.picture}
          width={10}
          height={10}
          className={`rounded-full w-8 `}
        />
        <h4 className={`${!collapsed ? "flex" : "hidden"}`}>
          {userData?.given_name}
        </h4>
      </div>
    </Sider>
  );
};

export default Index;
