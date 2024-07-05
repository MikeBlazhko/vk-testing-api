import { format } from 'sql-formatter';

export function sqlPrettifier(sql: string): string {
  try {
    return '\n' + format(sql, { language: 'postgresql' });
  } catch (e) {
    return '';
  }
}
