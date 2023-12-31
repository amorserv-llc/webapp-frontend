import React from 'react';
import { MenuItem } from '@mui/material';

const DropDownItem = ({ text, icon, icone, onClick }) => (
  <MenuItem onClick={onClick}>
    {icon && <span>{icon}</span>}
    {text}
    {icone && <span>{icone}</span>}
  </MenuItem>
);

export default DropDownItem;
