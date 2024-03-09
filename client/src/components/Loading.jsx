import Skeleton from "@mui/material/Skeleton";

export function Loading() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rectangular"
      animatio="wave"
      height="100vh"
    />
  );
}
