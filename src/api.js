export async function getPopularMovies(page) {
    // const DELAY_DURATION = 5000;
    // await new Promise(resolve => setTimeout(resolve, DELAY_DURATION));
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

export async function getMovies(page, genres) {
    let url = "";
    if (genres) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&page=${page}&with_genres=${genres.split("-").join(",")}`;
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
    }
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getTvShows(page, genres) {
    let url = "";
    if (genres) {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&page=${page}&with_genres=${genres.split("-").join(",")}`;
    } else {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
    }
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

export async function getMovieTrailer(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getTvTrailer(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
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

export async function getSearchResults(query) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getMovieCredits(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getTvCredits(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getGenres(type) {
    let url = ``
    if (type === "movies") {
        url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
    } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_API_KEY}`
    }
    try {
        const res = await fetch(url);
        const data = res.json();
        return data
    } catch (error) {
        throw error
    }
}

export async function getMovieListDetails(ids) {
    if(!ids) {
        return
    }
    const urls = ids?.map(id => `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
    try {
        const responses = await Promise.all(urls?.map(url => fetch(url)));
        const moviesData = await Promise.all(responses?.map(res => res.json()));
        // console.log(moviesData);
        return moviesData;
    } catch (error) {
        throw error;
    }
}

export async function getTvListDetails(ids) {
    if(!ids) {
        return
    }
    const urls = ids?.map(id => `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
    try {
        const responses = await Promise.all(urls?.map(url => fetch(url)));
        const tvData = await Promise.all(responses?.map(res => res.json()));
        // console.log(tvData);
        return tvData;
    } catch (error) {
        throw error;
    }
}