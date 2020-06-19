import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API
})

export const api = {
  get (endpoint) {
    return axiosInstance.get(endpoint)
  },
  post (endpoint, body) {
    return axiosInstance.post(endpoint, body)
  },
  put (endpoint, body) {
    return axiosInstance.put(endpoint, body)
  },
  delete (endpoint) {
    return axiosInstance.delete(endpoint)
  }
}

// export function getCep (cep) {
//   return axios.get(`https://viacep.com.br/ws/${cep}/json`)
// }

/**
   * Import Anime records from Kitsu.
   *
   * @return {Array}
   */
export async function importAnime (id) {
  await axios.get(`https://kitsu.io/api/edge/anime/${id}`)
    .then(response => {
      const postData = {
        title: response.data.data.attributes.canonicalTitle,
        title_jp: response.data.data.attributes.titles.ja_jp,
        slug: response.data.data.attributes.slug,
        type: response.data.data.type,
        kitsu_id: response.data.data.id,
        showType: response.data.data.attributes.showType,
        episodeCount: response.data.data.attributes.episodeCount,
        episodeLength: response.data.data.attributes.episodeLength,
        startDate: response.data.data.attributes.startDate,
        endDate: response.data.data.attributes.endDate,
        nsfw: response.data.data.attributes.nsfw,
        youtubeVideoId: response.data.data.attributes.youtubeVideoId,
        ageRating: response.data.data.attributes.ageRating,
        ageRatingGuide: response.data.data.attributes.ageRatingGuide,
        status: response.data.data.attributes.status,
        tba: response.data.data.attributes.tba,
        posterImage: response.data.data.attributes.posterImage,
        coverImage: response.data.data.attributes.coverImage,
        synopsis: response.data.data.attributes.synopsis,
        latestUpdate: new Date(),
        kitsu: response.data.data
      }
      // console.log(postData.title)
      // ctx.send(postData)
      // strapi.services.titles.create(postData).then(res => {
      //   console.log(postData.title)
      //   ctx.send(res)
      // }).catch(err =>{
      //   ctx.send(err)
      // })
      console.log('importAnime:', postData)
      console.log('Response importAnime:', response)
    })
    .catch(err => {
      console.log(err)
    })
}
Vue.prototype.$axios = axios
