# Transitions-2 | VNodes

Получить список переданных элементов можно из `this.$slots.default`, в котором хранится список виртуальных узлов VNode.

С помощью метода массива `map` и функции клонирования узлов из исходного кода Vue можно клонировать узлы. Код функции клонирования придётся просто скопировать, а вот класс `VNode` можно получить из прототипа.

```javascript
function cloneVNode(vnode) {
  // Мы не можем импортировать VMode из пакета Vue
  // Он не экспортируется в пакете,
  // а исходники требуют сборки из Flow
  // Но мы можем получить конструктор из прототипа экземпляра
  const VNode = vnode.__proto__.constructor;
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
```

`vnode.data` хранит данные узла, включая статически установленные классы в поле `staticClass`. В этом поле хранится список классов через пробел строкой, как они установлены в HTML атрибуте class.

Требуется проверить, есть ли у узла уже установленные статически классы. Если есть, то добавить новый класс через пробел, иначе присвоить строку с новым классом.
Альтернативно можно работать со свойством `vnode.data.class`, которое хранит привязанные классы.

```javascript
const clonedNode = cloneVNode(vnode);
if (clonedNode.data.staticClass) {
  if (!/\bfade-list-item\b/.test(clonedNode.data.staticClass)) {
    clonedNode.data.staticClass += ' fade-list-item';
  }
} else {
  clonedNode.data.staticClass = 'fade-list-item';
}
return clonedNode;
```

Затем надо cрендарить с помощью render-функции компонент `TransitionGroup` с этим содержимым. В параметрах требуется передать аттрибуты и обработчики событий для реализации `TransparentWrapper` обёртки, а также параметр `name` и класс.

```javascript
render(h) {
  return h(
    'transition-group',
    {
      on: this.$listeners,
      attrs: this.$attrs,
      props: {
        name: 'fade-list',
      },
      class: 'fade-list',
    },
    this.$slots.default.map((vnode) => {
      const clonedNode = cloneVNode(vnode);
      if (clonedNode.data.staticClass) {
        if (!/\bfade-list-item\b/.test(clonedNode.data.staticClass)) {
          clonedNode.data.staticClass += ' fade-list-item';
        }
      } else {
        clonedNode.data.staticClass = 'fade-list-item';
      }
      return clonedNode;
    }),
  );
},
``` 

Остаётся только описать стили. Чтобы они сработали, потребуется использовать `deep` селектор, и почти все правила начинать с `.fade-list >>> `.

```css
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
```
