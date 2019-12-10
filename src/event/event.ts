import { Ref, isRef, onMounted, onUnmounted } from "@vue/composition-api";
import { RefTyped , wrap, RefElement} from "../utils";

export type RemoveEventFunction = () => void;

export function useEvent<K extends keyof WindowEventMap>(
  el: RefTyped<Window>,
  name: K,
  listener: (this: Document, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): RemoveEventFunction;
export function useEvent<K extends keyof DocumentEventMap>(
  el: RefElement,
  name: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): RemoveEventFunction;
export function useEvent(
  el: any,
  name: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): RemoveEventFunction {
  const element = wrap(el as Element);

  const remove = () => element.value!.removeEventListener(name, listener);

  onMounted(() => element.value!.addEventListener(name, listener, options));
  onUnmounted(remove);

  return remove;
}