import { useReducer } from "react";
import { useDeepCompareEffect } from "react-use";

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

/**
 * API hook
 * @param {function} cb - Callback function
 * @param {*} init - Initial data state
 * @param {*} [arg] - Optional argument supplied to callback function
 * @returns {object} An object containing the result data, pending state and error message
 */
const useApi = (cb, init, arg) => {
  const [state, dispatch] = useReducer(reducer, {
    data: init,
    pending: false,
    error: null,
  });

  useDeepCompareEffect(() => {
    const callCb = async () => {
      try {
        dispatch({ type: "pending" });
        const data = await cb(arg);
        dispatch({ type: "success", payload: { data } });
      } catch (error) {
        dispatch({ type: "failure", payload: { error } });
      }
    };

    if (arg !== "") {
      callCb();
    }
  }, [cb, arg]);

  return state;
};

export default useApi;
