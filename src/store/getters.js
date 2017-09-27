const getters = {
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userId,
  accessToken: state => state.user.accessToken,
}
export default getters
