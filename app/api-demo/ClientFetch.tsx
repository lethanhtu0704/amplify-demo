'use client';

import { useEffect, useState } from 'react';

export default function ClientFetch({ url }: { url: string }) {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    // To test cookies later, add `credentials: 'include'` and point at a backend
    // that returns Access-Control-Allow-Credentials + a specific allowed origin.
    fetch(url)
      .then((r) => r.json())
      .then((j) => setText(JSON.stringify(j, null, 2)))
      .catch((e) => setText(`Client fetch failed (CORS?): ${String(e)}`));
  }, [url]);

  return <pre>{text}</pre>;
}
