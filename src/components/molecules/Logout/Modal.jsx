import React, {useEffect} from "react";
import PropTypes from "prop-types";
// import Button
import Title from "../../atoms/Logout/Title";
import Message from "../../atoms/Logout/Message";
import ButtonUnHighlighted from "../../atoms/Logout/ButtonUnHighlighted";
import ButtonHighlighted from "../../atoms/Logout/ButtonHighlighted";
import ModalWrapper from "../../atoms/Logout/ModalWrapper";
import logOut from "../../atoms/Logout/Logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutActions, logout } from "../../../state-manager/reducers/logout/logout";
import { getDeviceName } from "../../../utilis";

const Modal = () => {
	const {loading} = useSelector(state => state.logout)
	const dispatch = useDispatch();
	const handleHideLogoutModal = () => {
		dispatch(logoutActions.toggleLogoutModal());
	};

	const handleLogout = () => {
		console.log("logout here");
		const deviceName = getDeviceName()
		dispatch(logout({deviceName: deviceName}))
	};

	return (
		<ModalWrapper>
			<div className="w-[3rem] h-[3rem] rounded-full bg-[#ccc] flex items-center justify-center">
				<img src={logOut} />
			</div>
			<div className="space-y-[0.5rem]">
				<Title>Logout</Title>
				<Message>Are you sure you want o logout?</Message>
			</div>
			<div className="flex items-center justify-between gap-[0.75rem]">
				<ButtonUnHighlighted onClick={handleHideLogoutModal}>Discard</ButtonUnHighlighted>
				<ButtonHighlighted onClick={handleLogout} loading={loading} >Logout</ButtonHighlighted>
			</div>
		</ModalWrapper>
	);
};


export default Modal;
