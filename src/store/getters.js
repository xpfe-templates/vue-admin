const getters = {
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userinfo: state => state.user.userinfo,
  roles: state => state.user.roles,
}
export default getters
