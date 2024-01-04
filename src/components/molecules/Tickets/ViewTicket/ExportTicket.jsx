import React, { useState } from "react";
import PropTypes from "prop-types";
import TicketPDFIndex from "../TicketPDF/TicketPDFIndex";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import styled from "@emotion/styled";
import ClickAwayComp from "../../../atoms/general/ClickAwayComp";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { CSVLink } from "react-csv";
import { ticketHeaders } from "../../../atoms/Reports/headers";

const ExportIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		<g clipPath="url(#clip0_4726_31238)">
			<path
				d="M5.3999 21.5999C4.60425 21.5999 3.84119 21.2838 3.27858 20.7212C2.71597 20.1586 2.3999 19.3956 2.3999 18.5999V5.3999C2.3999 4.60425 2.71597 3.84119 3.27858 3.27858C3.84119 2.71597 4.60425 2.3999 5.3999 2.3999H9.5269C9.79212 2.3999 10.0465 2.50526 10.234 2.6928C10.4215 2.88033 10.5269 3.13469 10.5269 3.3999C10.5302 3.67804 10.4294 3.94737 10.2444 4.15511C10.0594 4.36284 9.80356 4.49401 9.5269 4.5229H5.5269C5.26169 4.5229 5.00733 4.62826 4.8198 4.8158C4.63226 5.00333 4.5269 5.25769 4.5269 5.5229V18.4769C4.5269 18.7421 4.63226 18.9965 4.8198 19.184C5.00733 19.3715 5.26169 19.4769 5.5269 19.4769H18.3999C18.6651 19.4769 18.9195 19.3715 19.107 19.184C19.2945 18.9965 19.3999 18.7421 19.3999 18.4769V14.4769C19.442 14.1944 19.5856 13.937 19.804 13.7528C20.0223 13.5687 20.3004 13.4706 20.5859 13.4769C20.8511 13.4769 21.1055 13.5823 21.293 13.7698C21.4805 13.9573 21.5859 14.2117 21.5859 14.4769V18.6039C21.5859 19.3996 21.2698 20.1626 20.7072 20.7252C20.1446 21.2878 19.3816 21.6039 18.5859 21.6039L5.3999 21.5999ZM15.5749 14.0789C15.4488 14.0231 15.3416 13.9316 15.2667 13.8158C15.1917 13.7 15.1522 13.5649 15.1529 13.4269V11.0819C14.9647 11.0721 14.7763 11.0675 14.5879 11.0679C12.6729 11.0679 9.2699 11.4189 7.9469 13.7749C7.88807 13.8826 7.80129 13.9724 7.69569 14.0349C7.59009 14.0973 7.4696 14.1302 7.3469 14.1299C7.28642 14.1301 7.22619 14.122 7.1679 14.1059C7.02056 14.0644 6.8909 13.9756 6.79879 13.8534C6.70667 13.7311 6.65719 13.582 6.6579 13.4289C6.7244 11.3739 7.53498 9.41303 8.9389 7.9109C10.6096 6.31048 12.8364 5.42132 15.1499 5.4309V3.1099C15.149 2.97255 15.1885 2.83797 15.2636 2.72292C15.3386 2.60788 15.4458 2.51745 15.5719 2.4629C15.698 2.40983 15.8372 2.39575 15.9714 2.42249C16.1056 2.44922 16.2287 2.51554 16.3249 2.6129L21.3799 7.7729C21.5116 7.90601 21.5854 8.08568 21.5854 8.2729C21.5854 8.46013 21.5116 8.63979 21.3799 8.7729L16.3249 13.9319C16.2286 14.0291 16.1056 14.0954 15.9714 14.1222C15.8373 14.1491 15.6982 14.1354 15.5719 14.0829L15.5749 14.0789ZM15.7259 9.5599C15.8778 9.57862 16.0174 9.65276 16.118 9.76811C16.2186 9.88345 16.273 10.0319 16.2709 10.1849V11.3469L19.2889 8.2699L16.2759 5.1929V6.3599C16.2756 6.52428 16.2106 6.68195 16.095 6.79874C15.9793 6.91554 15.8223 6.98206 15.6579 6.9839C14.7008 6.91833 13.7404 7.04875 12.8354 7.3672C11.9305 7.68564 11.1 8.1854 10.3949 8.8359C9.83298 9.42048 9.39938 10.116 9.1219 10.8779C10.7619 9.91429 12.643 9.43932 14.5439 9.5089C15.2429 9.5099 15.6999 9.5619 15.7239 9.5619L15.7259 9.5599Z"
				fill="#2B2E72"
			/>
		</g>
		<defs>
			<clipPath id="clip0_4726_31238">
				<rect width="24" height="24" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export const removeNullishValuesFromTickets = (ticket, removeAllNullish = true) => {
	const ticketCopy = structuredClone(ticket);
	const valuesToExclude = ["", "[]", "undefined", "null", null, undefined];
	Object.keys(ticket).forEach((key) => {
		if (valuesToExclude.includes(ticket[key])) {
			if (removeAllNullish) {
				delete ticketCopy[key];
			} else {
				ticketCopy[key] = "";
			}
		}
	});
	return ticketCopy;
};

