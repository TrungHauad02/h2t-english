import { useNavigate } from "react-router-dom";

export default function useHeroSection() {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => () => {
        navigate(path);
    };

    return{
        handleNavigation
    }
} 