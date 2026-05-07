const CHAT_HISTORY_PREFIX = "bilimly_chat_history";

export function getChatHistoryKey(userId: number | string) {
  return `${CHAT_HISTORY_PREFIX}:${userId}`;
}

export function resetStoredChatHistory(userId?: number | string) {
  if (userId !== undefined) {
    localStorage.removeItem(getChatHistoryKey(userId));
    return;
  }

  Object.keys(localStorage)
    .filter((key) => key.startsWith(`${CHAT_HISTORY_PREFIX}:`))
    .forEach((key) => localStorage.removeItem(key));
}
