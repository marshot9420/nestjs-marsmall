import { APP } from '@/constants';
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MarsMall - API')
  .setDescription('MarsMall E-Commerce API Docs')
  .setVersion(APP.VERSION)
  .build();
