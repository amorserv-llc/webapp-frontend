import React, {useEffect} from 'react'
import GrayThemedLightText from "../../GrayThemedLightText";
import GrayThemedLighterText from "../../GrayThemedLighterText";
import NumberDropDown from "../general/NumberDropDown";
import { useDispatch, useSelector } from "react-redux";
import { createTicketActions } from "../../../../../../state-manager/reducers/tickets/ticketCreation";
import useCreateTicketInput from "../../../../../../hooks/useCreateTicketInput";
import ValidationErrorText from "../../../../Login/ValidationErrorText";
import TextArea from "../general/TextArea";
import LocationTab from "../general/LocationTab";
import Checkbox from "../general/Checkbox";
import { isAddressEmpty } from "../../../../../../helpers/validation";

const DropOffLocation = () => {
	const allPossibleFields = useSelector((state) => state.ticketCreation.allPossibleFields);
	const numberOfDropLocation = allPossibleFields.numberOfDropLocation;
	const dropOffLocations = allPossibleFields.dropOffLocations;
	const activeDropOffLocationAddress = allPossibleFields.activeDropOffLocationAddress;
	const activeDropOffLocationType = allPossibleFields.activeDropOffLocationType;
	const dispatch = useDispatch();

	const {
		enteredValue: locationAddressValue,
		errorMessage: locationAddressErrorMessage,
		// lOCATION ADDRESS COMMENTED
		// setErrorMessage: locationAddressSetErrorMessage,
		hasError: locationAddressHasError,
		// lOCATION ADDRESS COMMENTED
		// setHasError: locationAddressSetHasError,
		valueChangeHandler: locationAddressChangeHandler,
		valueBlurHandler: locationAddressBlurHandler,
		valueIsValid: locationAddressIsValid,
		errorFromServer: locationAddressErrFromServer,
		// lOCATION ADDRESS COMMENTED
		// setErrorFromServer: locationAddressSetErrorFromServer,
		id: locationAddressId,
		reset: locationAddressReset,
	} = useCreateTicketInput("dropOffLocationAddress", isAddressEmpty);

	const numberOfDropLocationChangeHandler = (value) => {
		dispatch(createTicketActions.updateField({ key: "numberOfDropLocation", value: value }));
	};

	useEffect(() => {
	const newLocations = Array.from({ length: numberOfDropLocation }, () => ({
		address: "",
		type: "government",
	}));
	dispatch(createTicketActions.updateField({ key: "dropOffLocations", value: newLocations }));
	dispatch(createTicketActions.updateField({ key: "activeDropOffLocationAddress", value: 0 }));
	dispatch(createTicketActions.updateField({ key: "activeDropOffLocationType", value: 0 }));
	dispatch(createTicketActions.updateField({ key: "dropOffLocationAddress", value: "government" }));
	locationAddressReset();
}, [numberOfDropLocation, dispatch, locationAddressReset]);

	const changeDropOffLocationChangeHandler = (location) => {
		dispatch(createTicketActions.updateField({ key: "activeDropOffLocationAddress", value: location }));
		dispatch(createTicketActions.updateField({ key: "activeDropOffLocationType", value: location }));
	};

	useEffect(() => {
		// CONSOLE FIRED
		// console.log("fired");
		const newLocations = dropOffLocations.slice();
		const item = newLocations.find((loc, ind) => ind === activeDropOffLocationAddress);
		const newItem = { ...item, address: locationAddressValue };
		newLocations.splice(activeDropOffLocationAddress, 1, newItem);
		dispatch(createTicketActions.updateField({ key: "dropOffLocations", value: newLocations }));
		if (newLocations.every(({ address }) => isAddressEmpty(address)[0])) {
			dispatch(createTicketActions.updateField({ key: "dropOffLocationsAddressIsValid", value: true }));
		} else {
			dispatch(createTicketActions.updateField({ key: "dropOffLocationsAddressIsValid", value: false }));
		}
	}, [locationAddressValue, activeDropOffLocationAddress, dispatch, dropOffLocations]);

	useEffect(() => {
		locationAddressReset();
		dispatch(
			createTicketActions.updateField({
				key: "dropOffLocationAddress",
				value: dropOffLocations[activeDropOffLocationAddress].address,
			})
		);
	}, [activeDropOffLocationAddress, dispatch, dropOffLocations, locationAddressReset]);

	const tablet = (
		<div className="py-[0.375rem] border-b-[1px] border-[#000] inline-flex items-center gap-[0.5rem] mb-[1.12rem]">
			{dropOffLocations.map(({ address, type }, ind) => (
				<div key={`${address}${ind}`} className="flex items-center gap-[0.5rem]">
					{ind !== 0 && <div className="w-[2.5625rem] h-[0.0625rem] bg-[#000]"></div>}
					<LocationTab
						number={ind + 1}
						isActive={activeDropOffLocationAddress === ind}
						onClick={changeDropOffLocationChangeHandler}
						isValid={isAddressEmpty(address)[0]}
					/>
				</div>
			))}
		</div>
	);

	const boxesChangeHandler = (type) => {
		const newLocations = dropOffLocations.slice();
		const item = newLocations.find((loc, ind) => ind === activeDropOffLocationType);
		const newItem = { ...item, type: type };
		newLocations.splice(activeDropOffLocationType, 1, newItem);
		dispatch(createTicketActions.updateField({ key: "dropOffLocations", value: newLocations }));
	};

	const boxes = (
		<div className="flex items-center gap-[1.5rem]">
			{["government", "commercial", "residential"].map((type, ind) => (
				<Checkbox
					key={type}
					onChange={boxesChangeHandler}
					isActive={type === dropOffLocations[activeDropOffLocationType].type}
				>
					{type}
				</Checkbox>
			))}
		</div>
	);

	return (
		<div className="">
			<div className="mb-[0.75rem]">
				<GrayThemedLightText>Drop Off Locations Details:</GrayThemedLightText>
			</div>
			<div className="px-[1.5rem] py-[0.75rem] border-[0.5px] border-[#000]">
				<div className="flex items-center gap-[0.75rem] mb-[1.38rem]">
					<GrayThemedLighterText>Number of Locations</GrayThemedLighterText>
					<NumberDropDown
						min={1}
						max={5}
						onChange={numberOfDropLocationChangeHandler}
						value={numberOfDropLocation}
					/>
				</div>
				{tablet}
				<div className="mb-[0.75rem]">
					<GrayThemedLighterText>Location Address*</GrayThemedLighterText>
					<div className="w-[30rem] h-[6.25rem]">
						<TextArea
							id={locationAddressId}
							type={"text"}
							onBlur={locationAddressBlurHandler}
							onChange={locationAddressChangeHandler}
							placeholder={"Enter address..."}
							value={locationAddressValue}
							resizable={false}
							isValid={locationAddressIsValid}
						/>
					</div>
					{locationAddressHasError && (
						<ValidationErrorText errorFromServer={locationAddressErrFromServer}>
							{locationAddressErrorMessage}
						</ValidationErrorText>
					)}
				</div>
				<div className="">
					<div className="mb-[0.88rem]">
						<GrayThemedLighterText>Select building type*</GrayThemedLighterText>
					</div>
					{boxes}
				</div>
			</div>
		</div>
	);
}

export default DropOffLocation