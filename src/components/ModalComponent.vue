<template>
  <div>
    <teleport to="body">
      <div class="modal-wrapper" @click="$emit('offModal')">
        <div class="modal-content" @click.stop>
          <slot></slot>
          <button @click="$emit('offModal')" class="modal-close-button">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(black, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  max-height: 80%;
  overflow: auto;
  padding: 30px;
  border-radius: 20px;
}

.modal-close-button {
  background-color: white;
  padding: 5px 15px;
  border-radius: 20px;
  border: 1px solid #673ab7;
  font-size: 18px;
  color: #673ab7;
  margin-top: 15px;
  &:hover {
    border: 1px solid white;
    color: white;
    background-color: #673ab7;
  }
}
</style>
