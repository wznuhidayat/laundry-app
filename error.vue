<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const router = useRouter();
const is404 = computed(() => props.error?.statusCode === 404);
const statusLabel = computed(() => props.error?.statusCode ?? 500);
const title = computed(() =>
  is404.value ? 'Page not found' : 'Something went wrong',
);
const description = computed(() => {
  if (is404.value) {
    return `The link you opened doesn't match any page in the Laundry App. Double-check the URL or jump back into a known workspace.`;
  }

  return props.error?.statusMessage || 'Please try again in a moment.';
});

const goHome = () => {
  clearError({ redirect: is404.value ? '/dashboard' : '/' });
};

const goBack = () => {
  clearError();

  if (process.client && window.history.length > 1) {
    router.back();
  } else {
    goHome();
  }
};
</script>

<template>
  <div data-theme="nord" class="min-h-screen bg-base-200">
    <div class="flex min-h-screen flex-col items-center justify-center p-6">
      <div class="hero w-full max-w-2xl">
        <div class="hero-content w-full rounded-2xl bg-base-100 p-10 text-center shadow-2xl">
          <div class="space-y-6">
            <div class="flex flex-col items-center space-y-2">
              <span class="badge badge-lg badge-primary font-mono text-lg">
                {{ statusLabel }}
              </span>
              <p class="text-sm text-base-content/70">
                {{ props.error?.url || 'Requested route' }}
              </p>
            </div>
            <div class="space-y-3">
              <h1 class="text-3xl font-semibold md:text-4xl">
                {{ title }}
              </h1>
              <p class="text-base-content/80">
                {{ description }}
              </p>
            </div>
            <div class="join flex flex-col gap-3 md:flex-row">
              <button class="btn btn-primary join-item" type="button" @click="goHome">
                Go to dashboard
              </button>
              <button class="btn btn-outline join-item" type="button" @click="goBack">
                Try previous page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
