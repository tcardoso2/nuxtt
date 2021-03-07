/**
 * Needed something quick to parse JSON body data,
 * Not nice, but it does the trick
 */
export default {
  path: '/api/users',
  handler(req, res, next) {

    let body = ''

    req.on('data', (data) => {
      body += data;
    })

    req.on('end', () => {
      //TODO: Handle it via promise / async await please
      req.body = body
      next();
    })
  }
}
