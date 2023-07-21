import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import CheckIcon from "../../../assets/superAdminOnboading/Check.png";
import React from "react";

const SuperAdminSuccess = () => {
	const Typography = styled("p")`
		color: #2b2e72;
		text-align: center;
		font-family: Poppins;
		font-size: 32px;
		font-style: normal;
		font-weight: 600;
		line-height: 136.023%; /* 43.527px */
	`;
	const Text = styled("p")`
		color: #282828;
		text-align: center;
		font-family: Poppins;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 162.023%; /* 29.164px */
	`;
	const Button = styled("p")`
		display: flex;
		padding: 16px 24px;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		align-self: stretch;
		border-radius: 8px;
		background: #2b2e72;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		color: var(--theme-white-default, #fff);
		line-height: 14px; /* 70% */
		width: 425px;
	`;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				fontFamily: "Poppins",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				gap: "30px",
				flexShrink: "0",
				minHeight: "80vh",
			}}
		>
			<img src={CheckIcon} style={{ width: "56px", flexShrink: "0" }} />
			<div>
				<Typography component={"h3"}>
					Your Email Has Been <br />
					Verified.
				</Typography>
				<Text>Now you can proceed to login to your Account.</Text>
			</div>
			<div>
				<br />
				<Link to={"#"}>
					<Button variant="contained" color="primary">
						Proceed to Login
					</Button>
				</Link>
			</div>
		</Box>
	);
};

export default SuperAdminSuccess;