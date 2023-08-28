import React from 'react'
import AdditionalFields from "./components/AdditionalFields";
import DropOffLocation from "./components/DropOffLocation";
import Duration from "./components/Duration";
import HardwareComponentQuantity from "./components/HardwareComponentQuantity";
import HardwareComponentType from "./components/HardwareComponentType";
import Location from "./components/Location";
import MaterialsProcurement from "./components/MaterialsProcurement";
import NumberOfTechNeeded from "./components/NumberOfTechNeeded";
import NumberOfWorkStation from "./components/NumberOfWorkStation";
import NumberOfWorkSystem from "./components/NumberOfWorkSystem";
import PickUpLocation from "./components/PickUpLocation";
import PointOfContact from "./components/PointOfContact";
import ScopeOfWork from "./components/ScopeOfWork";
import SoftwareCustomization from "./components/SoftwareCustomization";
import SoftwareInstallation from "./components/SoftwareInstallation";
import Attachments from "./components/Attachments";
import { useSelector } from 'react-redux';

const TicketTemplateDetails = () => {
		const chosenTemplate = useSelector((state) => state.ticketEdition.chosenTemplate);
		const pointOfContact = chosenTemplate.includes("pointOfContact");
		const numberOfTechniciansNeeded = chosenTemplate.includes("numberOfTechniciansNeeded");
		const scopeOfWork = chosenTemplate.includes("scopeOfWork");
		const duration = chosenTemplate.includes("duration");
		const hardwareComponentQuantity = chosenTemplate.includes("hardwareComponentQuantity");
		const hardwareComponentType = chosenTemplate.includes("hardwareComponentType");
		const location = chosenTemplate.includes("location");
		const materialsProcurement = chosenTemplate.includes("materialsProcurement");
		const numberOfWorkStation = chosenTemplate.includes("numberOfWorkStation");
		const numberOfWorkSystems = chosenTemplate.includes("numberOfWorkSystems");
		const softwareApplicationInstallation = chosenTemplate.includes(
			"softwareApplicationInstallation"
		);
		const softwareApplicationCustomization = chosenTemplate.includes(
			"softwareApplicationCustomization"
		);
		const pickUpLocation = chosenTemplate.includes("pickUpLocation");
		const dropOffLocation = chosenTemplate.includes("dropOffLocation");
		const additionalFields = chosenTemplate.includes("additionalFields");

  return (
		<div className="divide-y divide-[#ECECEC] max-h-[12rem] overflow-y-auto">
			{pointOfContact && <PointOfContact />}
			{numberOfTechniciansNeeded && <NumberOfTechNeeded />}
			{numberOfWorkStation && <NumberOfWorkStation />}
			{numberOfWorkSystems && <NumberOfWorkSystem />}
			{scopeOfWork && <ScopeOfWork />}
			{duration && <Duration />}
			{materialsProcurement && <MaterialsProcurement />}
			{softwareApplicationInstallation && <SoftwareInstallation />}
			{softwareApplicationCustomization && <SoftwareCustomization />}
			{hardwareComponentQuantity && <HardwareComponentQuantity />}
			{hardwareComponentType && <HardwareComponentType />}
			{location && <Location />}
			{dropOffLocation && <DropOffLocation />}
			{pickUpLocation && <PickUpLocation />}
			{additionalFields && <AdditionalFields />}
			{<Attachments />}
		</div>
	);
}

export default TicketTemplateDetails