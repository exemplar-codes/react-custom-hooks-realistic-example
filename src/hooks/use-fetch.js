import { useEffect, useState, useCallback } from "react";

function useFetch(url, onSuccess, onLoad = false, method = "get", payloadBody) {
  /*
  onLoad: boolean
  url: string
  onSuccess(json_data)
  method: 'get'/'method'
  body
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCore = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        url,
        method && {
          method: method,
          body: JSON.stringify(payloadBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      try {
        onSuccess(data);
      } catch (err) {
        setError(err.message || "onSuccess logic failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [url, onSuccess, method, payloadBody]);

  useEffect(() => {
    if (onLoad) fetchCore();
  }, [onLoad, fetchCore]);

  return [isLoading, error, fetchCore];
}

export default useFetch;
