import http from 'http'

export default function (context) {
  return console.log(context.route.fullPath);
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}