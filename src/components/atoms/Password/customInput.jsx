import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { InputWrapper } from "./wrappers";
import Icon from "./customIcon";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const CustomInput = ({
	type,
	name,
	width,
	height,
	placeholder,
	label,
	value,
	confirm,
	empty,
	error,
	handleChange,
	serverError,
	currentError,
}) => {
	const mquery = useMediaQuery("(max-width: 500px)");
	const [toggle, setToggle] = useState(true);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	return (
		<InputWrapper mquery={mquery} error={error || serverError} empty={empty} value={value} confirm={confirm} inputWidth={width} inputHeight={height}>
			<input
				id={label}
				name={name}
				type={toggle ? type : "text"}
				onChange={handleChange}
				placeholder={placeholder}
				required
				disabled={(type === 'password' && name === 'confirmPassword') && currentError}
			/>
			{type === "password" && (
				<Icon
					onClick={handleToggle}
					align="right"
					style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer" }}
					icon={toggle ? <VisibilityOffOutlinedIcon style={{color: "#828282"}} /> :  <VisibilityOutlinedIcon style={{color: "#828282"}} />}
				/>
			)}
		</InputWrapper>
	);
};

CustomInput.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	confirm: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
	empty: PropTypes.bool,
	errorMessage: PropTypes.string,
	handleChange: PropTypes.func,
	serverError: PropTypes.bool,
	currentError: PropTypes.bool,
};

export default CustomInput;
