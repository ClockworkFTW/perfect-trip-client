import { useReducer } from "react";

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
 * @returns {array} An array containing the function and an object containing the result data, pending state and error message
 */
const useMutation = (cb, init) => {
  const [state, dispatch] = useReducer(reducer, {
    data: init,
    pending: false,
    error: null,
  });

  const fn = async (arg) => {
    try {
      dispatch({ type: "pending" });
      const data = await cb(arg);
      dispatch({ type: "success", payload: { data } });
    } catch (error) {
      dispatch({ type: "failure", payload: { error } });
    }
  };

  return [fn, state];
};

export default useMutation;
