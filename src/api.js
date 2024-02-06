export async function getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}

export async function getPopularTvShows(page) {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}

export async function getTrending() {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}`;
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}

export async function getMovieDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}

export async function getTvDetails(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error        
    }
}