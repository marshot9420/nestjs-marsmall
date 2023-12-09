import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY } from '@/models';

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGY.LOCAL) {}
