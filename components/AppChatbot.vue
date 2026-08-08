<template>
    <div class="app-chatbot">
        <button
            class="app-chatbot__toggle"
            :class="{ 
                'app-chatbot__toggle--active': isOpen,
                'app-chatbot__toggle--over-contact': isOverContact
            }"
            :aria-label="$t('common.aria.chat')"
            @click="toggleChat"
        >
            <span v-if="!isOpen" class="app-chatbot__toggle__icon">
                <svg width="20"
                     height="20"
                     viewBox="0 0 28 28"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M14 2C7.373 2 2 6.477 2 12c0 2.438.971 4.676 2.656 6.468L2.376 24.48a.5.5 0 00.64.64l6.012-2.28A11.412 11.412 0 0014 22c6.627 0 12-4.477 12-10S20.627 2 14 2z" fill="currentColor"/>
                </svg>
            </span>
            <span v-else class="app-chatbot__toggle__close">
                <svg width="16"
                     height="16"
                     viewBox="0 0 20 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15 5L5 15M5 5l10 10"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                    />
                </svg>
            </span>
        </button>

        <div
            class="app-chatbot__window"
            :class="{ 'app-chatbot__window--open': isOpen }"
        >
            <div class="app-chatbot__window__header">
                <div class="app-chatbot__window__header__info">
                    <div class="app-chatbot__window__header__avatar">
                        <svg width="16"
                             height="16"
                             viewBox="0 0 20 20"
                             fill="none"
                        >
                            <rect width="20"
                                  height="20"
                                  rx="6"
                                  fill="var(--primary)"
                            />
                            <path d="M10 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM5 15c0-2.5 2.24-4.5 5-4.5s5 2 5 4.5"
                                  stroke="var(--bg_color)"
                                  stroke-width="1.2"
                                  fill="none"
                            />
                        </svg>
                    </div>
                    <div>
                        <p class="app-chatbot__window__header__name">{{ $t('chatbot.title') }}</p>
                        <p class="app-chatbot__window__header__status">{{ $t('chatbot.status') }}</p>
                    </div>
                </div>
            </div>

            <div ref="messagesRef" class="app-chatbot__window__messages">
                <div
                    v-for="(msg, idx) in messages"
                    :key="idx"
                    class="app-chatbot__window__message"
                    :class="[
                        `app-chatbot__window__message--${msg.role}`,
                        { 'app-chatbot__window__message--error': msg.isError },
                    ]"
                >
                    <div class="app-chatbot__window__message__bubble">
                        <p v-if="msg.isError" class="app-chatbot__window__message__error-icon">⚠️</p>
                        <p v-if="msg.title" class="app-chatbot__window__message__title">{{ msg.title }}</p>
                        <p v-text="msg.content" /><span v-if="isTyping && idx === messages.length - 1 && msg.content" class="app-chatbot__window__message__cursor"/>
                    </div>
                </div>

                <div v-if="isTyping && !messages[messages.length - 1]?.content" class="app-chatbot__window__message app-chatbot__window__message--bot">
                    <div class="app-chatbot__window__message__bubble app-chatbot__window__message__bubble--typing">
                        <span class="dot"/>
                        <span class="dot"/>
                        <span class="dot"/>
                    </div>
                </div>


            </div>

            <div class="app-chatbot__window__input">
                <input
                    v-model="inputText"
                    type="text"
                    :placeholder="$t('chatbot.placeholder')"
                    @keydown.enter.prevent="sendMessage"
                />
                <button
                    class="app-chatbot__window__input__send"
                    :disabled="!inputText.trim()"
                    @click="sendMessage"
                >
                    <svg width="20"
                         height="20"
                         viewBox="0 0 20 20"
                         fill="none"
                    >
                        <path d="M18 2L9 11M18 2l-6 16-3-7-7-3 16-6z"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from '#imports'
import { chatbotService } from '@/services/chatbot'
const { locale, t } = useI18n()

const isOpen = ref(false)
const isTyping = ref(false)
const inputText = ref('')
const messages = ref([])
const messagesRef = ref(null)
const isOverContact = ref(false)

function checkContactSection() {
    const contact = document.querySelector('#contact')
    if (contact) {
        const rect = contact.getBoundingClientRect()
        isOverContact.value = rect.top < window.innerHeight && rect.bottom > 0
    }
}

onMounted(() => {
    checkContactSection()
    window.addEventListener('scroll', checkContactSection, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkContactSection)
})

const scrollToBottom = async () => {
    await nextTick()
    if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
}

const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value && messages.value.length === 0) {
        startChat()
    }
}

const startChat = () => {
    messages.value.push({
        role: 'bot',
        content: t('chatbot.greeting')
    })
    scrollToBottom()
}

const sendMessage = async () => {
    const text = inputText.value.trim()
    if (!text) return

    messages.value.push({ role: 'user', content: text })
    inputText.value = ''

    const botIdx = messages.value.length
    messages.value.push({ role: 'bot', content: '' })
    isTyping.value = true
    scrollToBottom()

    const answer = await chatbotService.getAnswer(text, t, (partial) => {
        messages.value[botIdx].content = partial
        scrollToBottom()
    })

    if (answer.error) {
        messages.value[botIdx].content = answer.content
        messages.value[botIdx].isError = true
    }

    isTyping.value = false
    scrollToBottom()
}

