const roles = {
  super_user: "super user",
  user: "user",
  admin: "admin",
  saas_admin: "saas admin",
};

export const isHeigherPermission = (userRole, comparedRole) => {
  console.log(userRole, comparedRole);
  const rolesValue = {
    user: 0,
    "super user": 1,
    admin: 2,
    "saas admin": 3,
  };
  console.log(rolesValue[userRole], rolesValue[comparedRole]);

  return rolesValue[userRole] > rolesValue[comparedRole];
};

export const notAdmin = [roles.super_user, roles.user, roles.saas_admin];
export const notUser = [roles.super_user, roles.admin, roles.saas_admin];
export const notSuperUser = [roles.user, roles.admin, roles.saas_admin];

export default roles;
