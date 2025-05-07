import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  Avatar,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Chip,
  alpha,
} from "@mui/material";
import {
  Close,
  CloudUpload,
  SaveOutlined,
  ReportProblemOutlined,
  LockResetOutlined,
} from "@mui/icons-material";
import { User, RolesEnum, LevelsEnum } from "interfaces";
import { userService } from "services/features/userService";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WEDateField } from "components/input";

interface TeacherAdvanceDialogProps {
  open: boolean;
  onClose: () => void;
  selectedUser?: User | null;
  onSave: () => void;
}

export default function TeacherAdvanceDialog({
  open,
  onClose,
  selectedUser,
  onSave,
}: TeacherAdvanceDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const DEFAULT_PASSWORD = "English@web1";

  const initialUserState: User = {
    id: 0,
    name: "",
    email: "",
    avatar: "",
    role: RolesEnum.TEACHER_ADVANCE,
    status: true,
    password: DEFAULT_PASSWORD, // Set default password for new users
    level: LevelsEnum.BACHELOR,
    phoneNumber: "",
    dateOfBirth: undefined,
  };

  const [user, setUser] = useState<User>(initialUserState);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetPasswordLoading, setResetPasswordLoading] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [resetPasswordSuccess, setResetPasswordSuccess] =
    useState<boolean>(false);
  const isEditMode = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      // For edit mode, don't include password
      const { password, ...userWithoutPassword } = selectedUser;
      setUser({ ...userWithoutPassword, password: "" });
      setPreviewAvatar(selectedUser.avatar || "");
    } else {
      // For new user, set default password
      setUser(initialUserState);
      setPreviewAvatar("");
    }
    // Reset password success status when dialog opens/closes
    setResetPasswordSuccess(false);
  }, [selectedUser, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setUser((prev) => ({ ...prev, dateOfBirth: date || undefined }));

    if (errors["dateOfBirth"]) {
      setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewAvatar(base64String);
        setUser((prev) => ({ ...prev, avatar: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        // For edit mode, don't send password unless it's changed
        const { password, ...userWithoutPassword } = user;
        await userService.patch(user.id, userWithoutPassword);
      } else {
        // For new user, always include the default password
        await userService.create({ ...user, password: DEFAULT_PASSWORD });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving teacher advance:", error);
      // Handle API errors here
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user.id) return;

    setResetPasswordLoading(true);
    try {
      await userService.patch(user.id, { password: DEFAULT_PASSWORD });
      setResetPasswordSuccess(true);
      setTimeout(() => setResetPasswordSuccess(false), 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const titleBackgroundColor = isDarkMode ? color.teal900 : color.teal100;
  const contentBackgroundColor = isDarkMode ? color.gray800 : color.white;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: contentBackgroundColor,
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 8px 32px rgba(20, 184, 166, 0.15)",
          border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: titleBackgroundColor,
          color: isDarkMode ? color.teal50 : color.teal800,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={isEditMode ? "EDIT" : "NEW"}
            size="small"
            sx={{
              bgcolor: isEditMode ? color.edit : color.teal500,
              color: isEditMode ? color.gray800 : color.white,
              fontWeight: "bold",
              mr: 2,
              fontSize: "0.75rem",
            }}
          />
          <Typography variant="h6" component="div" fontWeight="bold">
            {isEditMode ? "Edit Teacher Advance" : "Add New Teacher Advance"}
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={loading}
          sx={{
            color: isDarkMode ? color.teal300 : color.teal700,
            "&:hover": {
              bgcolor: isDarkMode
                ? alpha(color.teal800, 0.5)
                : alpha(color.teal200, 0.5),
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: contentBackgroundColor, mt: 3 }}>
        <Grid container spacing={3}>
          {/* Avatar Section */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 2,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                borderRadius: "1rem",
                border: `1px dashed ${
                  isDarkMode ? color.teal600 : color.teal400
                }`,
              }}
            >
              <Avatar
                src={previewAvatar}
                alt={user.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: `4px solid ${
                    isDarkMode ? color.teal600 : color.teal400
                  }`,
                  boxShadow: `0 4px 20px ${
                    isDarkMode
                      ? "rgba(94, 234, 212, 0.15)"
                      : "rgba(20, 184, 166, 0.2)"
                  }`,
                }}
              />

              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  borderColor: isDarkMode ? color.teal700 : color.teal300,
                  "&:hover": {
                    borderColor: isDarkMode ? color.teal500 : color.teal400,
                    bgcolor: isDarkMode
                      ? alpha(color.teal900, 0.7)
                      : alpha(color.teal50, 0.9),
                  },
                  textTransform: "none",
                  mt: 2,
                }}
              >
                Upload Avatar
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Button>

              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray500,
                  textAlign: "center",
                  mt: 1,
                }}
              >
                Recommended: 300x300 px
                <br />
                JPG, PNG or GIF
              </Typography>
            </Box>

            {isEditMode && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: isDarkMode
                    ? alpha(color.gray700, 0.8)
                    : alpha(color.gray100, 0.8),
                  borderRadius: "0.75rem",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
                >
                  <b>ID:</b> {user.id}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray600,
                    mt: 1,
                  }}
                >
                  <b>Created:</b>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray600,
                    mt: 1,
                  }}
                >
                  <b>Last Updated:</b>{" "}
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString()
                    : "N/A"}
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Form Fields */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal500 : color.teal600,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal500 : color.teal600,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                />
              </Grid>

              {/* Password Reset Section (only in Edit mode) */}
              {isEditMode && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "0.75rem",
                      bgcolor: isDarkMode
                        ? alpha(color.gray700, 0.7)
                        : alpha(color.gray100, 0.7),
                      border: `1px solid ${
                        isDarkMode ? color.gray600 : color.gray300
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: isDarkMode ? color.gray200 : color.gray700,
                        }}
                      >
                        Password Management
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray500,
                        }}
                      >
                        Click the button to reset password to default
                      </Typography>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                      {resetPasswordSuccess && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: -40,
                            right: 0,
                            py: 1,
                            px: 2,
                            borderRadius: "0.5rem",
                            bgcolor: isDarkMode ? color.teal900 : color.teal50,
                            border: `1px solid ${
                              isDarkMode ? color.teal700 : color.teal200
                            }`,
                            zIndex: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDarkMode ? color.teal300 : color.teal700,
                            }}
                          >
                            Password reset successfully!
                          </Typography>
                        </Box>
                      )}
                      <Button
                        variant="outlined"
                        color="warning"
                        startIcon={
                          resetPasswordLoading ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            <LockResetOutlined />
                          )
                        }
                        onClick={handleResetPassword}
                        disabled={resetPasswordLoading || loading}
                        sx={{
                          color: isDarkMode ? color.edit : color.edit,
                          borderColor: isDarkMode
                            ? alpha(color.edit, 0.6)
                            : alpha(color.edit, 0.6),
                          "&:hover": {
                            borderColor: color.edit,
                            bgcolor: isDarkMode
                              ? alpha(color.edit, 0.1)
                              : alpha(color.edit, 0.1),
                          },
                          textTransform: "none",
                        }}
                      >
                        {resetPasswordLoading
                          ? "Resetting..."
                          : "Reset Password"}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal500 : color.teal600,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiSelect-select": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                >
                  <InputLabel id="level-label">Education Level</InputLabel>
                  <Select
                    labelId="level-label"
                    id="level"
                    name="level"
                    value={user.level || ""}
                    label="Education Level"
                    onChange={handleSelectChange as any}
                    disabled={loading}
                  >
                    {Object.values(LevelsEnum).map((level) => (
                      <MenuItem key={level} value={level}>
                        {level.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber || ""}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal500 : color.teal600,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <WEDateField
                  label="Date of Birth"
                  value={new Date(user.dateOfBirth || "")}
                  onChange={handleDateChange}
                  name="dateOfBirth"
                  required={false}
                  disabled={loading}
                  placeholder="Select birth date"
                  sx={{
                    width: "100%",
                  }}
                />
                {errors.dateOfBirth && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.5 }}
                  >
                    {errors.dateOfBirth}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal500 : color.teal600,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiSelect-select": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                >
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={user.status ? "active" : "inactive"}
                    label="Status"
                    onChange={(e) => {
                      const newStatus = e.target.value === "active";
                      setUser((prev) => ({ ...prev, status: newStatus }));
                      if (errors["status"]) {
                        setErrors((prev) => ({ ...prev, status: "" }));
                      }
                    }}
                    disabled={loading}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  disabled // Role is fixed to TEACHER_ADVANCE
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray500,
                    },
                    "& .MuiSelect-select": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                  }}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={RolesEnum.TEACHER_ADVANCE}
                    label="Role"
                  >
                    <MenuItem value={RolesEnum.TEACHER_ADVANCE}>
                      Teacher Advance
                    </MenuItem>
                  </Select>
                  <FormHelperText
                    sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
                  >
                    Fixed role for this form
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Warning Section */}
        {Object.keys(errors).length > 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: "0.75rem",
              bgcolor: isDarkMode
                ? alpha(color.red900, 0.3)
                : alpha(color.red100, 0.8),
              border: `1px solid ${isDarkMode ? color.red700 : color.red300}`,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ReportProblemOutlined
              sx={{ color: isDarkMode ? color.red400 : color.red600 }}
            />
            <Typography
              variant="caption"
              sx={{ color: isDarkMode ? color.red300 : color.red700 }}
            >
              Please fix the errors above before submitting
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Divider
        sx={{ borderColor: isDarkMode ? color.gray700 : color.gray200 }}
      />

      <DialogActions
        sx={{
          p: 2,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray600,
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            "&:hover": {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              bgcolor: isDarkMode
                ? alpha(color.gray700, 0.6)
                : alpha(color.gray200, 0.6),
            },
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          startIcon={
            loading ? <CircularProgress size={20} /> : <SaveOutlined />
          }
          sx={{
            bgcolor: isDarkMode ? color.teal700 : color.teal500,
            color: color.white,
            "&:hover": {
              bgcolor: isDarkMode ? color.teal600 : color.teal600,
            },
            "&.Mui-disabled": {
              bgcolor: isDarkMode
                ? alpha(color.teal900, 0.6)
                : alpha(color.teal200, 0.9),
              color: isDarkMode ? color.gray400 : color.gray500,
            },
            px: 3,
            textTransform: "none",
          }}
        >
          {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
