import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { deepOrange, grey, yellow } from "@mui/material/colors";

const winners = [
  {
    name: "Alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    score: 98,
    breakdown: {
      vocabulary: 18,
      grammar: 17,
      reading: 16,
      listening: 15,
      speaking: 16,
      writing: 16,
    },
  },
  {
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    score: 92,
    breakdown: {
      vocabulary: 16,
      grammar: 16,
      reading: 15,
      listening: 14,
      speaking: 15,
      writing: 16,
    },
  },
  {
    name: "Charlie",
    avatar: "https://i.pravatar.cc/150?img=3",
    score: 88,
    breakdown: {
      vocabulary: 15,
      grammar: 15,
      reading: 14,
      listening: 14,
      speaking: 15,
      writing: 15,
    },
  },
  {
    name: "David",
    avatar: "https://i.pravatar.cc/150?img=4",
    score: 85,
    breakdown: {
      vocabulary: 14,
      grammar: 14,
      reading: 14,
      listening: 14,
      speaking: 14,
      writing: 15,
    },
  },
];

const trophyColors = [yellow[700], grey[400], deepOrange[300]];

export default function ReviewHistoryCompetition() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        🏆 Top Winners
      </Typography>

      {/* Top 3 podium layout */}
      <Grid container justifyContent="center" alignItems="flex-end" spacing={2} mb={6}>
        {/* Second place - left */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: trophyColors[1],
              color: "white",
              borderRadius: 3,
              height: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Avatar src={winners[1].avatar} sx={{ width: 56, height: 56, mb: 1 }} />
            <EmojiEventsIcon sx={{ fontSize: 30 }} />
            <Typography fontWeight="bold">{winners[1].name}</Typography>
            <Typography fontSize="0.875rem">🥈 Giải Nhì</Typography>
          </Paper>
        </Grid>

        {/* First place - center */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: trophyColors[0],
              color: "white",
              borderRadius: 3,
              height: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Avatar src={winners[0].avatar} sx={{ width: 64, height: 64, mb: 1 }} />
            <EmojiEventsIcon sx={{ fontSize: 36 }} />
            <Typography fontWeight="bold">{winners[0].name}</Typography>
            <Typography fontSize="0.875rem">🥇 Giải Nhất</Typography>
          </Paper>
        </Grid>

        {/* Third place - right */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: trophyColors[2],
              color: "white",
              borderRadius: 3,
              height: 160,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Avatar src={winners[2].avatar} sx={{ width: 56, height: 56, mb: 1 }} />
            <EmojiEventsIcon sx={{ fontSize: 30 }} />
            <Typography fontWeight="bold">{winners[2].name}</Typography>
            <Typography fontSize="0.875rem">🥉 Giải Ba</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Ranking list */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          📊 Danh sách xếp hạng
        </Typography>

        <List>
          {winners.map((user, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                {index < 3 ? (
                  <Avatar src={user.avatar} sx={{ bgcolor: trophyColors[index] }}>
                    <EmojiEventsIcon />
                  </Avatar>
                ) : (
                  <Avatar src={user.avatar}>{index + 1}</Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontWeight="bold">
                    {user.name} - {user.score} điểm
                  </Typography>
                }
                secondary={
                  <Typography component="div" fontSize="0.875rem">
                    📘 Vocabulary: {user.breakdown.vocabulary} | 📗 Grammar: {user.breakdown.grammar} | 📕 Reading: {user.breakdown.reading} | 🎧 Listening: {user.breakdown.listening} | 🎤 Speaking: {user.breakdown.speaking} | ✍️ Writing: {user.breakdown.writing}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
