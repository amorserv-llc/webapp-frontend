import { styled, useMediaQuery } from "@mui/material";
import Header from "../../atoms/landing/headings";
import Question from "../../atoms/landing/faq";
import DecorCircle from "../../atoms/landing/decorCircle";

const FaqWrapper = styled("div")(() => ({
	width: "100%",
	height: "auto",
	position: "relative",
	margin: "0 auto",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	gap: "64px",

	".questions": {
		width: "90%",
		display: "flex",
		justifyContent: "center",
		gap: "20px",
		flexWrap: "wrap",
	},
}));

const Faq = () => {
	const query = useMediaQuery("(max-width: 1100px)");

	return (
		<FaqWrapper>
			<Header
				title="Frequently Asked Questions"
				description="Here are some frequently asked questions about our IT Service Management web app:"
				width={query ? "380px" : "450px"}
				containerWidth="80%"
			/>
			<div className="questions">
				<Question
					question={"How does your app help me manage my IT operations?"}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<Question
					question={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery?"
					}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<Question
					question={"What are the benefits of using your app?"}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<Question
					question={"What core features does your app have?"}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<Question
					question={"How do i get started with Cusmits?"}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<Question
					question={"Can I register more than one business with Cusmits ITSM application?"}
					answer={
						"What is IT Service Management and how does Cusmits help me and my team to manage our service delivery"
					}
				/>
				<DecorCircle
					top="100px"
					right="0px"
					color="rgba(76, 111, 255, 0.12)"
					filter="blur(120.32733917236328px)"
				/>
			</div>
		</FaqWrapper>
	);
};

export default Faq;
