<template>
  <b-container fluid="xl">
    <page-title />
    <overview-quick-links class="mb-4" />
    <page-section
      :section-title="$t('pageOverview.systemInformation')"
      class="mb-1"
    >
      <b-card-group deck>
        <overview-server />
        <overview-firmware />
      </b-card-group>
      <b-card-group deck>
        <overview-network />
        <overview-power />
      </b-card-group>
    </page-section>
    <page-section :section-title="$t('pageOverview.statusInformation')">
      <b-card-group deck>
        <overview-events />
        <overview-inventory />
        <overview-dumps v-if="showDumps" />
      </b-card-group>
    </page-section>
  </b-container>
</template>

<script>
import LoadingBarMixin from '@/components/Mixins/LoadingBarMixin';
import OverviewDumps from './OverviewDumps.vue';
import OverviewEvents from './OverviewEvents.vue';
import OverviewFirmware from './OverviewFirmware.vue';
import OverviewInventory from './OverviewInventory.vue';
import OverviewNetwork from './OverviewNetwork';
import OverviewPower from './OverviewPower';
import OverviewQuickLinks from './OverviewQuickLinks';
import OverviewServer from './OverviewServer';
import PageSection from '@/components/Global/PageSection';
import PageTitle from '@/components/Global/PageTitle';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Overview',
  components: {
    OverviewDumps,
    OverviewEvents,
    OverviewFirmware,
    OverviewInventory,
    OverviewNetwork,
    OverviewPower,
    OverviewQuickLinks,
    OverviewServer,
    PageSection,
    PageTitle,
  },
  mixins: [LoadingBarMixin],
  data() {
    return {
      $t: useI18n().t,
      showDumps: process.env.VUE_APP_ENV_NAME === 'ibm',
    };
  },
  created() {
    // 启动加载条
    this.startLoader();

    // 添加调试日志，验证 showDumps 状态
    console.log('showDumps:', this.showDumps);

    // 定义事件和调试日志
    const dumpsPromise = new Promise((resolve) => {
      this.$root.$on('overview-dumps-complete', () => {
        console.log('overview-dumps-complete 触发');
        resolve();
      });
    });

    const eventsPromise = new Promise((resolve) => {
      this.$root.$on('overview-events-complete', () => {
        console.log('overview-events-complete 触发');
        resolve();
      });
    });

    const firmwarePromise = new Promise((resolve) => {
      this.$root.$on('overview-firmware-complete', () => {
        console.log('overview-firmware-complete 触发');
        resolve();
      });
    });

    const inventoryPromise = new Promise((resolve) => {
      this.$root.$on('overview-inventory-complete', () => {
        console.log('overview-inventory-complete 触发');
        resolve();
      });
    });

    const networkPromise = new Promise((resolve) => {
      this.$root.$on('overview-network-complete', () => {
        console.log('overview-network-complete 触发');
        resolve();
      });
    });

    const powerPromise = new Promise((resolve) => {
      this.$root.$on('overview-power-complete', () => {
        console.log('overview-power-complete 触发');
        resolve();
      });
    });

    const quicklinksPromise = new Promise((resolve) => {
      this.$root.$on('overview-quicklinks-complete', () => {
        console.log('overview-quicklinks-complete 触发');
        resolve();
      });
    });

    const serverPromise = new Promise((resolve) => {
      this.$root.$on('overview-server-complete', () => {
        console.log('overview-server-complete 触发');
        resolve();
      });
    });

    // 合并所有 promise
    const promises = [
      eventsPromise,
      firmwarePromise,
      inventoryPromise,
      networkPromise,
      powerPromise,
      quicklinksPromise,
      serverPromise,
    ];

    if (this.showDumps) {
      promises.push(dumpsPromise);
    }

    // 确保所有事件触发后结束加载条
    Promise.all(promises)
      .then(() => {
        console.log('所有事件已触发，结束加载');
      })
      .catch((error) => {
        console.error('事件加载失败:', error);
      })
      .finally(() => {
        this.endLoader();
      });

    // 模拟触发事件以防止阻塞
    this.mockCompleteEvents();
  },
  methods: {
    // 模拟触发事件（仅用于调试）
    mockCompleteEvents() {
      console.log('模拟事件触发');
      setTimeout(() => {
        this.$root.$emit('overview-dumps-complete');
        this.$root.$emit('overview-events-complete');
        this.$root.$emit('overview-firmware-complete');
        this.$root.$emit('overview-inventory-complete');
        this.$root.$emit('overview-network-complete');
        this.$root.$emit('overview-power-complete');
        this.$root.$emit('overview-quicklinks-complete');
        this.$root.$emit('overview-server-complete');
      }, 1000); // 1秒后模拟完成事件
    },
  },
};
</script>
