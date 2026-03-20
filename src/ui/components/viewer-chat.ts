import { el } from '../../utils';
import { getChatMessagesForTrigger } from '../../data/viewer-chat';
import type { ViewerChatTrigger } from '../../types';

let chatContainer: HTMLElement | null = null;
let chatVisible = true;
let messageTimeout: ReturnType<typeof setTimeout> | null = null;

export function initViewerChat(): void {
  if (chatContainer) return;

  chatContainer = el('div', 'viewer-chat');
  chatContainer.id = 'viewer-chat';

  const header = el('div', 'viewer-chat-header');
  header.appendChild(el('span', 'viewer-chat-title', 'CHAT'));
  const toggleBtn = el('button', 'viewer-chat-toggle', '\u2715');
  toggleBtn.addEventListener('click', () => {
    chatVisible = !chatVisible;
    if (chatContainer) {
      chatContainer.classList.toggle('viewer-chat-hidden', !chatVisible);
      toggleBtn.textContent = chatVisible ? '\u2715' : '\uD83D\uDCAC';
    }
  });
  header.appendChild(toggleBtn);
  chatContainer.appendChild(header);

  const messages = el('div', 'viewer-chat-messages');
  messages.id = 'viewer-chat-messages';
  chatContainer.appendChild(messages);

  document.body.appendChild(chatContainer);
}

export function destroyViewerChat(): void {
  if (chatContainer) {
    chatContainer.remove();
    chatContainer = null;
  }
  if (messageTimeout) {
    clearTimeout(messageTimeout);
    messageTimeout = null;
  }
}

export function triggerViewerChat(trigger: ViewerChatTrigger | string): void {
  if (!chatContainer || !chatVisible) return;

  const messages = getChatMessagesForTrigger(trigger);
  if (messages.length === 0) return;

  const messagesContainer = document.getElementById('viewer-chat-messages');
  if (!messagesContainer) return;

  // Show 2-4 random messages with staggered timing
  const count = Math.min(2 + Math.floor(Math.random() * 3), messages.length);
  const shuffled = [...messages].sort(() => Math.random() - 0.5).slice(0, count);

  shuffled.forEach((msg, i) => {
    setTimeout(() => {
      addChatMessage(messagesContainer, msg);
    }, i * 300 + Math.random() * 200);
  });
}

function addChatMessage(container: HTMLElement, text: string): void {
  const usernames = [
    'xX_BasementDweller_Xx', 'StairwellFan42', 'elevator_hater', 'lobby_lurker',
    'CatSimp2000', 'DiceGoblin69', 'FloorVibes', 'TrapSurvivor', 'OfficeCrawler',
    'CoffeeMugHero', 'ViewerBot9000', 'NotARat', 'JanitorMain', 'DescendOrDie',
    'PaperCutPanic', 'MopGod', 'cubicle_warrior', 'break_room_bandit',
  ];
  const username = usernames[Math.floor(Math.random() * usernames.length)];
  const colors = ['#c44', '#4a7c59', '#4a8cc4', '#d4a843', '#9b59b6', '#4a9c8c'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const msgEl = el('div', 'viewer-chat-msg');
  const nameEl = el('span', 'viewer-chat-name');
  nameEl.style.color = color;
  nameEl.textContent = username + ':';
  msgEl.appendChild(nameEl);
  msgEl.appendChild(document.createTextNode(' ' + text));

  container.appendChild(msgEl);

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Fade out after 8 seconds
  setTimeout(() => {
    msgEl.classList.add('viewer-chat-msg-fade');
    setTimeout(() => msgEl.remove(), 500);
  }, 8000);

  // Keep max 20 messages
  while (container.children.length > 20) {
    container.removeChild(container.firstChild!);
  }
}
