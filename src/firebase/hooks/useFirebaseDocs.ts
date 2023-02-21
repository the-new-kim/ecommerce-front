import { useEffect, useState } from "react";

export default function useFirebaseDocs<T>(
  getFunction: () => Promise<T | undefined>
) {
  const [docs, setDocs] = useState<T>();

  const fetcher = async () => {
    const results = await getFunction();
    setDocs(results);
  };

  useEffect(() => {
    (async () => {
      try {
        fetcher();
      } catch (error) {
        console.log("Error::::", error);
      }
    })();
  }, []);

  return docs;
}
