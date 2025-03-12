import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { User } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import { WESelectImage } from "components/input";
import useColor from "theme/useColor";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import { userService } from "../services/userServices";
import { formatDate } from "utils/format";

export default function StudentProfilePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [data, setData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  React.useEffect(() => {
    const user = userService.getUserById(1);
    if (user) {
      setData(user);
      setFormData(user);
    }
  }, []);

  if (!data) {
    return (
      <Stack
        sx={{
          mt: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
        >
          Loading student profile...
        </Typography>
      </Stack>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        dateOfBirth: new Date(e.target.value),
      });
    }
  };

  const handleAvatarChange = (base64: string) => {
    if (formData) {
      setFormData({
        ...formData,
        avatar: base64,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      setData(formData);
      // Here you would normally call an API to save the data
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setFormData(data);
    setEditMode(false);
  };

  const textColor = isDarkMode ? color.gray200 : color.gray900;
  const paperBgColor = isDarkMode ? color.gray900 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  // View Mode Component
  const ViewModeContent = () => (
    <CardContent sx={{ pb: 4, pt: 10, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: -60,
          left: { xs: "50%", md: 40 },
          transform: { xs: "translateX(-50%)", md: "none" },
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `4px solid ${isDarkMode ? color.teal700 : color.white}`,
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Avatar
          src={data.avatar}
          alt={data.name}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
                mt: { xs: 2, md: 0 },
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              {data.name}
            </Typography>

            <Divider sx={{ borderColor: borderColor }} />

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  mb: 1,
                }}
              >
                Contact Information
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    id="email-input"
                    value={data.email}
                    disabled
                    readOnly
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailIcon
                          sx={{
                            color: isDarkMode ? color.teal400 : color.teal600,
                          }}
                        />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: isDarkMode ? color.gray800 : color.gray100,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "& .MuiInputBase-input": {
                        color: textColor,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    id="phone-input"
                    value={data.phoneNumber}
                    disabled
                    readOnly
                    startAdornment={
                      <InputAdornment position="start">
                        <PhoneIcon
                          sx={{
                            color: isDarkMode ? color.teal400 : color.teal600,
                          }}
                        />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: isDarkMode ? color.gray800 : color.gray100,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "& .MuiInputBase-input": {
                        color: textColor,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  mb: 1,
                }}
              >
                Personal Information
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    id="dob-input"
                    value={formatDate(data.dateOfBirth)}
                    disabled
                    readOnly
                    startAdornment={
                      <InputAdornment position="start">
                        <CakeIcon
                          sx={{
                            color: isDarkMode ? color.teal400 : color.teal600,
                          }}
                        />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: isDarkMode ? color.gray800 : color.gray100,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "& .MuiInputBase-input": {
                        color: textColor,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  {/* Account Status */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: isDarkMode ? color.gray800 : color.teal50,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: secondaryTextColor,
                        fontWeight: "medium",
                      }}
                    >
                      Account Status:
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          color: data.status
                            ? isDarkMode
                              ? color.emerald400
                              : color.emerald600
                            : isDarkMode
                            ? color.red400
                            : color.red600,
                          fontWeight: "bold",
                        }}
                      >
                        {data.status ? "Active" : "Inactive"}
                      </Box>
                    </Typography>
                  </Box>

                  {/* Created At */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: isDarkMode ? color.gray800 : color.teal50,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <CalendarTodayIcon sx={{ mr: 1.5, color: accentColor }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: secondaryTextColor,
                        fontWeight: "medium",
                      }}
                    >
                      Created: {formatDate(data.createdAt || new Date())}
                    </Typography>
                  </Box>

                  {/* Updated At */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: isDarkMode ? color.gray800 : color.teal50,
                      borderRadius: 2,
                    }}
                  >
                    <UpdateIcon sx={{ mr: 1.5, color: accentColor }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: secondaryTextColor,
                        fontWeight: "medium",
                      }}
                    >
                      Updated: {formatDate(data.updatedAt || new Date())}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );

  // Edit Mode Component
  const EditModeContent = () => (
    <CardContent sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Stack spacing={3} alignItems="center">
            <WESelectImage
              value={formData?.avatar || ""}
              onChange={handleAvatarChange}
            />
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray600,
                textAlign: "center",
              }}
            >
              Click to change profile picture
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={9}>
          <Stack spacing={4}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              value={formData?.name}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal400 : color.teal500,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": {
                  color: textColor,
                },
              }}
            />

            <Divider sx={{ borderColor: borderColor }} />

            <Typography
              variant="subtitle1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: "bold",
              }}
            >
              Contact Information
            </Typography>

            <TextField
              fullWidth
              name="email"
              label="Email Address"
              value={formData?.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{
                        color: isDarkMode ? color.teal400 : color.teal600,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal400 : color.teal500,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": {
                  color: textColor,
                },
              }}
            />

            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData?.phoneNumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon
                      sx={{
                        color: isDarkMode ? color.teal400 : color.teal600,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal400 : color.teal500,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": {
                  color: textColor,
                },
              }}
            />

            <Divider sx={{ borderColor: borderColor }} />

            <Typography
              variant="subtitle1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: "bold",
              }}
            >
              Personal Information
            </Typography>

            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              value={formatDate(formData?.dateOfBirth || new Date())}
              onChange={handleDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon
                      sx={{
                        color: isDarkMode ? color.teal400 : color.teal600,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                  },
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal400 : color.teal500,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": {
                  color: textColor,
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );

  return (
    <Stack spacing={4} sx={{ mt: 9, px: { xs: 2, sm: 4, md: 6 }, pb: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? color.teal300 : color.teal700,
          }}
        >
          Student Profile
        </Typography>
        {!editMode ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
            sx={{
              bgcolor: color.edit,
              color: color.gray900,
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald700 : color.emerald600,
              },
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                bgcolor: color.save,
                color: color.gray900,
                "&:hover": {
                  bgcolor: isDarkMode ? color.successDarkMode : color.success,
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{
                bgcolor: color.delete,
                color: color.white,
                "&:hover": {
                  bgcolor: isDarkMode ? color.red700 : color.red600,
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}
      </Box>

      <Card
        elevation={3}
        sx={{
          bgcolor: paperBgColor,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${borderColor}`,
        }}
      >
        {!editMode && (
          <Box
            sx={{
              height: 120,
              bgcolor: isDarkMode ? color.teal900 : color.teal200,
              position: "relative",
            }}
          />
        )}

        {editMode ? <EditModeContent /> : <ViewModeContent />}
      </Card>
    </Stack>
  );
}
