import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'


const fetchDetailMovie = ({movieId}) => {
    return api.get(`/movie/${movieId}`)
}

export const useDetailMovieQuery = ({movieId}) => {
    return useQuery({
        queryKey:['movie-detail', {movieId}],
        queryFn: () => fetchDetailMovie({movieId}),
        select: (result) => result.data,
    })
}