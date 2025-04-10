import React from 'react';
import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface StatusSwitchProps {
  status: boolean;
  onChange: (status: boolean) => void;
  label?: string;
}

export default function StatusSwitch({ 
  status, 
  onChange,
  label = "Active"
}: StatusSwitchProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray200 : color.gray800;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={status}
              onChange={(e) => onChange(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: accentColor,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: accentColor,
                },
              }}
            />
          }
          label={label}
          sx={{
            '& .MuiFormControlLabel-label': {
              color: textColor
            }
          }}
        />
      </FormGroup>
    </Box>
  );
}