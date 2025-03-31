import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import StudentHeader from './header/StudentHeader';
import Footer from './footer/Footer';
import { Box } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

export default function StudentLayout() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const showLayout = useSelector((state: any) => state.layout.showHeaderFooter);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4 },
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
      }}
    >
      {showLayout && <StudentHeader />}
      <Outlet />
      {showLayout && <Footer />}
    </Box>
  );
}
