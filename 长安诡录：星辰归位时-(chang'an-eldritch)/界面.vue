<template>
  <div class="game-container">
    <!-- Background Ambience -->
    <div class="background-ambience">
      <div class="bg-blur bg-blur-1"></div>
      <div class="bg-icon">
        <Icons name="tentacle" />
      </div>
    </div>

    <!-- Sidebar - Stats & Portrait -->
    <aside class="sidebar">
      <div class="header">
        <h1 class="title">长安诡录</h1>
        <p class="subtitle">星辰归位时</p>
      </div>

      <div class="sidebar-content">
        <!-- Character Portrait -->
        <div class="portrait">
          <img 
            src="https://picsum.photos/seed/cthulhu/300/400" 
            alt="Investigator" 
            class="portrait-img"
          />
          <div class="portrait-info">
            <p class="portrait-name">{{ investigator.name }}</p>
            <p class="portrait-role">{{ investigator.role }}</p>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="stats">
          <div class="stat-item">
            <div class="stat-header">
              <span class="stat-label">
                <Icons name="health" />
                <span> 体力</span>
              </span>
              <span class="stat-value">{{ investigator.health }} / {{ investigator.maxHealth }}</span>
            </div>
            <div class="stat-bar stat-bar-health">
              <div 
                class="stat-bar-fill" 
                :style="{ width: `${(investigator.health/investigator.maxHealth)*100}%` }"
              ></div>
            </div>
          </div>

          <div class="stat-item">
            <div class="stat-header">
              <span class="stat-label">
                <Icons name="sanity" />
                <span> 理智</span>
              </span>
              <span class="stat-value">{{ investigator.sanity }} / {{ investigator.maxSanity }}</span>
            </div>
            <div class="stat-bar stat-bar-sanity">
              <div 
                class="stat-bar-fill" 
                :style="{ width: `${(investigator.sanity/investigator.maxSanity)*100}%` }"
              ></div>
            </div>
          </div>

          <div class="clue-section">
            <div class="clue-header">
              <Icons name="clue" />
              <span class="clue-label">线索</span>
            </div>
            <span class="clue-value">{{ investigator.clues }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="nav-buttons">
        <button 
          @click="activeModal = ModalType.INVENTORY" 
          class="nav-button"
        >
          <Icons name="book" />
          <span>行囊</span>
        </button>
        <button 
          @click="activeModal = ModalType.MAP" 
          class="nav-button"
        >
          <Icons name="map" />
          <span>舆图</span>
        </button>
        <button 
          @click="activeModal = ModalType.BESTIARY" 
          class="nav-button"
        >
          <Icons name="tentacle" />
          <span>异志</span>
        </button>
        <button 
          @click="activeModal = ModalType.JOURNAL" 
          class="nav-button"
        >
          <Icons name="book" />
          <span>日志</span>
        </button>
      </div>
    </aside>

    <!-- Main Gameplay Area -->
    <main class="main-area">
      <!-- Story Console -->
      <div 
        ref="scrollRef"
        class="story-console"
      >
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.role === 'user' ? 'message-user' : 'message-model']"
        >
          <div :class="['message-content', message.role === 'user' ? 'message-content-user' : 'message-content-model']">
            <p class="message-text">{{ message.content }}</p>
          </div>
        </div>
        <div v-if="isLoading" class="message message-model">
          <div class="message-content message-content-model">
            <p class="message-text loading-text">黑暗中的低语正在凝聚成形...</p>
          </div>
        </div>
      </div>

      <!-- Action Controls -->
      <div class="action-controls">
        <div class="cards-container">
          <GameCard 
            v-for="card in cards" 
            :key="card.id"
            :card="card" 
            @use="useCard"
          />
          <p v-if="cards.length === 0" class="empty-cards">行囊已空，唯余恐惧...</p>
        </div>

        <div class="input-container">
          <input 
            type="text" 
            v-model="inputText"
            @keydown.enter="handleSend"
            placeholder="在黑暗中作出你的抉择..."
            class="game-input"
          />
          <button @click="handleSend" class="action-button">行动</button>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <Modal 
      :is-open="activeModal === ModalType.INVENTORY" 
      @close="activeModal = ModalType.NONE" 
      title="行囊物品"
    >
      <div class="modal-grid">
        <div class="modal-item">
          <h3>乾坤袋</h3>
          <p>一个似乎能装下无限恐惧的旧麻袋。</p>
        </div>
        <div class="modal-item">
          <h3>断掉的香烛</h3>
          <p>曾用于祈求安宁，现在只剩下被邪恶灼烧的痕迹。</p>
        </div>
      </div>
    </Modal>

    <Modal 
      :is-open="activeModal === ModalType.MAP" 
      @close="activeModal = ModalType.NONE" 
      title="长安舆图"
    >
      <div class="map-container">
        <img 
          src="https://picsum.photos/seed/map/800/800" 
          class="map-image" 
          alt="Chang'an Map" 
        />
        <div class="map-overlay">
          <div class="map-message">
            <p class="map-title">此处的空间已被扭曲</p>
            <p class="map-subtitle">只有在"门"打开时，真正的舆图才会显现。</p>
          </div>
        </div>
      </div>
    </Modal>

    <Modal 
      :is-open="activeModal === ModalType.BESTIARY" 
      @close="activeModal = ModalType.NONE" 
      title="长安异志"
    >
      <div class="bestiary-list">
        <div class="bestiary-item">
          <div class="bestiary-icon bestiary-icon-1"></div>
          <div>
            <h4>【不可描述之影】</h4>
            <p>徘徊在平康坊深巷中的存在，没有人能活着描述它的外貌。</p>
          </div>
        </div>
        <div class="bestiary-item">
          <div class="bestiary-icon bestiary-icon-2"></div>
          <div>
            <h4>【深潜之囚】</h4>
            <p>据传被囚禁在曲江池底的古老者随从，每逢暴雨便会发出哀嚎。</p>
          </div>
        </div>
      </div>
    </Modal>

    <Modal 
      :is-open="activeModal === ModalType.JOURNAL" 
      @close="activeModal = ModalType.NONE" 
      title="探查日志"
    >
      <div class="journal-list">
        <p class="journal-entry">"天宝三载，冬。西市突现血雨，圣上闭门谢客。我怀疑大明宫已被掉包..."</p>
        <p class="journal-entry">"线索指向了慈恩寺的塔顶。每当午夜，那里的钟声似乎在回应深渊。"</p>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import GameCard from './components/GameCard.vue';
import Modal from './components/Modal.vue';
import Icons from './components/Icons.vue';
import { INITIAL_CARDS, SYSTEM_PROMPT } from './constants';
import { ModalType } from './types';
import type { Message, Investigator, Card } from './types';

const messages = ref<Message[]>([
  { 
    role: 'model', 
    content: '（伴随着远处寺庙沉重的钟声，你睁开了眼。长安城的宵禁早已开始，但此刻的西市却弥漫着一股令人作呕的腥味。天空中的月亮呈现出诡异的淡紫色，街道尽头的阴影中似乎有某种粘稠的东西在蠕动...）\n\n"陆离，你终于醒了，"一个低沉的声音在你耳边响起，"星星已经就位，我们没时间了。"' 
  }
]);

const investigator = ref<Investigator>({
  name: '陆离',
  role: '不良人司直',
  sanity: 65,
  maxSanity: 100,
  health: 80,
  maxHealth: 100,
  clues: 2
});

const cards = ref<Card[]>(INITIAL_CARDS);
const inputText = ref('');
const isLoading = ref(false);
const activeModal = ref<ModalType>(ModalType.NONE);
const scrollRef = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (scrollRef.value) {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

const handleSend = async (overrideText?: string) => {
  const text = overrideText || inputText.value;
  if (!text.trim() || isLoading.value) return;

  const newMessage: Message = { role: 'user', content: text };
  messages.value.push(newMessage);
  inputText.value = '';
  isLoading.value = true;

  try {
    // 使用酒馆的generate函数替代Gemini API
    // 注意：generate函数会自动使用当前聊天的历史记录
    const response = await generate({
      user_input: text,
      overrides: {
        char_description: SYSTEM_PROMPT
      },
      should_stream: true
    });

    messages.value.push({ role: 'model', content: response });
    
    // 监听流式传输
    eventOn(iframe_events.STREAM_TOKEN_RECEIVED_FULLY, (fullText: string) => {
      const lastMessage = messages.value[messages.value.length - 1];
      if (lastMessage && lastMessage.role === 'model') {
        lastMessage.content = fullText;
      }
    });

    // Randomly simulate stat changes
    if (text.includes('调查') || text.includes('查看')) {
      investigator.value.clues += 1;
      investigator.value.sanity = Math.max(0, investigator.value.sanity - 2);
    }
  } catch (error) {
    console.error("Game interaction failed", error);
    messages.value.push({ 
      role: 'model', 
      content: '黑暗吞噬了所有的回应...' 
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

const useCard = (id: string) => {
  const card = cards.value.find(c => c.id === id);
  if (!card) return;
  
  const actionText = `【使用卡牌：${card.name}】 ${card.description}`;
  handleSend(actionText);
  cards.value = cards.value.filter(c => c.id !== id);
};
</script>

<style lang="scss" scoped>
// 样式在styles.css中定义
</style>
