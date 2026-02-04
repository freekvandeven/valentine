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
 */

export interface PageConfig {
  id: string;
  name: string;
  enabled: boolean;
}

/**
 * Define the order of pages here.
 * The flow will follow this order, skipping any disabled pages.
 */
export const PAGE_FLOW: PageConfig[] = [
  { id: '', name: 'Question', enabled: true },
  { id: 'memory', name: 'Memory Game', enabled: true },
  { id: 'love-letter', name: 'Love Letter', enabled: true },
  { id: 'countdown', name: 'Countdown', enabled: true },
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
