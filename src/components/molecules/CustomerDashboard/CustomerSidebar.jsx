import React from 'react'
import SidebarLink from "../../atoms/Dashboard/SidebarLink";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartSharpIcon from "@mui/icons-material/BarChartSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import Logo from "../../atoms/Login/Logo";
import { styled } from "@mui/material";

const CustomerSidebar = props => {
	const Aside = styled("div")`
		flex-basis: 15%;
		padding-top: 2.2rem;
		padding-bottom: 2.2rem;
		background-color: #2b2e72;
		position: relative;

		.logo {
			padding-left: 1.62rem;
			padding-right: 1.62rem;
			margin-bottom: 5rem /* 80px */;
		}

		.logout {
			position: absolute;
			bottom: 0.5rem /* 8px */;
		}
	`;

	return (
		<Aside>
			<div className="logo">
				<Logo />
			</div>
			<div className="flex flex-col gap-[1rem]">
				<SidebarLink
					link={"dashboard"}
					name={"dashboard"}
					icon={<DashboardIcon className="icon" />}
					isActive={true}
				/>
				<SidebarLink
					link={"reports"}
					icon={<BarChartSharpIcon className="icon" />}
					name={"reports"}
					isActive={true}
				/>
			</div>
			<div className="logout">
				<SidebarLink link={"logout"} icon={<LogoutSharpIcon className="icon" />} />
			</div>
		</Aside>
	);
}

CustomerSidebar.propTypes = {}

export default CustomerSidebar