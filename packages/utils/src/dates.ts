/**
 * Date formatting utilities for Chilean locale
 */

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

const DAYS_ES = [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

/**
 * Formats a date as "15 de abril de 2026"
 */
export function formatDateLong(date: Date): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  const year = d.getFullYear();
  return `${day} de ${month} de ${year}`;
}

/**
 * Formats a date as "15 abr 2026"
 */
export function formatDateShort(date: Date): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Formats a date as "Lunes 15 de abril"
 */
export function formatDateWithDay(date: Date): string {
  const d = new Date(date);
  const dayName = DAYS_ES[d.getDay()];
  const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  const dayNum = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  return `${dayNameCapitalized} ${dayNum} de ${month}`;
}

/**
 * Returns relative time: "hace 2 días", "hace 1 hora", etc.
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? 'hace 1 día' : `hace ${diffDays} días`;
  }
  if (diffHours > 0) {
    return diffHours === 1 ? 'hace 1 hora' : `hace ${diffHours} horas`;
  }
  if (diffMins > 0) {
    return diffMins === 1 ? 'hace 1 minuto' : `hace ${diffMins} minutos`;
  }
  return 'hace un momento';
}

/**
 * Calculates days until a date (negative if past)
 */
export function daysUntil(date: Date): number {
  const now = new Date();
  const d = new Date(date);
  
  // Reset time to compare dates only
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  
  const diffMs = d.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
