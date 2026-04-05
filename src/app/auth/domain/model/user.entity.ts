export class User {
  
  id: number;

  
  name: string;

  
  email: string;

  
  password: string;

  
  role: string;

  
  cafeteriaName: string;

  
  experience: string;

  
  profilePicture: string;

  
  paymentMethod: string;

  
  isFirstLogin: boolean;

  
  plan: string;

  
  hasPlan: boolean;

  
  home?: string;

  /**
   * Creates a new User instance
   * @param user - The user initialization object
   * @param user.id - The user ID (defaults to 0 if not provided)
   * @param user.name - The username (defaults to empty string if not provided)
   * @param user.email - The user email (defaults to empty string if not provided)
   * @param user.password - The user password (defaults to empty string if not provided)
   * @param user.role - The user role (defaults to empty string if not provided)
   * @param user.cafeteriaName - The cafeteria name associated with the user (defaults to empty string if not provided)
   * @param user.experience - The user experience (defaults to empty string if not provided)
   * @param user.profilePicture - The user profile picture URL (defaults to empty string if not provided)
   * @param user.paymentMethod - The user payment method (defaults to empty string if not provided)
   * @param user.isFirstLogin - Flag indicating if it is the user's first login (defaults to false if not provided)
   * @param user.plan - The user plan (defaults to empty string if not provided)
   * @param user.hasPlan - Flag indicating if the user has a plan (defaults to false if not provided)
   * @param user.home - The user's home dashboard route (defaults to empty string if not provided)
   */
  constructor(user: {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    role?: string,
    cafeteriaName?: string,
    experience?: string,
    profilePicture?: string,
    paymentMethod?: string,
    isFirstLogin?: boolean,
    plan?: string,
    hasPlan?: boolean,
    home?: string;
  } = {}) {
    this.id = user.id || 0;
    this.name = user.name || '';
    this.email = user.email || '';
    this.password = user.password || '';
    this.role = user.role || '';
    this.cafeteriaName = user.cafeteriaName || '';
    this.experience = user.experience || '';
    this.profilePicture = user.profilePicture || '';
    this.paymentMethod = user.paymentMethod || '';
    this.isFirstLogin = user.isFirstLogin || false;
    this.plan = user.plan || '';
    this.hasPlan = user.hasPlan || false;
    this.home = user.home || '';
  }
}