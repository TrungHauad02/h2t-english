import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Skeleton,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { SubmitCompetition, User, CompetitionTest } from 'interfaces';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarsIcon from '@mui/icons-material/Stars';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InsightsIcon from '@mui/icons-material/Insights';
import { useNavigate } from 'react-router-dom';
import { userService, submitCompetitionService } from 'services';
import CompetitionStatistics from './CompetitionStatistics';

interface CompetitionResult extends SubmitCompetition {
  user?: User;
  rank?: number;
}

interface CompetitionResultsProps {
  competition: CompetitionTest;
  currentUserId?: number;
  submitCompetitionId: number;
}

export default function CompetitionResults({
  competition,
  currentUserId,
  submitCompetitionId
}: CompetitionResultsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [results, setResults] = useState<CompetitionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const submissionsRes = await submitCompetitionService.findByTestIdAndStatus(competition.id, true);
        const submissions = submissionsRes.data || [];
      
        
        const completedSubmissions = submissions.filter((s: SubmitCompetition) => s.status && s.score !== null);
        
        const userIds = [...new Set(completedSubmissions.map((s: SubmitCompetition) => s.user_id))] as number[];
        const usersRes = await userService.findByIdsAndStatus(userIds, true);
        const users = usersRes.data || [];
        
        const userMap = users.reduce((map: Record<number, User>, user: User) => {
          map[user.id] = user;
          return map;
        }, {} as Record<number, User>);
        
        const resultsWithUsers = completedSubmissions
          .map((submission: SubmitCompetition) => ({
            ...submission,
            user: userMap[submission.user_id],
          }))
          .sort((a: CompetitionResult, b: CompetitionResult) => (b.score || 0) - (a.score || 0))
          .map((result: CompetitionResult, index: number) => ({
            ...result,
            rank: index + 1
          }));
        
        setResults(resultsWithUsers);
      } catch (error) {
        console.error('Error fetching competition results:', error);
      } finally {
        setLoading(false);
      }
    };

    const now = new Date();
    const competitionEnd = new Date(competition.endTime);
    
    if (now > competitionEnd) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [competition, submitCompetitionService, userService]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return color.green;
    if (score >= 80) return color.emerald500;
    if (score >= 70) return color.teal500;
    if (score >= 60) return color.teal600;
    if (score >= 50) return color.teal700;
    return color.error;
  };

  const getGradientByRank = (rank: number) => {
    if (rank === 1) return `linear-gradient(135deg, ${color.yellow} 0%, ${color.warning} 100%)`;
    if (rank === 2) return `linear-gradient(135deg, ${color.gray400} 0%, ${color.gray600} 100%)`;
    if (rank === 3) return `linear-gradient(135deg, ${color.save} 0%, ${color.teal300} 100%)`;
    return isDarkMode ? color.gray800 : color.white;
  };

  const getIconByRank = (rank: number) => {
    if (rank === 1) return <WorkspacePremiumIcon sx={{ fontSize: 40, color: color.yellow }} />;
    if (rank === 2) return <MilitaryTechIcon sx={{ fontSize: 36, color: color.gray300 }} />;
    if (rank === 3) return <StarsIcon sx={{ fontSize: 32, color: color.save }} />;
    return null;
  };

  const now = new Date();
  const competitionEnd = new Date(competition.endTime);
  const hasEnded = now > competitionEnd;

  if (!hasEnded) {
    return (
      <Box 
        sx={{ 
          p: 6,
          textAlign: 'center',
          bgcolor: isDarkMode ? color.gray800 : color.white,
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <AccessTimeIcon 
          sx={{ 
            fontSize: 80, 
            color: isDarkMode ? color.teal400 : color.teal600,
            mb: 3
          }} 
        />
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: isDarkMode ? color.gray100 : color.gray900,
            mb: 2
          }}
        >
          Competition In Progress
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700,
            mb: 4
          }}
        >
          Results will be available after
        </Typography>
        <Chip 
          label={new Date(competition.endTime).toLocaleString()}
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            py: 2,
            px: 3,
            bgcolor: isDarkMode ? color.teal900 : color.teal100,
            color: isDarkMode ? color.teal200 : color.teal800,
          }}
        />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box>
        <Skeleton 
          variant="text" 
          sx={{ fontSize: '2rem', mb: 2 }}
        />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton 
                variant="rectangular" 
                height={300} 
                sx={{ borderRadius: '16px' }}
              />
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ mt: 4 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton 
              key={i} 
              variant="rectangular" 
              height={100} 
              sx={{ borderRadius: '12px' }}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box 
        sx={{ 
          p: 6,
          textAlign: 'center',
          bgcolor: isDarkMode ? color.gray800 : color.white,
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <PersonIcon 
          sx={{ 
            fontSize: 80, 
            color: isDarkMode ? color.gray600 : color.gray400,
            mb: 3
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: isDarkMode ? color.gray300 : color.gray700 
          }}
        >
          No results available yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800,
            color: isDarkMode ? color.gray100 : color.gray900,
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Competition Leaderboard
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700,
            mb: 2 
          }}
        >
          {competition.title}
        </Typography>
      </Box>

      {results.length === 0 && (
  <Typography variant="h6" textAlign="center" sx={{ mb: 4, mt: 6, color: color.gray500 }}>
    Chưa có ai tham gia cuộc thi này.
  </Typography>
)}

