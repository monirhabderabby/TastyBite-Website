export default async function getPlaces(query: string) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                query
            )}.json?country=bd&autocomplete=true&access_token=${
                process.env.NEXT_PUBLIC_MAPBOX_TOKEN
            }`
        );

        const data = await response.json();
        return data.features;
    } catch (error) {
        console.error("There was an error while fetching places:", error);
    }
}
