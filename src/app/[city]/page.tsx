type PropsType = {
  params: {
    city: string;
  };
};

async function getData(city: string) {
  // Load environment variables
  const { API_URL, API_KEY } = process.env;

  // Query the Weather API
  const res = await fetch(`${API_URL}/current.json?key=${API_KEY}&q=${city}`);

  return res.json();
}

export default async function City({ params: { city } }: PropsType) {
  const data = await getData(city);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="mb-3 text-2xl font-semibold">Hey {city}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
