export type SwaggerFiledDocType<T> = {
  [K in keyof T]?: (prop?: any) => PropertyDecorator;
};

export type SwaggerEntityDocType<Entity> = SwaggerFiledDocType<Entity>;
