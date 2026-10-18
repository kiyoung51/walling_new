/**
 * Auth Use Cases
 * Clean Architecture - Application Layer
 */
import { userRepository } from '../../../infrastructure/repositories/UserRepository.js';
import { User } from '../../../domain/entities/User.js';
import { USER_ROLES } from '../../../domain/constants/AppConstants.js';

export class GetCurrentUserUseCase {
  constructor(repo = userRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getCurrentUser();
  }
}

export class LoginUseCase {
  constructor(repo = userRepository) {
    this.repo = repo;
  }

  execute(userId, password = '') {
    const cleanId = (userId || '').trim();
    const isAdmin = cleanId.toLowerCase() === 'admin';
    const isBusiness = cleanId.includes('boss') || cleanId.includes('pro');

    let name = '홍길동(일반회원)';
    let role = USER_ROLES.USER;

    if (isAdmin) {
      name = '최고관리자 (Admin)';
      role = USER_ROLES.ADMIN;
    } else if (isBusiness) {
      name = '김도배(시공사업자)';
      role = USER_ROLES.BUSINESS;
    }

    const user = new User({
      userId: cleanId,
      name,
      role,
      isAdmin,
      isBusiness,
      point: isAdmin ? 999999 : 3000,
      coupons: 5,
      email: `${cleanId}@byeokjiwang.co.kr`,
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123'
    });

    return this.repo.save(user);
  }
}

export class SignupUseCase {
  constructor(repo = userRepository) {
    this.repo = repo;
  }

  execute(userData) {
    const isBusiness = userData.type === 'business';
    const user = new User({
      userId: userData.userId || `user_${Date.now().toString().slice(-4)}`,
      name: userData.name || '신규회원',
      role: isBusiness ? USER_ROLES.BUSINESS : USER_ROLES.USER,
      isAdmin: false,
      isBusiness,
      point: 5000, // 신규가입 웰컴 적립금 5,000P
      coupons: 3,
      email: userData.email || '',
      phone: userData.phone || '010-0000-0000',
      address: userData.address || '서울시 강남구'
    });

    return this.repo.save(user);
  }
}

export class LogoutUseCase {
  constructor(repo = userRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.remove();
  }
}
