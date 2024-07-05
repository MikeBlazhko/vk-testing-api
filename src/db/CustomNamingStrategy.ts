import { snakeCase } from 'typeorm/util/StringUtils';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class CustomNamingStrategy extends SnakeNamingStrategy {
  joinTableName(firstTableName: string, secondTableName: string): string {
    return snakeCase(firstTableName + '_to_' + secondTableName);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    const out = alias + '_' + propertyPath.replace('.', '_');
    const match = out.match(/_/g) || [];

    return out + match.length;
  }
}
