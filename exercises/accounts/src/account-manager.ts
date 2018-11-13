interface IUser {
  email: string,
  password: string,
  adminSince: Date,
  isActive: boolean
}

interface IAdmin {
  users: IUser[],
  activateNewUser(approver: IUser, userToApprove: IUser): void
  promoteToAdmin(existingAdmin: IUser, user: IUser): void
}

export class AccountManager implements IAdmin {
  users = [];

  /**
   * Create a new user account
   * @param email email address
   * @param password the user's password
   * @return the new user account. An admin must activate it using activateNewUser
   * @see this.activateNewUser
   */
  register(email: string, password: string) {
    if(!email) throw 'Must provide an email';
    if(!password) throw 'Must provide a password';
    let user = { email, password } as never;
    this.users.push(user);
    return user;
  }

  /**
   * Activate a new user account
   * @param approver The admin who's approving this new user
   * @param userToApprove Newly-registered user, who is to be activated
   * @return the updated user object, now activated
   */
  activateNewUser(approver: IUser, userToApprove: IUser) : IUser {
    if (!approver.adminSince) throw "Approver is not an admin!";
    userToApprove.isActive = true;
    return userToApprove;
  }

  /**
   * Promote a normal user to admin
   * @param existingAdmin admin who is promoting another user
   * @param user an active user who you're making an admin
   * @return the updated user object, now can also be regarded as an admin
   */
  promoteToAdmin(existingAdmin: IUser, user: IUser) : IUser {
    if (!existingAdmin.adminSince) throw "Not an admin!";
    if (!user.isActive) throw "User must be active in order to be promoted to admin!";
    user.adminSince = new Date();
    return user;
  }
}
