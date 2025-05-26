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
  onNavigate 
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
      <List sx={{ py: 0, maxHeight: 400, overflow: 'auto', px: 5 }}>
        {competitions.map((competition, index) => (
          <Box key={competition.id}>
            <ListItem sx={{ py: 1.5, px: 0 }}>
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
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < competitions.length - 1 && (
              <Divider sx={{ backgroundColor: isDarkMode ? color.gray700 : color.gray200 }} />
            )}
          </Box>
        ))}
      </List>
    );
  };

  const renderToeicTestsList = () => {
    if (isLoading) return renderLoadingList();
    if (toeicTests.length === 0) return renderEmptyState("No TOEIC tests found");

    return (
      <List sx={{ py: 0, maxHeight: 400, overflow: 'auto', px: 5 }}>
        {toeicTests.map((test, index) => (
          <Box key={test.id}>
            <ListItem sx={{ py: 1.5, px: 0 }}>
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
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < toeicTests.length - 1 && (
              <Divider sx={{ backgroundColor: isDarkMode ? color.gray700 : color.gray200 }} />
            )}
          </Box>
        ))}
      </List>
    );
  };

  const renderAIResponsesList = () => {
    if (isLoading) return renderLoadingList();
    if (aiResponses.length === 0) return renderEmptyState("No AI responses found");

    return (
      <List sx={{ py: 0, maxHeight: 400, overflow: 'auto', px: 5 }}>
        {aiResponses.map((response, index) => (
          <Box key={response.id}>
            <ListItem sx={{ py: 1.5, px: 0 }}>
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
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < aiResponses.length - 1 && (
              <Divider sx={{ backgroundColor: isDarkMode ? color.gray700 : color.gray200 }} />
            )}
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
                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
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