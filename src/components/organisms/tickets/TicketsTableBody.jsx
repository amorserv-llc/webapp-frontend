import React, { useEffect, useMemo } from "react";
import RecentTicketTableText from "../../atoms/Dashboard/RecentTicketTableText";
import StatusTab from "../../atoms/tickets/StatusTab";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ticketsActions } from "../../../state-manager/reducers/tickets/tickets";
import { getDateFromDateTime } from "../../../helpers/date-manipulation";

const Edit = styled("p")`
	color: #2b2e72;
	font-family: Poppins;
	font-size: 1rem;
	font-style: normal;
	font-weight: 600;
	line-height: 2.25rem; /* 225% */
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
`;

const TicketsTableBody = () => {
	const {
		tickets,
		loading: ticketsLoading,
		searchTicketsValue,
		showServiceRequestsTab,
		showProjectsTab,
		activeTicketsStartPoint,
		activeTicketsEndPoint,
	} = useSelector((state) => state.tickets);

	const {customers, loading: customersLoading} = useSelector((state) => state.customers);
	const dispatch = useDispatch()
	
	const filteredActiveTickets = useMemo(() => {
		return tickets.filter((ticket) => {
			if (showServiceRequestsTab) {
				return ticket.ticket_type === "service ticket";
			}
			if (showProjectsTab) {
				return ticket.ticket_type === "project ticket";
			}
		});
	}, [showServiceRequestsTab, showProjectsTab, tickets]);

	const filteredSearchTickets = useMemo(() => {
		return filteredActiveTickets
			.filter((ticket) => {
				// COME HERE TO FILTER WITH STRING if (!searchTicketsValue) return true;
				return true;
			})
			.filter(ticket => {
				const customerExist = customers.find(
					(customer) => +customer.id === +ticket.customer_id
				);
				return customerExist ? true : false
			});
	}, [searchTicketsValue, filteredActiveTickets]);

	useEffect(() => {
		dispatch(ticketsActions.updateField({ key: "activeTickets", value: filteredSearchTickets }));
	}, [filteredSearchTickets])

	if(customersLoading || ticketsLoading) return <tbody></tbody>

	const list = filteredSearchTickets
		.slice(activeTicketsStartPoint, activeTicketsEndPoint)
		.map((ticket, ind) => (
			<tr
				key={`${ticket.id}${ticket.user_id}${ticket.customer_id}${ticket.workspace_id}`}
				className="bg-white border-b hover:bg-gray-50"
			>
				<RecentTicketTableText>
					{customers.find((customer) => +customer.id === +ticket.customer_id)?.company_name}
				</RecentTicketTableText>
				<RecentTicketTableText>{ticket.ticket_form}</RecentTicketTableText>
				<RecentTicketTableText>ASchevchenko@Servirox...</RecentTicketTableText>
				<RecentTicketTableText>
					<StatusTab />
				</RecentTicketTableText>
				<RecentTicketTableText>{getDateFromDateTime(ticket.created_at)}</RecentTicketTableText>
				<RecentTicketTableText>
					<Edit className="justify-center items-center">
						Edit Ticket <EditIcon fontSize="small" /> <MoreVertIcon fontSize="small"></MoreVertIcon>{" "}
					</Edit>
				</RecentTicketTableText>
			</tr>
		));
	return <tbody>{list}</tbody>;
};

export default TicketsTableBody;
