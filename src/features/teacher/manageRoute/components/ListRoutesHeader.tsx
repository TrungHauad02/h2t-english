import { Stack } from "@mui/material";
import {
  WEButton,
  WESelect,
  WESelectImage,
  WETextField,
} from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { WEDialog } from "components/display";
import { Route } from "interfaces";
import { routeService } from "../services/routeService";
import { useNavigate } from "react-router-dom";

interface ListRoutesHeaderProps {
  searchText: string;
  setSearchText: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleSearch: () => void;
}

export default function ListRoutesHeader({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  handleSearch,
}: ListRoutesHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false);
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
      // create new route
      const responseData = await routeService.createRoute(data);
      console.log(responseData);
      setIsOpenCreateDialog(!isOpenCreateDialog);
      // TODO: show success message
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
    >
      {/* Search bar */}
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <WETextField
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: "0.75rem", sm: "1rem" },
              width: "100%",
              paddingLeft: "0.2rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${color.gray400}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  isDarkMode ? color.emerald400 : color.emerald500
                }`,
              },
              fontSize: "1rem",
              margin: 0,
            },
          }}
        />
        <WESelect
          label="Filter"
          onChange={(value) => setStatusFilter(value as string)}
          options={[
            { label: "All", value: "all" },
            { label: "Published", value: "published" },
            { label: "Unpublished", value: "unpublished" },
          ]}
          value={statusFilter}
        />
        <WEButton
          variant="contained"
          sx={{ width: "40px", height: "40px" }}
          onClick={handleSearch}
        >
          <Search />
        </WEButton>
      </Stack>
      {/* Actions */}
      <Stack direction={"row"} alignItems={"center"}>
        <WEButton variant="contained" onClick={handleOpenCreateDialog}>
          Create Route
        </WEButton>
      </Stack>
      <WEDialog
        title="Create Route"
        open={isOpenCreateDialog}
        onCancel={handleOpenCreateDialog}
        onOk={onCreateRoute}
      >
        <Stack>
          <WETextField
            label="Title"
            value={data.title}
            onChange={onChangeTitle}
            type="text"
            required
          />
          <WETextField
            label="Description"
            value={data.description}
            onChange={onChangeDescription}
            type="text"
            required
          />
          <WESelectImage
            label="Image"
            value={data.image}
            onChange={onChangeImage}
            required
          />
        </Stack>
      </WEDialog>
    </Stack>
  );
}
