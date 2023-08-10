import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { allRequiredFields } from "../state-manager/reducers/tickets/ticketCreation";

const useCreateTicketFields = () => {
	const chosenTemplate = useSelector((state) => state.ticketCreation.chosenTemplate);
  const { pathToTemplate } = useSelector((state) => state.ticketCreation);
	const allPossibleFields = useSelector((state) => state.ticketCreation.allPossibleFields);

	// console.log({allRequiredFields});

	const fields = chosenTemplate.reduce(
		(previousValue, currentSection) => {
			if (currentSection === "pointOfContact") {
				const { pointOfContactName, pointOfContactPhoneNumber, pointOfContactAddress } =
					allPossibleFields;
				return {
					...previousValue,
					pointOfContactName,
					pointOfContactPhoneNumber,
					pointOfContactAddress,
				};
			}
			if (currentSection === "numberOfTechniciansNeeded") {
				const { numberOfTechnicians } = allPossibleFields;
				return {
					...previousValue,
					numberOfTechnicians: +numberOfTechnicians,
				};
			}
			if (currentSection === "scopeOfWork") {
				const { scopeOfWorkDescription, scopeOfWorkDocument } = allPossibleFields;
				return {
					...previousValue,
					scopeOfWorkDescription,
					scopeOfWorkDocument,
				};
			}
			if (currentSection === "duration") {
				const { startDateTime, endDateTime } = allPossibleFields;
				return {
					...previousValue,
					startDateTime,
					endDateTime,
				};
			}
			if (currentSection === "hardwareComponentQuantity") {
				const { startDateTime, endDateTime } = allPossibleFields;
				return {
					...previousValue,
					startDateTime,
					endDateTime,
				};
			}
			if (currentSection === "hardwareComponentType") {
				const { hardwareComponentTypeQuantityValue, hardwareComponentTypeQuantityName } =
					allPossibleFields;
				return {
					...previousValue,
					hardwareQuantity: hardwareComponentTypeQuantityValue,
					hardwareName: hardwareComponentTypeQuantityName,
				};
			}
			if (currentSection === "location") {
				const { locations } = allPossibleFields;
				return {
					...previousValue,
					locations,
					pickLocations: [],
					dropOffLocations: [],
				};
			}
			if (currentSection === "materialsProcurement") {
				const { materialsDescription } = allPossibleFields;
				return {
					...previousValue,
					materialsDescription,
				};
			}
			if (currentSection === "numberOfWorkStation") {
				const { numberOfWorkstation } = allPossibleFields;
				return {
					...previousValue,
					numberOfWorkstation,
				};
			}
			if (currentSection === "numberOfWorkSystems") {
				const { numberOfWorkSystem } = allPossibleFields;
				return {
					...previousValue,
					numberOfWorkSystems: numberOfWorkSystem,
				};
			}
			if (currentSection === "softwareApplicationInstallation") {
				const { softwareInstallationQuantity, softwareInstallationName } = allPossibleFields;
				return {
					...previousValue,
					softwareInstallationQuantity,
					softwareInstallationName,
				};
			}
			if (currentSection === "softwareApplicationCustomization") {
				const { softwareCustomizationQuantity, softwareCustomizationName } = allPossibleFields;
				return {
					...previousValue,
					softwareCustomizationQuantity,
					softwareCustomizationName,
				};
			}
			if (currentSection === "pickUpLocation") {
				const { pickLocations } = allPossibleFields;
				return {
					...previousValue,
					pickLocations,
					locations: [],
				};
			}
			if (currentSection === "dropOffLocation") {
				const { dropOffLocations } = allPossibleFields;
				return {
					...previousValue,
					dropOffLocations,
					locations: [],
				};
			}
			if (currentSection === "additionalFields") {
				const { additionalFields } = allPossibleFields;
				const newAdditionalFields = additionalFields.map(({ name, value }) => ({ [name]: value }));
				return {
					...previousValue,
					additionalFields: newAdditionalFields,
				};
			}
			return { ...previousValue };
		},
		{
			...allRequiredFields,
			ticketType: pathToTemplate.at(0),
			ticketPath: pathToTemplate,
			ticketForm: pathToTemplate.at(-1),
			customerId: +allPossibleFields.customerId,
		}
	);

	// console.log({fields});

	return fields;
};

export default useCreateTicketFields;