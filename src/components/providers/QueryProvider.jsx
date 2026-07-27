"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const QueryContext = createContext(null);

export default function QueryProvider({ children }) {
  const [queryState, setQueryState] = useState({});

  return (
    <QueryContext.Provider value={{ queryState, setQueryState }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useMutation({ mutationFn, onSuccess, onError }) {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(
    async (variables) => {
      setIsPending(true);
      setIsError(false);
      setError(null);
      try {
        const result = await mutationFn(variables);
        setData(result);
        setIsSuccess(true);
        setIsPending(false);
        if (onSuccess) onSuccess(result, variables);
        return result;
      } catch (err) {
        setError(err);
        setIsError(true);
        setIsPending(false);
        if (onError) onError(err, variables);
      }
    },
    [mutationFn, onSuccess, onError]
  );

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
}
