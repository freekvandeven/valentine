/**
 * Page Flow Configuration
 * 
 * This configuration defines the order of pages in the Valentine's website.
 * You can easily:
 * - Reorder pages by changing the order in the array
 * - Remove pages by commenting out or deleting entries
 * - Add new pages by adding entries to the array
 * 
 * Each page needs:
 * - id: unique identifier (matches the route path, use '' for home)
 * - name: display name for the page
 * - enabled: whether the page is active (set to false to skip)
 * - section: which section of the flow this page belongs to
 * - icon: emoji icon for the progress bar
 */

export type FlowSection = 'intro' | 'activities' | 'food' | 'finale';

export interface PageConfig {
  id: string;
  name: string;
  enabled: boolean;
  section: FlowSection;
  icon: string;
}

/**
 * Define the order of pages here.
 * The flow will follow this order, skipping any disabled pages.
 * 
 * Sections:
 * - intro: Initial pages (question, games, love letter)
 * - activities: What you'll do together (future)
 * - food: What you'll eat (future)
 * - finale: Final countdown/celebration
 */
export const PAGE_FLOW: PageConfig[] = [
  // Intro section
  { id: '', name: 'Question', enabled: true, section: 'intro', icon: '💕' },
  { id: 'memory', name: 'Memory Game', enabled: true, section: 'intro', icon: '🎮' },
  { id: 'love-letter', name: 'Love Letter', enabled: true, section: 'intro', icon: '💌' },
  
  // Activities section (future)
  // { id: 'activities', name: 'Activities', enabled: false, section: 'activities', icon: '🎯' },
  
  // Food section (future)
  // { id: 'food', name: 'Dinner', enabled: false, section: 'food', icon: '🍽️' },
  
  // Finale section
  { id: 'countdown', name: 'Countdown', enabled: true, section: 'finale', icon: '⏰' },
];

/**
 * Get the next page in the flow from the current page.
 * Returns null if there's no next page.
 */
export function getNextPage(currentPageId: string): PageConfig | null {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  const currentIndex = enabledPages.findIndex(page => page.id === currentPageId);
  
  if (currentIndex === -1 || currentIndex >= enabledPages.length - 1) {
    return null;
  }
  
  return enabledPages[currentIndex + 1];
}

/**
 * Get the previous page in the flow from the current page.
 * Returns null if there's no previous page.
 */
export function getPreviousPage(currentPageId: string): PageConfig | null {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  const currentIndex = enabledPages.findIndex(page => page.id === currentPageId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return enabledPages[currentIndex - 1];
}

/**
 * Check if a page is the last in the flow.
 */
export function isLastPage(pageId: string): boolean {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  return enabledPages[enabledPages.length - 1]?.id === pageId;
}

/**
 * Check if a page is the first in the flow.
 */
export function isFirstPage(pageId: string): boolean {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  return enabledPages[0]?.id === pageId;
}

/**
 * Get all enabled pages.
 */
export function getEnabledPages(): PageConfig[] {
  return PAGE_FLOW.filter(page => page.enabled);
}

/**
 * Get the current page index (0-based) among enabled pages.
 */
export function getCurrentPageIndex(pageId: string): number {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  return enabledPages.findIndex(page => page.id === pageId);
}

/**
 * Get progress information for a page.
 */
export function getProgressInfo(pageId: string): { 
  currentIndex: number; 
  totalPages: number; 
  percentage: number;
  currentPage: PageConfig | null;
} {
  const enabledPages = PAGE_FLOW.filter(page => page.enabled);
  const currentIndex = enabledPages.findIndex(page => page.id === pageId);
  const totalPages = enabledPages.length;
  const percentage = totalPages > 0 ? ((currentIndex + 1) / totalPages) * 100 : 0;
  const currentPage = currentIndex >= 0 ? enabledPages[currentIndex] : null;
  
  return { currentIndex, totalPages, percentage, currentPage };
}
