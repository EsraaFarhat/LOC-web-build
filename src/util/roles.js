const roles = {
  super_user: "super user",
  user: "user",
  admin: "admin",
  sass_admin: "saas admin",
};

export const notAdmin = [roles.super_user, roles.user, roles.sass_admin];
export const notUser = [roles.super_user, roles.admin, roles.sass_admin];

export default roles;
