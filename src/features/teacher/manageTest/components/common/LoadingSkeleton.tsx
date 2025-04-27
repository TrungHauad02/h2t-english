import React from "react";
import {
  Box,
  Stack,
  Skeleton,
  CircularProgress,
  Typography,
  Fade,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface LoadingSkeletonProps {
  isLoading: boolean;
  rows?: number;
  cardsPerRow?: number;
  cardHeight?: number;
  message?: string;
  cardType?: "route" | "toeic";
}

export default function LoadingSkeleton({
  isLoading,
  rows = 4,
  cardsPerRow = 3,
  cardHeight = 360,
  message = "Loading...",
  cardType = "route",
}: LoadingSkeletonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const skeletonColor = isDarkMode ? color.gray700 : color.gray200;
  const loadingBarColor = isDarkMode ? color.teal400 : color.teal600;

  // Determine content based on card type
  const renderCardContent = (itemKey: string) => {
    if (cardType === "toeic") {
      return (
        <Box sx={{ p: 2 }}>
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            width="70%"
            height={32}
            sx={{
              backgroundColor: skeletonColor,
            }}
          />

          {/* Details Skeleton */}
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{
              backgroundColor: skeletonColor,
              mt: 1,
            }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{
              backgroundColor: skeletonColor,
              mb: 1,
            }}
          />

          {/* Divider Skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={1}
            sx={{
              backgroundColor: skeletonColor,
              my: 2,
            }}
          />

          {/* Action buttons Skeleton */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={120}
              height={36}
              sx={{
                backgroundColor: skeletonColor,
                borderRadius: 1,
              }}
            />
            <Skeleton
              variant="circular"
              width={36}
              height={36}
              sx={{
                backgroundColor: skeletonColor,
              }}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <>
          {/* Image Skeleton for route cards */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{
              backgroundColor: skeletonColor,
            }}
          />

          <Box sx={{ p: 2 }}>
            {/* Title Skeleton */}
            <Skeleton
              variant="text"
              width="70%"
              height={32}
              sx={{
                backgroundColor: skeletonColor,
              }}
            />

            {/* Description Skeleton */}
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{
                backgroundColor: skeletonColor,
                mt: 1,
              }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height={20}
              sx={{
                backgroundColor: skeletonColor,
                mb: 1,
              }}
            />

            {/* Divider Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={1}
              sx={{
                backgroundColor: skeletonColor,
                my: 2,
              }}
            />

            {/* Action buttons Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={120}
                height={36}
                sx={{
                  backgroundColor: skeletonColor,
                  borderRadius: 1,
                }}
              />
              <Skeleton
                variant="circular"
                width={36}
                height={36}
                sx={{
                  backgroundColor: skeletonColor,
                }}
              />
            </Box>
          </Box>
        </>
      );
    }
  };

  if (!isLoading) return null;

  return (
    <Fade in={isLoading} timeout={300}>
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <CircularProgress
            size={32}
            sx={{
              color: loadingBarColor,
            }}
          />
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mb: 4,
            color: isDarkMode ? color.gray400 : color.gray600,
            fontStyle: "italic",
          }}
        >
          {message}
        </Typography>

        {/* Skeleton cards */}
        <Stack spacing={2} sx={{ px: 2 }}>
          {Array.from({ length: rows }).map((_, row) => (
            <Box
              key={`row-${row}`}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {Array.from({ length: cardsPerRow }).map((_, card) => (
                <Box
                  key={`card-${row}-${card}`}
                  sx={{
                    width: 345,
                    height: cardType === "toeic" ? 220 : cardHeight,
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    boxShadow: `0 4px 12px rgba(0,0,0,${
                      isDarkMode ? 0.3 : 0.08
                    })`,
                    border: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {renderCardContent(`${row}-${card}`)}
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      </Box>
    </Fade>
  );
}