import { useEffect, useReducer } from "react";

const initialState = {
  pending: false,
  data: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, pending: true };
    case "success":
      return { pending: false, error: null, data: action.payload.data };
    case "failure":
      return { ...state, pending: false, error: action.payload.error };
    default:
      return state;
  }
};

const useApi = (arg, func) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const callFn = async () => {
      try {
        dispatch({ type: "pending" });
        const data = await func(arg);
        console.log(data); // TODO: Remove in prod
        dispatch({ type: "success", payload: { data } });
      } catch (error) {
        dispatch({ type: "failure", payload: { error } });
      }
    };

    if (arg !== "") {
      callFn();
    }
  }, [arg, func]);

  return state;
};

export default useApi;
