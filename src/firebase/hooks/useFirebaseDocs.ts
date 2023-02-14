import { useEffect, useState } from "react";

export default function useFirebaseDocs<T>(
  getFunction: () => Promise<T | undefined>
) {
  const [docs, setDocs] = useState<T>();

  useEffect(() => {
    (async () => {
      try {
        const results = await getFunction();
        setDocs(results);
      } catch (error) {
        console.log("Error::::", error);
      }
    })();
  }, []);

  return docs;
}
