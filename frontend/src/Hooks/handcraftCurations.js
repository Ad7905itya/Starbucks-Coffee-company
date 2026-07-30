export const fetchData = async (resource) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${resource}`);
        const json = await response.json();
        return json?.data ?? [];
    } catch (error) {
        console.error(`Error fetching ${resource}:`, error);
        return [];
    }
};

export const fetchHandCraftData = async () => {
    const data = await fetchData("handcraft");
    return { data };
};