import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMovieVideos = ({movieId}) => {
    return api.get(`/movie/${movieId}/videos`)
}

export const useMovieVideosQuery = ({movieId}) => {
    return useQuery({
        queryKey:['movie-video', {movieId}],
        queryFn: () => fetchMovieVideos({movieId}),
        select: (result) => result.data,
    })
}