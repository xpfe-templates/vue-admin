const getters = {
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  accessToken: state => state.user.accessToken,
  userInfo: state => state.user.userInfo,
}
export default getters
