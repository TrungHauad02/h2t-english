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
  IconButton,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionTest, Toeic, AIResponse } from "interfaces";
import { format } from 'date-fns';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface RecentManagementActivitiesProps {
  competitions: CompetitionTest[];
  toeicTests: Toeic[];
  aiResponses: AIResponse[];
  isLoading: boolean;
  onNavigate?: (path: string) => void;
  onAIResponseView?: (response: AIResponse) => void;
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
      id={`management-tabpanel-${index}`}
      aria-labelledby={`management-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function RecentManagementActivities({ 
  competitions, 
  toeicTests, 
  aiResponses, 
  isLoading,
  onNavigate,
  onAIResponseView
}: RecentManagementActivitiesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM dd, HH:mm');
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderLoadingList = () => (
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

  const renderEmptyState = (message: string) => (
    <Box
      sx={{
        py: 6,
        textAlign: 'center',
        color: isDarkMode ? color.gray500 : color.gray400,
      }}
    >
      <Typography variant="body2">{message}</Typography>
    </Box>
  );

  const renderCompetitionsList = () => {
    if (isLoading) return renderLoadingList();
    if (competitions.length === 0) return renderEmptyState("No competitions found");

    return (
      <List sx={{ py: 0, overflow: 'auto', pt: 1 }}>
        {competitions.map((competition) => (
          <Box key={competition.id}>
            <ListItem 
              sx={{ 
                py: 2, 
                px: 2,
                borderRadius: '0.75rem',
                mb: 1.5,
                mx: 5,
                width: "auto",
                backgroundColor: isDarkMode ? color.gray500 : color.gray50,
                cursor: 'pointer',
                border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
                boxShadow: isDarkMode 
                  ? `0 2px 8px rgba(0, 0, 0, 0.1)` 
                  : `0 2px 8px rgba(0, 0, 0, 0.05)`,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? `${color.teal900}40` 
                    : `${color.teal50}80`,
                  transform: 'translateY(-4px)',
                  boxShadow: isDarkMode 
                    ? `0 12px 32px rgba(20, 184, 166, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15)` 
                    : `0 12px 32px rgba(20, 184, 166, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)`,
                  border: `1px solid ${isDarkMode ? color.teal500 : color.teal300}`,
                  '& .competition-title': {
                    color: isDarkMode ? color.teal300 : color.teal700,
                  },
                  '& .item-view-button': {
                    color: isDarkMode ? color.teal300 : color.teal700,
                    backgroundColor: isDarkMode ? `${color.teal800}30` : `${color.teal100}80`,
                    transform: 'scale(1.1)',
                  }
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    className="competition-title"
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray800,
                      fontWeight: 500,
                      mb: 0.5,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {truncateText(competition.title)}
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
                      {competition.duration} min • {competition.totalQuestions || 0} questions
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant="caption"
                        sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
                      >
                        {formatDate(competition.createdAt)}
                      </Typography>
                      <Chip
                        label={competition.status ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          backgroundColor: competition.status 
                            ? (isDarkMode ? color.green800 : color.green100)
                            : (isDarkMode ? color.gray700 : color.gray200),
                          color: competition.status
                            ? (isDarkMode ? color.green300 : color.green800)
                            : (isDarkMode ? color.gray300 : color.gray700),
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          height: 20,
                          transition: 'all 0.25s ease',
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
              <Box sx={{ ml: 2, pl: 1 }}>
                <Tooltip title="View Competition Details">
                  <IconButton
                    className="item-view-button"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate && onNavigate(`/teacher-advance/competitions/${competition.id}`);
                    }}
                    sx={{
                      opacity: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isDarkMode ? color.teal400 : color.teal600,
                      '&:hover': {
                        color: isDarkMode ? color.teal300 : color.teal700,
                        backgroundColor: isDarkMode ? `${color.teal800}30` : `${color.teal100}80`,
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    );
  };

  const renderToeicTestsList = () => {
    if (isLoading) return renderLoadingList();
    if (toeicTests.length === 0) return renderEmptyState("No TOEIC tests found");

    return (
      <List sx={{ py: 0, overflow: 'auto', pt: 1 }}>
        {toeicTests.map((test) => (
          <Box key={test.id}>
            <ListItem 
              sx={{ 
                py: 2, 
                px: 2,
                borderRadius: '0.75rem',
                mb: 1.5,
                mx: 5,
                width: "auto",
                backgroundColor: isDarkMode ? color.gray500 : color.gray50,
                cursor: 'pointer',
                border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
                boxShadow: isDarkMode 
                  ? `0 2px 8px rgba(0, 0, 0, 0.1)` 
                  : `0 2px 8px rgba(0, 0, 0, 0.05)`,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? `${color.emerald900}40`
                    : `${color.emerald50}80`,
                  transform: 'translateY(-4px)',
                  boxShadow: isDarkMode 
                    ? `0 12px 32px rgba(16, 185, 129, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15)` 
                    : `0 12px 32px rgba(16, 185, 129, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)`,
                  border: `1px solid ${isDarkMode ? color.emerald500 : color.emerald300}`,
                  '& .toeic-title': {
                    color: isDarkMode ? color.emerald300 : color.emerald700,
                  },
                  '& .item-view-button': {
                    color: isDarkMode ? color.emerald300 : color.emerald700,
                    backgroundColor: isDarkMode ? `${color.emerald800}30` : `${color.emerald100}80`,
                    transform: 'scale(1.1)',
                  }
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    className="toeic-title"
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray800,
                      fontWeight: 500,
                      mb: 0.5,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {truncateText(test.title)}
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
                      {test.duration} min • {test.totalQuestions} questions
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant="caption"
                        sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
                      >
                        {formatDate(test.createdAt)}
                      </Typography>
                      <Chip
                        label={test.status ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          backgroundColor: test.status 
                            ? (isDarkMode ? color.emerald800 : color.emerald100)
                            : (isDarkMode ? color.gray700 : color.gray200),
                          color: test.status
                            ? (isDarkMode ? color.emerald300 : color.emerald800)
                            : (isDarkMode ? color.gray300 : color.gray700),
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          height: 20,
                          transition: 'all 0.25s ease',
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
              <Box sx={{ ml: 2, pl: 1 }}>
                <Tooltip title="View TOEIC Test Details">
                  <IconButton
                    className="item-view-button"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate && onNavigate(`/teacher-advance/toeics/${test.id}`);
                    }}
                    sx={{
                      opacity: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isDarkMode ? color.emerald400 : color.emerald600,
                      '&:hover': {
                        color: isDarkMode ? color.emerald300 : color.emerald700,
                        backgroundColor: isDarkMode ? `${color.emerald800}30` : `${color.emerald100}80`,
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    );
  };

  const renderAIResponsesList = () => {
    if (isLoading) return renderLoadingList();
    if (aiResponses.length === 0) return renderEmptyState("No AI responses found");

    return (
      <List sx={{ py: 0, overflow: 'auto', pt: 1 }}>
        {aiResponses.map((response) => (
          <Box key={response.id}>
            <ListItem 
              sx={{ 
                py: 2, 
                px: 2,
                borderRadius: '0.75rem',
                mb: 1.5,
                mx: 5,
                width: "auto",
                backgroundColor: isDarkMode ? color.gray500 : color.gray50,
                cursor: 'pointer',
                border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
                boxShadow: isDarkMode 
                  ? `0 2px 8px rgba(0, 0, 0, 0.1)` 
                  : `0 2px 8px rgba(0, 0, 0, 0.05)`,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? `${color.teal900}40`
                    : `${color.teal50}80`,
                  transform: 'translateY(-4px)',
                  boxShadow: isDarkMode 
                    ? `0 12px 32px rgba(20, 184, 166, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15)` 
                    : `0 12px 32px rgba(20, 184, 166, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)`,
                  border: `1px solid ${isDarkMode ? color.teal500 : color.teal300}`,
                  '& .ai-request': {
                    color: isDarkMode ? color.teal300 : color.teal700,
                  },
                  '& .item-view-button': {
                    color: isDarkMode ? color.teal300 : color.teal700,
                    backgroundColor: isDarkMode ? `${color.teal800}30` : `${color.teal100}80`,
                    transform: 'scale(1.1)',
                  }
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    className="ai-request"
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray800,
                      fontWeight: 500,
                      mb: 0.5,
                      transition: 'color 0.25s ease',
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
                      Response: {truncateText(response.response, 60)}
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
                            ? (isDarkMode ? color.teal800 : color.teal100)
                            : (isDarkMode ? `${color.warning}20` : `${color.warning}20`),
                          color: response.status
                            ? (isDarkMode ? color.teal300 : color.teal800)
                            : (isDarkMode ? color.yellow : color.warning),
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          height: 20,
                          transition: 'all 0.25s ease',
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
              <Box sx={{ ml: 2, pl: 1 }}>
                <Tooltip title="View AI Response Details">
                  <IconButton
                    className="item-view-button"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to main page first, then show dialog
                      onNavigate && onNavigate("/teacher-advance/ai-response");
                      // Small delay to ensure navigation completes, then show dialog
                      setTimeout(() => {
                        onAIResponseView && onAIResponseView(response);
                      }, 100);
                    }}
                    sx={{
                      opacity: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isDarkMode ? color.teal400 : color.teal600,
                      '&:hover': {
                        color: isDarkMode ? color.teal300 : color.teal700,
                        backgroundColor: isDarkMode ? `${color.teal800}30` : `${color.teal100}80`,
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    );
  };

  const getNavigationPath = (tabIndex: number) => {
    switch(tabIndex) {
      case 0: return "/teacher-advance/competitions";
      case 1: return "/teacher-advance/toeics";
      case 2: return "/teacher-advance/ai-response";
      default: return "/teacher-advance/dashboard";
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: isDarkMode 
            ? `0 8px 32px rgba(20, 184, 166, 0.12)` 
            : `0 8px 32px rgba(20, 184, 166, 0.08)`,
          border: `1px solid ${isDarkMode ? color.teal600 : color.teal200}`,
        }
      }}
    >
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          mb: 2,
          pb: 2,
          borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ManageAccountsIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
            >
              Recent Management Activities
            </Typography>
          </Box>
          {onNavigate && ( 
            <Tooltip title={`View All ${['Competitions', 'TOEIC Tests', 'AI Responses'][tabValue]}`}>
              <IconButton
                size="small"
                onClick={() => onNavigate(getNavigationPath(tabValue))}
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray600,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    color: isDarkMode ? color.teal400 : color.teal600,
                    backgroundColor: isDarkMode ? `${color.teal800}20` : `${color.teal100}60`,
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            minHeight: 'auto',
            '& .MuiTab-root': {
              minHeight: 'auto',
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
            icon={<EmojiEventsIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={`Competitions (${competitions.length})`}
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<QuizIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={`TOEIC Tests (${toeicTests.length})`}
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<SmartToyIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={`AI Responses (${aiResponses.length})`}
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderCompetitionsList()}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderToeicTestsList()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderAIResponsesList()}
      </TabPanel>
    </Paper>
  );
}