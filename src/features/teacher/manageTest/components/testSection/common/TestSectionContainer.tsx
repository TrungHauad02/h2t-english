import React, { ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Stack,
  Button,
  Tooltip,
  Fade,
  useMediaQuery,
  Theme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import EmptySection from './EmptySection';

interface TabItem {
  id: number;
  label: string;
}

interface TestSectionContainerProps {
  id: string;
  title: string;
  icon: ReactNode;
  tabs?: TabItem[];
  selectedTabId?: number;
  onTabChange?: (tabId: number) => void;
  children?: ReactNode;
  emptyState?: {
    icon: ReactNode;
    title: string;
    description: string;
  };
  isEmpty?: boolean;
  isEditMode?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function TestSectionContainer({
  id,
  title,
  icon,
  tabs = [],
  selectedTabId,
  onTabChange,
  children,
  emptyState,
  isEmpty = false,
  isEditMode = false,
  onAdd,
  onEdit,
  onDelete,
  onSave,
  onCancel
}: TestSectionContainerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // Dynamic styling based on theme
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const bgColor = isDarkMode ? color.gray900 : color.white;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const secondaryColor = isDarkMode ? color.gray800 : color.teal50;
  const cardShadow = isDarkMode 
    ? '0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.2)' 
    : '0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.03)';

  const selectedTabIndex = tabs.findIndex(tab => tab.id === selectedTabId);

  return (
    <Box id={id} sx={{ mb: 4 }}>
      <Card 
        elevation={0}
        sx={{
          backgroundColor: bgColor,
          borderRadius: '1.25rem',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: `1px solid ${borderColor}`,
          boxShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: cardShadow,
            transform: 'translateY(-3px)',
          },
          position: 'relative',
        }}
      >
        {/* Accent border at the top */}
        <Box 
          sx={{ 
            height: '4px', 
            width: '100%', 
            background: `linear-gradient(90deg, ${isDarkMode ? color.teal400 : color.teal400} 0%, ${isDarkMode ? color.emerald400 : color.emerald400} 100%)`,
          }} 
        />
        
        <CardContent sx={{ p: 0 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center', 
              justifyContent: 'space-between',
              p: 3,
              backgroundColor: secondaryColor,
              borderBottom: `1px solid ${borderColor}`,
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                color: accentColor, 
                mr: 1.5,
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.5rem',
                background: isDarkMode ? `${color.teal900}80` : `${color.teal100}80`,
                p: 1,
                borderRadius: '12px',
              }}>
                {icon}
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: accentColor,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: '40%',
                    height: '2px',
                    backgroundColor: accentColor,
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {title}
              </Typography>
            </Box>

            <Fade in={true}>
              <Stack 
                direction={isMobile ? "column" : "row"} 
                spacing={1.5}
                width={isMobile ? '100%' : 'auto'}
              >
                {/* Hiển thị các nút Save/Cancel khi trong chế độ Edit */}
                {isEditMode ? (
                  <>
                    {onSave && (
                      <Tooltip title={`Save changes`} placement="top">
                        <Button
                          startIcon={<SaveIcon />}
                          onClick={onSave}
                          variant="contained"
                          size="small"
                          fullWidth={isMobile}
                          sx={{
                            backgroundColor: isDarkMode ? color.teal700 : color.teal600,
                            color: color.white,
                            '&:hover': {
                              backgroundColor: isDarkMode ? color.teal600 : color.teal500,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3)',
                            },
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                          }}
                        >
                          Save
                        </Button>
                      </Tooltip>
                    )}
                    
                    {onCancel && (
                      <Tooltip title={`Cancel editing`} placement="top">
                        <Button
                          startIcon={<CancelIcon />}
                          onClick={onCancel}
                          variant="outlined"
                          size="small"
                          fullWidth={isMobile}
                          sx={{
                            borderColor: isDarkMode ? color.gray400 : color.gray600,
                            color: isDarkMode ? color.gray400 : color.gray600,
                            '&:hover': {
                              backgroundColor: isDarkMode ? `${color.gray900}33` : color.gray50,
                              borderColor: isDarkMode ? color.gray300 : color.gray500,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(107, 114, 128, 0.2)',
                            },
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                          }}
                        >
                          Cancel
                        </Button>
                      </Tooltip>
                    )}
                  </>
                ) : (
                  /* Hiển thị các nút Add/Edit/Delete khi không trong chế độ Edit */
                  <>
                    {onAdd && (
                      <Tooltip title={`Add ${title}`} placement="top">
                        <Button
                          startIcon={<AddIcon />}
                          onClick={onAdd}
                          variant="contained"
                          size="small"
                          fullWidth={isMobile}
                          sx={{
                            backgroundColor: isDarkMode ? color.emerald700 : color.emerald600,
                            color: color.white,
                            '&:hover': {
                              backgroundColor: isDarkMode ? color.emerald600 : color.emerald500,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3)',
                            },
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                          }}
                        >
                          Add
                        </Button>
                      </Tooltip>
                    )}
                    
                    {onEdit && (
                      <Tooltip title={`Edit ${title}`} placement="top">
                        <Button
                          startIcon={<EditIcon />}
                          onClick={onEdit}
                          variant="outlined"
                          size="small"
                          fullWidth={isMobile}
                          sx={{
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                            color: isDarkMode ? color.teal400 : color.teal600,
                            '&:hover': {
                              backgroundColor: isDarkMode ? `${color.teal900}33` : color.teal50,
                              borderColor: isDarkMode ? color.teal300 : color.teal500,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(20, 184, 166, 0.2)',
                            },
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                          }}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                    )}
                    
                    {onDelete && (
                      <Tooltip title={`Delete ${title}`} placement="top">
                        <Button
                          startIcon={<DeleteIcon />}
                          onClick={onDelete}
                          variant="outlined"
                          size="small"
                          fullWidth={isMobile}
                          sx={{
                            borderColor: isDarkMode ? color.red400 : color.red600,
                            color: isDarkMode ? color.red400 : color.red600,
                            '&:hover': {
                              backgroundColor: isDarkMode ? `${color.red900}33` : color.red50,
                              borderColor: isDarkMode ? color.red300 : color.red500,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(220, 38, 38, 0.2)',
                            },
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            textTransform: 'none',
                          }}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    )}
                  </>
                )}
              </Stack>
            </Fade>
          </Box>

          {tabs.length > 1 && (
            <Box 
              sx={{ 
                backgroundColor: secondaryColor,
                borderBottom: `1px solid ${borderColor}`,
                overflowX: 'auto',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: '24px',
                  background: `linear-gradient(90deg, ${isDarkMode ? 'rgba(31, 41, 55, 0)' : 'rgba(240, 253, 250, 0)'} 0%, ${isDarkMode ? color.gray800 : color.teal50} 100%)`,
                  pointerEvents: 'none',
                  zIndex: 1,
                  display: isMobile ? 'block' : 'none',
                }
              }}
            >
              <Tabs
                value={selectedTabIndex >= 0 ? selectedTabIndex : 0}
                onChange={(event, newValue) => {
                  if (onTabChange && tabs[newValue]) {
                    onTabChange(tabs[newValue].id);
                  }
                }}
                aria-label={`${title.toLowerCase()} tabs`}
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: accentColor,
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                  },
                  '& .MuiTab-root': {
                    color: isDarkMode ? color.gray300 : color.gray600,
                    '&.Mui-selected': {
                      color: accentColor,
                      fontWeight: 'bold'
                    },
                    py: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: isDarkMode ? color.gray100 : color.gray800,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    }
                  },
                }}
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={tab.id}
                    label={tab.label}
                    id={`${id}-tab-${index}`}
                    aria-controls={`${id}-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Box sx={{ p: 3 }}>
            {isEmpty && emptyState ? (
              <EmptySection 
                icon={emptyState.icon}
                title={emptyState.title}
                description={emptyState.description}
                action={onAdd && !isEditMode ? {
                  label: `Add ${title}`,
                  onClick: onAdd
                } : undefined}
              />
            ) : (
              children
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}