import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getFormatedDateTime(rawDate: string): string {
  const date = new Date(rawDate);

  const newDate = format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });

  return newDate;
}

export function getRelativeDate(rawDate: string): string {
  const date = new Date(rawDate);

  const relativeDate = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  return relativeDate;
}
