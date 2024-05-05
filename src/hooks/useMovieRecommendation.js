import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'


const fetchMovieRecommendation = ({movieId}) => {
    return api.get(`movie/${movieId}/recommendations`)
}

export const useMovieRecommendationQuery = ({movieId}) => {
    return useQuery({
        queryKey: ['movie-recommendation', {movieId}],
        queryFn: () => fetchMovieRecommendation({movieId}),
        select: (result) => result.data,
    })
}