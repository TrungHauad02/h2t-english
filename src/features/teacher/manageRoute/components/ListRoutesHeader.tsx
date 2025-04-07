import { Stack } from "@mui/material";
import { WEAdvanceFilter, WEButton } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useState } from "react";
import { Route, RouteFilter } from "interfaces";
import { routeService } from "../../../../services/route/routeService";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CreateRouteDialog from "./CreateRouteDialog";

interface ListRoutesHeaderProps {
  filter: RouteFilter;
  updateFilter: (updates: Partial<RouteFilter>) => void;
  handleSearch: () => void;
}

export default function ListRoutesHeader({
  filter,
  updateFilter,
  handleSearch,
}: ListRoutesHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState<boolean>(false);
  const [data, setData] = useState<Route>({
    id: -1,
    title: "",
    description: "",
    status: false,
    image: "",
    ownerId: 1, // TODO: get teacher id
    routeNodes: [],
  });

  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(!isOpenCreateDialog);
  };

  const handleOpenFilterDialog = () => {
    setIsOpenFilterDialog(!isOpenFilterDialog);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, description: e.target.value });
  };

  const onChangeImage = (value: string) => {
    setData({ ...data, image: value });
  };

  const onCreateRoute = async () => {
    try {
      const responseData = await routeService.create(data);
      console.log(responseData);
      setIsOpenCreateDialog(!isOpenCreateDialog);
      navigate(`/teacher/routes/${responseData.data.id}`);
    } catch {
      // TODO: show error message
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent={"space-between"}
      spacing={2}
      sx={{
        p: 1,
        px: 1.5,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray950 : color.gray50,
      }}
    >
      {/* Search bar */}
      <SearchBar
        filter={filter}
        updateFilter={updateFilter}
        onSearch={handleSearch}
        onOpenFilterDialog={handleOpenFilterDialog}
      />

      {/* Actions */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
      >
        <WEButton variant="contained" onClick={handleOpenCreateDialog}>
          Create Route
        </WEButton>
      </Stack>

      {/* Create Route Dialog */}
      <CreateRouteDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={data}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
        onChangeImage={onChangeImage}
        onCreateRoute={onCreateRoute}
      />

      {/* Filter Dialog */}
      <WEAdvanceFilter
        filter={filter}
        updateFilter={updateFilter}
        open={isOpenFilterDialog}
        onClose={handleOpenFilterDialog}
        onApply={handleSearch}
      />
    </Stack>
  );
}
