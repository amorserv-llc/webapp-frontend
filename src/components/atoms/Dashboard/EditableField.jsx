import React, { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const EditableField = ({ label, value, isEditable, }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(editedValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditedValue(editedValue);
  };

  return (
    <Box>
      <div
        style={{
          color: "#2B2E72",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
        {isEditable && (
          <React.Fragment>
            {isEditing ? (
              <Box sx={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                <IconButton onClick={handleSave} size="small" style={{ color: "green" }}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={handleCancel} size="small" style={{ color: "red" }}>
                  <ClearIcon />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={handleEdit} size="small" style={{ color: "#2B2E72" }}>
                <EditIcon />
              </IconButton>
            )}
          </React.Fragment>
        )}
      </div>
      {isEditable && isEditing ? (
        <TextField
          variant="outlined"
          fullWidth
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          sx={{
            width: '100%',
            "& .MuiOutlinedInput-root": {
              " .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2B2E72",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2B2E72",
              },
            },
          }}
        />
      ) : (
        <div
          style={{
            color: "#828282",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "30px",
          }}
        >
          {editedValue}
        </div>
      )}
    </Box>
  );
};

export default EditableField;
