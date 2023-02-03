import { useEffect, useState } from "react";

export default function useFirebaseDocs<T>(getFunction: () => Promise<T>) {
  const [docs, setDocs] = useState<T>();

  useEffect(() => {
    (async () => {
      const results = await getFunction();
      setDocs(results);
    })();
  }, []);

  return docs;
}
