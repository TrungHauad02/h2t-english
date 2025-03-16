import { Button, MenuItem, Stack, TextField, Grid, Box } from "@mui/material";
import WETextField from "components/input/WETextField";
import { LevelsEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WEDialog } from "components/display";
import { useNavigate } from "react-router-dom";
import WESelectImage from "components/input/WESelectImage";
import useTeacherAdvance from "../hooks/useTeacherAdvance";

export default function TeacherAdvance() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useTeacherAdvance();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        margin: "auto",
        mt: 2,
        maxWidth: 1150,
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <WESelectImage
        value={hooks.user?.avatar ?? ""}
        onChange={(base64) => hooks.handleChooseAvatar(base64)}
        label="Profile Picture"
        required
        disabled={!hooks.isEditing}
        sx={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <WETextField
            label="Email"
            type="email"
            name="email"
            value={hooks.user?.email || ""}
            onChange={(e) => hooks.handleInputChange("email", e.target.value)}
            required
            placeholder="Enter your email"
            disabled={!hooks.isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WETextField
            label="Name"
            type="text"
            name="name"
            value={hooks.user?.name || ""}
            onChange={(e) => hooks.handleInputChange("name", e.target.value)}
            required
            placeholder="Enter your name"
            disabled={!hooks.isEditing}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <WETextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={hooks.user?.phoneNumber || ""}
            onChange={(e) =>
              hooks.handleInputChange("phoneNumber", e.target.value)
            }
            required
            placeholder="Enter your phone number"
            disabled={!hooks.isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WETextField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={
              hooks.user?.dateOfBirth
                ? new Date(hooks.user.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              hooks.handleInputChange("dateOfBirth", e.target.value)
            }
            required
            disabled={!hooks.isEditing}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Level"
            name="level"
            value={hooks.user?.levelEnum || ""}
            onChange={(e) =>
              hooks.handleInputChange("levelEnum", e.target.value)
            }
            select
            fullWidth
            disabled={!hooks.isEditing}
          >
            {Object.values(LevelsEnum).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Status"
            name="status"
            value={hooks.user?.status ? "true" : "false"}
            onChange={(e) =>
              hooks.setUser((prevUser) =>
                prevUser ? { ...prevUser, status: e.target.value === "true" } : null
              )
            }
            select
            fullWidth
            disabled={!hooks.isEditing}
          >
            <MenuItem value="true">ACTIVE</MenuItem>
            <MenuItem value="false">INACTIVE</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{
                bgcolor: isDarkMode ? color.red700 : color.red500,
                flex: 1,
                mx: 1,
              }}
              onClick={hooks.handleRemove}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: isDarkMode ? color.edit : color.edit,
                flex: 1,
                mx: 1,
              }}
              onClick={hooks.handleChange}
            >
              {hooks.isEditing ? "Lock" : "Change"}
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: isDarkMode
                  ? color.btnSubmitBg
                  : color.btnSubmitHoverBg,
                flex: 1,
                mx: 1,
              }}
              onClick={() => {
                hooks.handleSubmit();
                navigate("/admin/manage-teacher");
              }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <WEDialog
        open={hooks.isRemoveDialogOpen}
        title="Confirm Delete"
        onCancel={hooks.cancelRemove}
        onOk={hooks.confirmRemove}
      >
        Are you sure you want to Delete?
      </WEDialog>
    </Stack>
  );
}
