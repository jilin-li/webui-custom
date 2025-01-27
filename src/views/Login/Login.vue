<template>
  <div>
    <p>正在跳转到主界面...</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    console.log('跳转到主界面...');
    // 确保 $router 存在，然后跳转到主界面
    if (this.$router) {
      this.$router.push('/').catch((err) => {
        console.error('路由跳转失败:', err);
      });
    } else {
      console.error('$router 不存在，无法跳转');
    }
  },
};
</script>

<style scoped>
/* 添加简单的居中样式 */
div {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
</style>
