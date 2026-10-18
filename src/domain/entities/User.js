/**
 * User Entity
 * Clean Architecture - Domain Layer
 */
import { USER_ROLES } from '../constants/AppConstants.js';

export class User {
  constructor({
    userId,
    name = '고객님',
    role = USER_ROLES.USER,
    isAdmin = false,
    isBusiness = false,
    point = 3000,
    coupons = 3,
    email = '',
    phone = '010-0000-0000',
    address = ''
  }) {
    this.userId = String(userId || 'guest');
    this.name = String(name);
    this.role = String(role);
    this.isAdmin = Boolean(isAdmin || this.role === USER_ROLES.ADMIN || this.userId === 'admin');
    this.isBusiness = Boolean(isBusiness || this.role === USER_ROLES.BUSINESS);
    this.point = Number(point) || 0;
    this.coupons = Number(coupons) || 0;
    this.email = String(email || `${this.userId}@byeokjiwang.co.kr`);
    this.phone = String(phone);
    this.address = String(address);
  }

  isAdministrator() {
    return this.isAdmin === true || this.role === USER_ROLES.ADMIN || this.userId === 'admin';
  }

  getRoleDisplayName() {
    if (this.isAdministrator()) return '최고관리자 (Admin)';
    if (this.isBusiness) return '시공사업자회원';
    return '일반회원';
  }
}
