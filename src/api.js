export async function getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`;
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}

export async function getPopularTvShows(page) {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`;
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}