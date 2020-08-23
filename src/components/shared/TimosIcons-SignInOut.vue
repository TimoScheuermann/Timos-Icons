<template>
  <tc-button :name="text" variant="filled" :icon="icon" @click="clicked" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { logout, login } from '@/utils/functions';

@Component
export default class TimosIconsSignInOut extends Vue {
  get signedIn(): boolean {
    return this.$store.getters.valid;
  }

  get text(): string {
    return `Sign ${this.signedIn ? 'out' : 'in'}`;
  }

  get icon(): string {
    return `log${this.signedIn ? 'out' : 'in'}`;
  }

  clicked(): void {
    if (this.signedIn) {
      logout();
    } else {
      login();
    }
  }
}
</script>

<style lang="scss" scoped></style>
