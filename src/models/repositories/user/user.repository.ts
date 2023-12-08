import { Repository } from 'typeorm';

import { CustomEntityRepository } from '@/common';

import { User } from '@/models/entities';

@CustomEntityRepository(User)
export class UserRepository extends Repository<User> {}
