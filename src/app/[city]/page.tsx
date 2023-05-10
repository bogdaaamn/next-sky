import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

type PropsType = {
  params: {
    city: string;
  };
};

async function getCityData(city: string) {
  // Load environment variables
  const { API_URL, API_KEY } = process.env;

  // Query the Weather API
  const res = await fetch(`${API_URL}/current.json?key=${API_KEY}&q=${city}`);

  return res.json();
}

async function getFavoriteData(city: string) {
  const { rows } =
    await sql`SELECT EXISTS(SELECT 1 FROM CityFavorite WHERE city_url=${city});`;

  return rows[0];
}

async function setFavoriteData(city: string) {
  const { rows } = await sql`
    WITH city AS (
      SELECT id, city_url FROM CityFavorite WHERE city_url = ${city}
    ),
    insert_city AS (
      INSERT INTO CityFavorite (city_url) SELECT ${city} WHERE NOT EXISTS (SELECT 1 FROM city)
      RETURNING id, city_url
    ),
    delete_city AS (
      DELETE FROM CityFavorite WHERE id = (SELECT id FROM city)
      RETURNING id, city_url
    )
    SELECT id, city_url, 'inserted' AS action FROM insert_city
    UNION ALL
    SELECT id, city_url, 'deleted' AS action FROM delete_city;
  `;

  return rows;
}

export default async function City({ params: { city } }: PropsType) {
  const data = await getCityData(city);
  const favoriteData = await getFavoriteData(city);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="mb-3 text-2xl font-semibold">Hey {city}</h2>
      <p className="mb-3 text-xl">
        {favoriteData.exists ? "Favorite ✅" : "Not favorite ❌"}
      </p>
      <form
        action={async () => {
          "use server";
          await setFavoriteData(city);
          revalidatePath(`/${city}`);
        }}
      >
        <button type="submit" className="mb-3 text-xl">
          {favoriteData.exists ? "Remove from favorites" : "Add to favorites"}
        </button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
