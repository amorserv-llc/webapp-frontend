import React from 'react'
import DetailText from '../DetailText';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const HardwareComponentQuantity = () => {
  const params = useParams();
	const { ticketId } = params;
	const { tickets } = useSelector((state) => state.tickets);
	const ticketInView = tickets.find((ticket) => +ticket.id === +ticketId);
	const { hardware_quantity, hardware_name } = ticketInView;

  return (
		<>
			<div className="flex">
				<div className="basis-[50%] py-[0.75rem]">
					<DetailText>Hardware Name</DetailText>
				</div>
				<div className="basis-[50%] py-[0.75rem]">
					<DetailText>{hardware_name}</DetailText>
				</div>
			</div>
			<div className="flex">
				<div className="basis-[50%] py-[0.75rem]">
					<DetailText>Number of Hardware Devices</DetailText>
				</div>
				<div className="basis-[50%] py-[0.75rem]">
					<DetailText>{hardware_quantity}</DetailText>
				</div>
			</div>
		</>
	);
}

export default HardwareComponentQuantity