const DropDown = ({ setShowDropdown, className }) => {
	const params = useParams();
	const { ticketId } = params;
	const { tickets } = useSelector((state) => state.tickets);
	const { customers } = useSelector((state) => state.customers);
	const { users } = useSelector((state) => state.users);
	const ticket = tickets.find((ticket) => +ticket.id === +ticketId);
	const { data } = useSelector((state) => state.authUser);
	const userType = data.user_type;
	const isCustomer = userType === "customer";

	let customer;
	if (isCustomer) {
		customer = data;
	} else {
		customer = customers.find((customer) => +customer.user_id === +ticket.customer_id);
	}

	const user = users.find((user) => +user.id === +ticket.user_id);
	const list = [removeNullishValuesFromTickets(ticket, true)];

	return (
		<div
			className={twMerge(
				`min-w-[12rem] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-2 rounded-xl bg-white ${className}`
			)}
		>
			<CSVLink
				data={list}
				headers={ticketHeaders}
				filename={`ticket-${ticket.id}-${new Date()}-csv`}
				target="_blank"
				className="block w-full px-4 py-3 cursor-pointer hover:bg-[#F1F2FD] text-[#2B2E72] font-medium transition duration-300 ease-in-out"
			>
				CSV
			</CSVLink>
			<PDFDownloadLink
				document={<TicketPDFIndex ticket={ticket} customer={customer} user={user} />}
				fileName={`ticket-${ticket.id}-${new Date()}-pdf`}
				onClick={(event) => event.stopPropagation()}
				className="inline-block w-full px-4 py-3 cursor-pointer hover:bg-[#F1F2FD] text-[#2B2E72] font-medium transition duration-300 ease-in-out"
			>
				{({ blob, url, loading, error }) => (loading ? "Loading PDF..." : "PDF")}
			</PDFDownloadLink>
		</div>
	);
};

const ExportTicket = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="relative w-full">
			<button
				onClick={(e) => {
					e.stopPropagation();
					setShowDropdown((pv) => !pv);
				}}
				className="flex items-center gap-2 px-2 p-1 rounded-md border-[0.5px] border-solid border-[#2B2E72] text-[#2B2E72] text-lg not-italic font-medium font-poppins transition duration-300 ease-in-out transform active:scale-95 hover:bg-opacity-95"
			>
				<span>Export</span>
				<ExportIcon />
			</button>
			{showDropdown && (
				<ClickAwayComp
					onClickAway={() => {
						setShowDropdown(false);
					}}
				>
					<DropDown
						className="w-full absolute top-[110%] right-0"
						setShowDropdown={setShowDropdown}
					/>
				</ClickAwayComp>
			)}
		</div>
	);
};

ExportTicket.propTypes = {
	ticket: PropTypes.object,
	customer: PropTypes.object,
};

DropDown.propTypes = {
	setShowDropdown: PropTypes.func,
	className: PropTypes.string,
};

export default ExportTicket;
