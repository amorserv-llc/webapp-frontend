import { styled } from "@mui/material";
import React, { Component } from "react";

class CustomerDetails extends Component {
	state = {
		totalCount: null,
		progressBars: [
			{ name: "Active", progress: null },
			{ name: "Inactive", progress: null },
			{ name: "Suspended", progress: null },
		],
	};

	componentDidMount() {
		setTimeout(() => {
			const totalCount = 80;
			const progressBars = [
				{ name: "Active", progress: 50 },
				{ name: "Inactive", progress: 20 },
				{ name: "Suspended", progress: 10 },
			];

			this.setState({ totalCount, progressBars });
		}, 1000);
	}

	render() {
		const { totalCount, progressBars } = this.state;

		const Text = styled("p")`
			color: #333;
			font-family: Poppins;
			font-size: 20px;
			font-style: normal;
			font-weight: 400;
			padding-bottom: 8px;
			line-height: 32.625px; /* 163.125% */
		`;

		const nameStyle = {
			color: "#000",
			fontFamily: "Poppins",
			fontSize: "20px",
			fontStyle: "normal",
			fontWeight: 500,
			lineHeight: "32.625px",
			width: "110px",
		};

		const progressBarContainerStyle = {
			width: "80%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		};

		const progressBarStyle = {
			flex: 1,
			height: "13.05px",
			backgroundColor: "var(--gray-100, #F2F4F7)",
			borderRadius: "6.525px",
			marginRight: "18px",
			overflow: "hidden",
		};

		const progressBarFillStyle = {
			height: "100%",
			backgroundColor: "#2B2E72",
			borderRadius: "6.525px",
			width: 0,
			animation: "slide-in 1s ease-in-out forwards",
		};

		const progressBarTextStyle = {
			color: "#2B2E72",
			fontFamily: "Poppins",
			fontSize: "20px",
			fontStyle: "normal",
			fontWeight: 600,
			lineHeight: "32.625px",
		};

		const cssKeyframes = `
      @keyframes slide-in {
        0% {
          width: 0;
        }
      }
    `;

		return (
			<div>
				<style>{cssKeyframes}</style>
				<Text>
					Total Customers:{" "}
					<span style={{ color: "#2b2e72", fontWeight: "600", fontSize: "20px" }}>
						{totalCount}
					</span>
				</Text>
				{progressBars.map((bar) => (
					<div key={bar.name} style={{ display: "flex", alignItems: "center" }}>
						<p style={{ ...nameStyle, marginRight: "10px" }}>{bar.name}</p>
						<div style={progressBarContainerStyle}>
							<div style={progressBarStyle}>
								{bar.progress !== null && (
									<div
										style={{
											...progressBarFillStyle,
											width: `${bar.progress}%`,
											height: "100%",
											backgroundColor: "#2B2E72",
											borderRadius: "6.525px",
										}}
									></div>
								)}
							</div>
							{bar.progress !== null && (
								<span style={progressBarTextStyle}>{`${bar.progress}`}</span>
							)}
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default CustomerDetails;
