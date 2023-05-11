const { API_URL, API_KEY } = process.env;

type PropsType = {
  params: {
    url: string;
  };
};

async function getCityData(url: string) {
  const res = await fetch(`${API_URL}/current.json?key=${API_KEY}&q=${url}`);
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  return res.json();
}

export default async function CityPage({ params: { url } }: PropsType) {
  const data = await getCityData(url);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="mb-3 text-2xl font-semibold">Hey {url}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
