import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
    Skeleton,
    Tabs,
    Tab,
    Divider,
    IconButton,
    Tooltip
} from "@mui/material";
import { useState } from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { AIResponse } from "interfaces";
import { format } from 'date-fns';
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useNavigate } from "react-router-dom";

interface RecentAIResponsesProps {
    evaluatedResponses: AIResponse[];
    notEvaluatedResponses: AIResponse[];
    isLoading: boolean;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`ai-response-tabpanel-${index}`}
            aria-labelledby={`ai-response-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function RecentAIResponses({
    evaluatedResponses,
    notEvaluatedResponses,
    isLoading
}: RecentAIResponsesProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return format(new Date(date), 'MMM dd, HH:mm');
    };

    const truncateText = (text: string, maxLength: number = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const renderResponsesList = (responses: AIResponse[], isEmpty: boolean, emptyMessage: string) => {
        if (isLoading) {
            return (
                <List sx={{ py: 0 }}>
                    {[...Array(3)].map((_, index) => (
                        <ListItem key={index} sx={{ py: 1.5 }}>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton variant="text" width="80%" height={20} />
                                <Skeleton variant="text" width="60%" height={16} sx={{ mt: 0.5 }} />
                                <Skeleton variant="text" width="40%" height={14} sx={{ mt: 0.5 }} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            );
        }

        if (isEmpty) {
            return (
                <Box
                    sx={{
                        py: 6,
                        textAlign: 'center',
                        color: isDarkMode ? color.gray500 : color.gray400,
                    }}
                >
                    <Typography variant="body2">{emptyMessage}</Typography>
                </Box>
            );
        }

        return (
            <List sx={{ py: 0, maxHeight: 400, overflow: 'auto' }}>
                {responses.map((response, index) => (
                    <Box key={response.id}>
                        <ListItem sx={{ py: 1.5, px: 3 }}>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: isDarkMode ? color.gray200 : color.gray800,
                                            fontWeight: 500,
                                            mb: 0.5,
                                        }}
                                    >
                                        {truncateText(response.request)}
                                    </Typography>
                                }
                                secondary={
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: isDarkMode ? color.gray400 : color.gray600,
                                                display: 'block',
                                                mb: 0.5,
                                            }}
                                        >
                                            Response: {truncateText(response.response, 80)}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
                                            >
                                                {formatDate(response.createdAt)}
                                            </Typography>
                                            <Chip
                                                label={response.status ? "Evaluated" : "Not Evaluated"}
                                                size="small"
                                                sx={{
                                                    backgroundColor: response.status
                                                        ? (isDarkMode ? color.emerald800 : color.emerald100)
                                                        : (isDarkMode ? color.red600 : color.red100),
                                                    color: response.status
                                                        ? (isDarkMode ? color.emerald300 : color.emerald800)
                                                        : (isDarkMode ? color.red200 : color.red800),
                                                    fontWeight: 500,
                                                    fontSize: '0.7rem',
                                                    height: 20,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                        {index < responses.length - 1 && (
                            <Divider sx={{ backgroundColor: isDarkMode ? color.gray700 : color.gray200 }} />
                        )}
                    </Box>
                ))}
            </List>
        );
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: "1rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ p: 3, pb: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SmartToyIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
                        >
                            Recent AI Responses
                        </Typography>
                    </Box>
                    <Tooltip title="View All AI Responses">
                        <IconButton
                            size="small"
                            onClick={() => navigate("/admin/ai-response")}
                            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{
                    mb: 2,
                    backgroundColor: isDarkMode ? color.gray700 : color.gray200
                }} />

                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        minHeight: 'auto',
                        '& .MuiTab-root': {
                            minHeight: 'auto',
                            py: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: isDarkMode ? color.gray400 : color.gray600,
                            '&.Mui-selected': {
                                color: isDarkMode ? color.teal400 : color.teal600,
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                    }}
                >
                    <Tab
                        icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                        iconPosition="start"
                        label={`Evaluated (${evaluatedResponses.length})`}
                        sx={{ textTransform: 'none' }}
                    />
                    <Tab
                        icon={<PendingIcon sx={{ fontSize: 16 }} />}
                        iconPosition="start"
                        label={`Not Evaluated (${notEvaluatedResponses.length})`}
                        sx={{ textTransform: 'none' }}
                    />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                {renderResponsesList(
                    evaluatedResponses,
                    evaluatedResponses.length === 0,
                    "No evaluated responses found"
                )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                {renderResponsesList(
                    notEvaluatedResponses,
                    notEvaluatedResponses.length === 0,
                    "No not evaluated responses found"
                )}
            </TabPanel>
        </Paper>
    );
}