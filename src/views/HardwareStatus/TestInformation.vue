<template>
  <b-container fluid>
    <page-title />
    <b-row>
      <b-col>
        <page-section :section-title="$t('pageTest.testInformation')">
          <b-form>
            <b-row>
              <b-col sm="6" md="4" xl="3">
                <dl>
                  <dt>{{ $t('pageTest.status') }}</dt>
                  <dd>
                    <status-icon :status="testInfo?.Status?.Health" />
                    {{ testInfo?.Status?.State }}
                  </dd>
                </dl>
              </b-col>
            </b-row>
          </b-form>
        </page-section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import PageTitle from '@/components/Global/PageTitle';
import PageSection from '@/components/Global/PageSection';
import StatusIcon from '@/components/Global/StatusIcon';
import { mapState } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
  name: 'TestInformation',
  components: {
    PageTitle,
    PageSection,
    StatusIcon,
  },
  setup() {
    const { t } = useI18n();
    return { $t: t };
  },
  computed: {
    ...mapState('test', ['testInfo', 'isLoading']),
  },
  created() {
    this.$store.dispatch('test/getTestInfo');
  },
};
</script> 