watch(locale, () => {
    if (isOpen.value) {
        messages.value = []
        startChat()
    }
})
</script>

<style lang="scss" scoped>
.app-chatbot {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1002;
  font-family: $font_secondary;

  @media(max-width: $br_mobile) {
    bottom: 100px;
    right: 16px;
  }

  @media(max-width: $br_smaller) {
    bottom: 90px;
    right: 12px;
  }    &__toggle {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: var(--primary);
    color: var(--pure_black);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(138, 237, 19, 0.3);
    transition: all 0.3s ease;
    z-index: 1003;

    &:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(138, 237, 19, 0.45);
    }

    &--active {
      background: var(--text_color);
      color: var(--bg_color);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      transform: rotate(90deg);

      &:hover {
        transform: rotate(90deg) scale(1.08);
      }
    }

    &--over-contact {
      background: var(--pure_black);
      color: var(--primary);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

      &:hover {
        background: var(--pure_black);
        color: var(--primary);
        box-shadow: 0 6px 28px rgba(0, 0, 0, 0.45);
      }
    }

    &__icon {
      display: flex;
    }

    &__close {
      display: flex;
    }
  }

  &__window {
    position: absolute;
    bottom: 60px;
    right: 0;
    width: 340px;
    height: 480px;
    background: var(--bg_color);
    border: 1px solid var(--text_color_transparent);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(16px) scale(0.95);
    transform-origin: bottom right;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2);

    &--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    &__header {
      padding: 12px 16px;
      background: var(--bg_color);
      border-bottom: 1px solid var(--text_color_transparent);
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      &__avatar {
        width: 28px;
        height: 28px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--text_color_transparent);
      }

      &__name {
        margin: 0;
        font-family: $font_primary;
        font-weight: 600;
        font-size: $size_14px;
        color: var(--text_color);
        line-height: 1.2;
      }

      &__status {
        margin: 0;
        font-size: $size_12px;
        color: var(--primary_dark);
        font-weight: 500;
        line-height: 1.2;
      }
    }

    &__messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      scroll-behavior: smooth;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--text_color_transparent);
        border-radius: 4px;
      }
    }

    &__message {
      display: flex;
      max-width: 85%;

      &--bot {
        align-self: flex-start;
      }

      &--user {
        align-self: flex-end;

        .app-chatbot__window__message__bubble {
          background: var(--primary);
          color: var(--pure_black);
          border-bottom-right-radius: 4px;
        }
      }

      &__bubble {
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--bg_color_transparent);
        border: 1px solid var(--text_color_transparent);
        font-size: $size_12px;
        line-height: 1.5;
        color: var(--text_color);
        backdrop-filter: blur(8px);

        p {
          margin: 0;

          & + p {
            margin-top: 4px;
          }
        }

        &--typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 14px 18px;

          .dot {
            width: 7px;
            height: 7px;
            background: var(--text_color_smooth);
            border-radius: 50%;
            animation: bounce 1.4s infinite both;

            &:nth-child(1) { animation-delay: 0s; }
            &:nth-child(2) { animation-delay: 0.16s; }
            &:nth-child(3) { animation-delay: 0.32s; }
          }
        }
      }

      &--error {
        .app-chatbot__window__message__bubble {
          border-color: var(--color_error, #e74c3c);
          background: color-mix(in srgb, var(--color_error, #e74c3c) 8%, var(--bg_color));
        }
      }

      &__error-icon {
        font-size: $size_16px;
        margin-bottom: 4px;
      }

      &__cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: var(--text_color);
        margin-left: 2px;
        vertical-align: text-bottom;
        animation: blink 0.7s steps(1) infinite;
      }

      &__title {
        font-family: $font_primary;
        font-weight: 600;
        font-size: $size_12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--primary_dark);
        margin-bottom: 4px !important;
      }
    }

    &__input {
      padding: 8px 12px;
      border-top: 1px solid var(--text_color_transparent);
      display: flex;
      gap: 6px;
      background: var(--bg_color);

      input {
        flex: 1;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: $size_12px;
        border: 1px solid var(--text_color_transparent);
        background: var(--bg_color_transparent);
        color: var(--text_color);
        font-size: $size_14px;
        font-family: $font_secondary;
        outline: none;
        transition: $transition_default;

        &::placeholder {
          color: var(--text_color_smooth);
        }

        &:focus {
          border-color: var(--primary);
        }
      }

      &__send {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: var(--primary);
        color: var(--pure_black);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;

        &:hover:not(:disabled) {
          transform: scale(1.08);
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
    }

    @media(max-width: $br_mobile) {
      width: calc(100vw - 32px);
      height: 60vh;
      max-height: 480px;
      right: -8px;
    }

    @media(max-width: $br_smaller) {
      width: calc(100vw - 24px);
      right: -6px;
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
