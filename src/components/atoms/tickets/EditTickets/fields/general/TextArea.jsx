import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ placeholder, value, onChange, onBlur, hasError, id, resizable, isValid }) => {
    const changeHandler = (e) => onChange(e.target.value);
		const blurHandler = () => onBlur();

	return (
		<textarea
			id={id}
			placeholder={placeholder}
			onChange={changeHandler}
			onBlur={blurHandler}
			value={value}
			className={`w-full h-full min-h-full flex px-4 text-[0.875rem] py-3.5 rounded-md bg-[#eee] outline-none focus:border focus:border-[#2B2E72]  ${
				isValid && "border border-[#2B2E72]"
			} ${resizable ? "resize" : "resize-none"} ${hasError ? "border border-[#D73D3D]" : ""}`}
		/>
	);
};

TextArea.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	hasError: PropTypes.bool,
	id: PropTypes.string,
	resizable: PropTypes.bool,
	isValid: PropTypes.bool,
};

export default TextArea