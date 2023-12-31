import React from 'react'
import HorizontalRule from "../../../atoms/tickets/CreateTicketSuperAdmin/HorizontalRule";
import CompanyNameAndPathToTemplate from './CompanyNameAndPathToTemplate'
import MainTicketCreationForm from './MainTicketCreationForm'

const ModalTemplateContent = props => {
  return (
		<div className="container mx-auto">
			<div className="">
				<CompanyNameAndPathToTemplate />
			</div>
			<div className="max-w-[20rem] mb-[0.75rem]">
				<HorizontalRule />
			</div>
			<div className="">
        <MainTicketCreationForm/>
      </div>
		</div>
	);
}

ModalTemplateContent.propTypes = {}

export default ModalTemplateContent