import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { DescriptionWrapper } from "./wrappers";

const Description = ({ description, size, desWidth, color, align, dPadding }) => {
	const mquery = useMediaQuery("(max-width: 500px)");

	return (
		<DescriptionWrapper
			mquery={mquery}
			size={size}
			width={desWidth}
			color={color}
			align={align}
			padding={dPadding}
		>
			<p>{description}</p>
		</DescriptionWrapper>
	);
};

Description.propTypes = {
	description: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	desWidth: PropTypes.string,
	align: PropTypes.string,
	dPadding: PropTypes.bool,
};

export default Description;
