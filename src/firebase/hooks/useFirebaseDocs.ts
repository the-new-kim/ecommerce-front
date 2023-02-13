import { useEffect, useState } from "react";

export default function useFirebaseDocs<T>(
  callback: () => Promise<T | undefined>
) {
  const [docs, setDocs] = useState<T>();

  useEffect(() => {
    (async () => {
      try {
        const results = await callback();
        setDocs(results);
      } catch (error) {
        console.log("Error::::", error);
      }
    })();
  }, []);

  return docs;
}
