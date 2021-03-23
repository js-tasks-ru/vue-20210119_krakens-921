<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{
        'image-uploader__preview-loading': isLoading,
      }"
      :style="bgImage"
      @click="clickHandler"
    >
      <span v-if="isLoading">Загрузка...</span>
      <span v-else-if="imageId === null">Загрузить изображение</span>
      <span v-else>Удалить изображение</span>

      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="onFileSelected"
        ref="input"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      default: null,
    },
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    bgImage() {
      return this.imageId === null
        ? ''
        : `--bg-image: url('${ImageService.getImageURL(this.imageId)}')`;
    },
  },

  methods: {
    clickHandler(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$refs.input.value = '';
        this.emitChange();
      }
    },
    emitChange(val = null) {
      this.$emit('change', val);
    },
    async onFileSelected(event) {
      this.isLoading = true;
      const { id } = await ImageService.uploadImage(event.target.files[0]);

      this.emitChange(id);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
