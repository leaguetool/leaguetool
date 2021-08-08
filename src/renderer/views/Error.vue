<template>
  <div id="error-page">
    <div class="content">
      <div class="error">
        <h2>
          未找到 404
        </h2>
        <p>
          遇到了未知错误，请使用漏洞反馈提交你遇到的问题 :)
        </p>
        <div class="actions">
          <button>
            主页
          </button>
          <button>
            提Bug
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   beforeMount() {
  //     this.$store.dispatch("changeBackgroundState", "ERROR");
  //   }
};
</script>

<style scoped>
#error-page {
  width: 100%;
  height: calc(100% - 130px);
  margin-top: 90px;
  position: relative;
  z-index: 0;
  display: flex;
}

#error-page .content {
  width: 100%;
  height: 100%;
  position: relative;
}

#error-page .content .error {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  border: 1px solid red;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(100, 117, 137, 0.75);
  border-radius: 5px;
  background-color: rgba(5, 12, 20, 0.95);
  padding: 20px;
}

#error-page .content .error h2 {
  margin-top: 0;
  text-align: center;
  font-family: LoLFont2;
}

#error-page .content .error p {
  margin-top: 0;
  text-align: center;
  font-family: LoLFont2;
  font-size: 14px;
}

#error-page .content .error .actions {
  display: flex;
  justify-content: space-between;
  width: 60%;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
}

#error-page .content .error .actions button {
  background: linear-gradient(
    180deg,
    #3c73b4 0%,
    #20477e 45%,
    #1e3e6d 50%,
    #0e284b 100%
  );
  outline: none;
  border: none;
  border-radius: 2px;
  margin-right: 10px;
  padding: 5px 40px;
  border: 1px solid #304b69;
  color: white;
  font-family: LoLFont2;
  transition: filter ease-in-out 200ms;
  cursor: pointer;
}

#error-page .content .error .actions button:hover {
  filter: brightness(1.25);
}
</style>
