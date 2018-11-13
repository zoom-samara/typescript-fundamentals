interface INewUser {
  email: string,
  password: string,
}
interface IUser {
  email: string,
  password: string,
  isActive: boolean
}

interface IAdmin {
  email: string,
  password: string,
  adminSince: Date,
  isActive: boolean
}

export class AccountManager {
  users : INewUser[] = [];

  /**
   * Create a new user account
   * @param email email address
   * @param password the user's password
   * @return the new user account. An admin must activate it using activateNewUser
   * @see this.activateNewUser
   */
  register(email: string, password: string): INewUser {
    if(!email) throw 'Must provide an email';
    if(!password) throw 'Must provide a password';
    let user = { email, password } as INewUser;
    this.users.push(user);
    return user;
  }

  /**
   * Activate a new user account
   * @param approver The admin who's approving this new user
   * @param userToApprove Newly-registered user, who is to be activated
   * @return the updated user object, now activated
   */
  activateNewUser(approver: IAdmin, userToApprove: INewUser) : IUser {
    if (!approver.adminSince) throw "Approver is not an admin!";
    let confirmedUser = userToApprove as IUser;
    confirmedUser.isActive = true;
    return confirmedUser;
  }

  /**
   * Promote a normal user to admin
   * @param existingAdmin admin who is promoting another user
   * @param user an active user who you're making an admin
   * @return the updated user object, now can also be regarded as an admin
   */
  promoteToAdmin(existingAdmin: IAdmin, user: IUser) : IAdmin {
    if (!existingAdmin.adminSince) throw "Not an admin!";
    if (!user.isActive) throw "User must be active in order to be promoted to admin!";
    let newAdmin = user as IAdmin;
    newAdmin.adminSince = new Date();
    return newAdmin;
  }
}
