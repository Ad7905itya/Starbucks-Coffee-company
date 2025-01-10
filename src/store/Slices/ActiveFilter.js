import { Handcraft } from "../../Data/HandcraftCurations";
const SET_ACTIVE = "SET_ACTIVE";

export const setActive = (data) => {
  return {
    type: SET_ACTIVE,
    payload: data,
  };
};

export function ActiveFilter(
  state = { Active: Handcraft.map((item) => item.mainCategory)[0] },
  action
) {
  switch (action.type) {
    case SET_ACTIVE:
      return { ...state, Active: action.payload };
    default:
      return state;
  }
}
