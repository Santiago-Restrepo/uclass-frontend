//Redux
import { useDispatch } from "react-redux";
import { setNavigation } from "@/features/navigationSlice";

export const useNavigationPath = (navigationPath: string[]) => {
    const dispatch = useDispatch();
    dispatch(setNavigation(navigationPath));
};