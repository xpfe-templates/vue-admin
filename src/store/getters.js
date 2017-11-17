const getters = {
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  accessToken: state => state.user.accessToken,
  userInfo: state => state.user.userInfo,
}
export default getters
