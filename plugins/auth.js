export default function ({ $auth }) {
  console.log(" ::plugins:auth: ", $auth)
  /*if (!$auth.loggedIn) {
    return
  }*/
  let username
  if($auth && $auth.user) {
    username = $auth.user.username
  }
}