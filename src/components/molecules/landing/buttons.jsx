// import CustomButton from "../../atoms/Password/customButton"
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { useState } from "react";

const NavigationButtonWrapper = styled("div")(() => ({
	display: "flex",
	gap: "20px",

	button: {
		color: "#ffffff",
		height: "40px",
		borderRadius: "8px",
		cursor: "pointer",
		position: "relative",
		zIndex: "20",
	},

	".try": {
		width: "142px",
		background:
			"linear-gradient(180deg, #9265E5 0%, rgba(146, 101, 229, 0.00) 100%, rgba(65, 45, 102, 0.90) 100%)",
	},

	".login": {
		width: "96px",
		border: "2px solid #ffffff",
	},

	".logins": {
		position: "relative",
	},

	".drop": {
		width: "220px",
		background: "white",
		padding: "5px",
		borderRadius: "8px",
		position: "absolute",
		top: "40.5px",
		right: "0",
		display: "none",
		flexDirection: "column",
		gap: "5px",
		justifyContent: "center",
	},

	".logins:hover .drop": {
		display: "flex"
	},

	".login-customer, .login-admin": {
		color: "#2B2E72",
		width: "100%",
		padding: "10px 10px 10px 10px",
		fontSize: "16px",
		textAlign: "left",
		fontWeight: "600",
		// border: "2px solid #2B2E72",
	},

	".login-customer:hover, .login-admin:hover": {
		background: "#2B2E72",
		color: "white",
	},
}));

const NavigateButtons = () => {
	return (
		<NavigationButtonWrapper>
			<Link to="/super-admin-onboarding">
				<button className="try" type="button">
					Try For Free
				</button>
			</Link>
			<div className="logins">
				<button className="login" type="button">
					Log In
				</button>
				<div className="drop">
					<Link to="/login-customer">
						<button className="login-customer" type="button">
							Login as a Customer
						</button>
					</Link>
					<Link to="/login-admin">
						<button className="login-admin" type="button">
							Login as an Admin
						</button>
					</Link>
				</div>
			</div>
		</NavigationButtonWrapper>
	);
};

export default NavigateButtons;
