import { useEffect, useState } from "react";

export default function useFirebaseDocs<T>(
  getFunction: () => Promise<T | undefined>
): [T | undefined, () => Promise<void>] {
  const [docs, setDocs] = useState<T>();
  const [loading, setLoading] = useState(false);

  const fetcher = async () => {
    setLoading(true);
    const results = await getFunction();
    setDocs(results);
    setLoading(false);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return [docs, fetcher];
}
