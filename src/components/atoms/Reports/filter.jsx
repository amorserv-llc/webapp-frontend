import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
	filterTicketsByStatus,
	setMultipleFilterStatus,
	setMultipleDropdownFilterStatus,
	removeMultipleFilterStatus,
} from "../../../state-manager/reducers/reports/tickets/ticketreport";
import FilterDropdownItem from "./filterdropdownitem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { handleFilterByStatus } from "../../organisms/Reports/filters";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const FilterByWrapper = styled("div")(() => ({
	position: "relative",
	left: "17px",
	top: "20px",
	display: "flex",
	gap: "10px",

	button: {
		minWidth: "140px",
		height: "43px",
		padding: "10px 14px 10px 14px",
		borderRadius: "8px",
		background: "rgba(43, 46, 114, 1)",
		color: "white",
		gap: "4px",
		texAlign: "center",
	},

	".dropdownCard": {
		width: "205px",
		height: "140px",
		overflow: "hidden",
		background: "white",
		borderRadius: "8px",
		position: "absolute",
		zIndex: "20",
		padding: "8px 6px 8px 6px",
		boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.20)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		gap: "2px",
		transition: "all",
	},

	".status": {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		color: "rgba(43, 46, 114, 1)",
	},

	".status span": {
		border: ".5px solid rgba(43, 46, 114, 1)",
		borderRadius: "8px",
		padding: "5px",
		cursor: "pointer",
	},

	".status span:hover": {
		background: "rgba(43, 46, 114, 1)",
		color: "white",
	},
}));

const FilterBy = ({click, handleClicked}) => {
	const [status, setStatus] = useState("");
	const [active, setActive] = useState(false);
	const [toggle, setToggle] = useState(false);

	const { filteredTickets, filteredTicketsByDate, serviceStatus, reportTabIndex } = useSelector(
		(state) => state.ticketReports
	);

	const dispatch = useDispatch();

	const handleClick = (active) => {
		if (active) {
			setActive(true)
		}else {
			setActive(false)
		}
	}

	useEffect(() => {
		if (status != "") {
			if (!active) {
				handleFilterByStatus(
					status,
					filteredTickets,
					filteredTicketsByDate,
					filterTicketsByStatus,
					setMultipleFilterStatus,
					dispatch
				);
			}else {
				dispatch(removeMultipleFilterStatus(status))
			}
		}
		setStatus("");
	}, [status, active]);

	useEffect(() => {
		if (reportTabIndex === 0) {
			if (status === 'done') {
				dispatch(setMultipleDropdownFilterStatus({status, title: "Tickets Done"}))
			}else if (status === "in-progress") {
				dispatch(setMultipleDropdownFilterStatus({status, title: "Tickets Inprogress"}))
			}else if (status === "pending") {
				dispatch(setMultipleDropdownFilterStatus({status, title: "Tickets Pending"}))
			}else if (status === "technician enroute") {
				dispatch(setMultipleDropdownFilterStatus({status, title: "Technician Enroute"}))
			}
		}
	}, [status])

	useEffect(() => {
		const listener = (e) => {
			if (!e.target.closest("#drop-one") || e.target.closest("#drop-two")) {
				setToggle(false);
			}
		};

		document.body.addEventListener("click", listener);
		return () => document.body.removeEventListener("click", listener);
	}, []);

	return (
		<FilterByWrapper id="drop-two">
			<div>
				<button type="button" onClick={(e) => {
					e.stopPropagation()
					setToggle((prev) => !prev)
				}}>
					All Tickets
					<ExpandMoreIcon />
				</button>
				{toggle && (
					<div className="dropdownCard">
						{serviceStatus.map((item) => (
							<FilterDropdownItem key={item.status} item={item} setStatus={setStatus} handleClick={handleClick} />
						))}
					</div>
				)}
			</div>
		</FilterByWrapper>
	);
};

FilterBy.propTypes = {
	dropItems: PropTypes.array,
	filteredReports: PropTypes.array,
	handleClicked: PropTypes.func,
	click: PropTypes.bool
};

export default FilterBy;