{results.length > 0 && (
  <Grid
    container
    spacing={4}
    sx={{ mb: 6, justifyContent: results.length === 1 ? 'center' : 'flex-start' }}
  >
    {results.slice(0, 3).map((result, index) => (
      <Grid
        key={result.id}
        item
        xs={12}
        md={results.length === 1 ? 6 : results.length === 2 ? 6 : 4}
        sx={{
          order: results.length === 3
            ? index === 0
              ? { xs: 1, md: 2 }
              : index === 1
              ? { xs: 2, md: 1 }
              : 3
            : index + 1,
        }}
      >
        <Card
          sx={{
            borderRadius: '24px',
            background: getGradientByRank(index + 1),
            boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'visible',
            mt: { xs: 0, md: index === 0 && results.length === 3 ? 0 : 6 },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -25,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 70,
              height: 70,
              borderRadius: '50%',
              bgcolor: color.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            }}
          >
            {getIconByRank(index + 1)}
          </Box>
          <CardContent sx={{ p: 4, pt: 7 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: color.white,
                  color: color.gray800,
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {result.user?.name?.[0] || '?'}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: color.white, mb: 1 }}>
                {result.user?.name || 'Unknown User'}
              </Typography>
              <Chip
                label={`${Math.round(result.score || 0)} points`}
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 0.3,
                  px: 1.5,
                  mb: 2.5,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: color.gray800,
                }}
              />
              {currentUserId === result.user_id && (
                <Button
                  variant="contained"
                  startIcon={<RemoveRedEyeIcon />}
                  fullWidth
                  onClick={() => navigate(`/history-test/competition/${result.id}`)}
                  sx={{
                    bgcolor: color.white,
                    color: color.gray800,
                    fontWeight: 600,
                    py: 1.2,
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: color.gray100,
                    },
                  }}
                >
                  View My Test
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}



        <Box sx={{ mb: 6 }}>
          <CompetitionStatistics competitionId={competition.id} />
        </Box>


      {/* Rest of participants */}
      {results.length > 3 && (
        <>
          <Box sx={{ mb: 4 }}>
            <Divider sx={{ mb: 4 }}>
              <Chip 
                label="Other Participants" 
                sx={{ 
                  fontWeight: 600,
                  px: 2,
                  py: 3,
                  fontSize: '1rem',
                  bgcolor: isDarkMode ? color.gray700 : color.gray200,
                  color: isDarkMode ? color.gray100 : color.gray900
                }} 
              />
            </Divider>
            <Stack spacing={2}>
              {results.slice(3).map((result) => (
                <Paper
                  key={result.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 3,
                    bgcolor: isDarkMode ? color.gray800 : color.white,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box 
                      sx={{ 
                        width: 56, 
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: isDarkMode ? color.gray700 : color.gray100,
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: isDarkMode ? color.gray300 : color.gray700,
                      }}
                    >
                      {result.rank}
                    </Box>
                    
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: isDarkMode ? color.teal800 : color.teal100,
                        color: isDarkMode ? color.teal200 : color.teal800,
                        fontWeight: 600,
                      }}
                    >
                      {result.user?.name?.[0] || '?'}
                    </Avatar>
                    
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: isDarkMode ? color.gray100 : color.gray900,
                        }}
                      >
                        {result.user?.name || 'Unknown User'}
                      </Typography>
                      {result.user?.email && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: isDarkMode ? color.gray400 : color.gray600,
                          }}
                        >
                          {result.user.email}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: getScoreColor(result.score || 0),
                        }}
                      >
                        {Math.round(result.score || 0)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray600,
                        }}
                      >
                        points
                      </Typography>
                    </Box>
                    
                    {currentUserId === result.user_id && (
                      <IconButton
                        onClick={() => navigate(`/history-test/competition/${result.id}`)}
                        sx={{
                          ml: 1,
                          color: isDarkMode ? color.teal300 : color.teal600,
                          bgcolor: isDarkMode ? color.teal900 : color.teal50,
                          '&:hover': {
                            bgcolor: isDarkMode ? color.teal800 : color.teal100,
                          },
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    )}
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}