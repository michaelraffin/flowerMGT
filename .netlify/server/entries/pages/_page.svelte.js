import { R as setContext, T as getContext, Q as push, Y as fallback, Z as slot, W as store_get, X as unsubscribe_stores, _ as bind_props, S as pop, $ as rest_props, a0 as spread_attributes, a1 as sanitize_props, V as escape_html, a2 as copy_payload, a3 as assign_payload, a4 as spread_props, a5 as invalid_default_snippet, a6 as ensure_array_like, a7 as attr } from "../../chunks/index.js";
import { n as noop, i as isHTMLElement, t as tick, a as isFunction, b as isElement, l as last, u as useEscapeKeydown, e as executeCallbacks, c as addEventListener, d as toWritableStores, o as omit, f as overridable, w as withGet, g as generateIds, s as safeOnMount, m as makeElement, h as isBrowser, j as styleToString, p as portalAttr, k as effect, q as addMeltEventListener, r as kbd, v as createElHelpers, x as getDefaultDate, y as createFormatter, z as dateStore, A as createMonths, B as isBefore, C as isAfter, D as getAnnouncer, E as toDate, F as isBetweenInclusive, G as areAllDaysBetweenValid, H as parseStringToDateValue, I as isCalendarCell, J as getSelectableCells, K as isValidIndex, L as setPlaceholderToNodeValue, M as createBitAttrs, N as removeUndefined, O as getOptionUpdater, P as cn, Q as buttonVariants, R as Chevron_right, S as Chevron_left, T as flyAndScale, U as products, V as Label, W as Skeleton, X as Table, Y as Table_caption, Z as Table_header, _ as Table_row, $ as Table_head, a0 as Table_body, a1 as Table_cell, a2 as Badge, a3 as Button, a4 as Toaster } from "../../chunks/Toaster.js";
import { isSameMonth, isSameDay, isToday, getLocalTimeZone, today } from "@internationalized/date";
import "dequal";
import { d as derived, a as readonly, w as writable } from "../../chunks/index2.js";
import "clsx";
import moment from "moment";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { createFocusTrap as createFocusTrap$1 } from "focus-trap";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function update(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    callbacks.push(useFocusTrap(popperElement).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsub = noop;
  let unsubClick = noop;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update(config2) {
    unsub();
    unsubClick();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e);
      }
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        unsubClick();
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2);
          }
          resetPointerState();
        };
        if (e.pointerType === "touch") {
          unsubClick = addEventListener(documentObj, "click", handler, {
            capture: true,
            once: true
          });
          return;
        }
        handler(e);
      };
      unsub = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "mousedown", onPointerDown, true), addEventListener(documentObj, "mouseup", onMouseUp, true), addEventListener(documentObj, "touchstart", onPointerDown, true), addEventListener(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsub();
      unsubClick();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
const defaults$1 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const { name: name$1 } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults$1, ...args };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  safeOnMount(() => {
    activeTrigger.set(document.getElementById(ids.trigger.get()));
  });
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(ids.trigger.get());
    handleFocus({ prop: closeFocus.get(), defaultEl: triggerEl });
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = makeElement(name$1("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              focusTrap: $disableFocusTrap ? null : {
                returnFocusOnDeactivate: false,
                clickOutsideDeactivates: $closeOnOutsideClick,
                allowOutsideClick: true,
                escapeDeactivates: $closeOnEscape
              },
              modal: {
                shouldCloseOnInteractOutside,
                onClose: handleClose,
                open: $isVisible,
                closeOnInteractOutside: $closeOnOutsideClick
              },
              escapeKeydown: $closeOnEscape ? {
                handler: () => {
                  handleClose();
                }
              } : null,
              portal: getPortalDestination(node, $portal)
            }
          }).destroy;
        });
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev) => {
      return !prev;
    });
    if (triggerEl && triggerEl !== activeTrigger.get()) {
      activeTrigger.set(triggerEl);
    }
  }
  function shouldCloseOnInteractOutside(e) {
    onOutsideClick.get()?.(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return false;
    }
    return true;
  }
  const trigger = makeElement(name$1("trigger"), {
    stores: [isVisible, ids.content, ids.trigger],
    returned: ([$isVisible, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $isVisible ? "true" : "false",
        "data-state": stateAttr($isVisible),
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name$1("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      let unsubDerived = noop;
      let unsubPortal = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      unsubDerived = effect([portal], ([$portal]) => {
        unsubPortal();
        if ($portal === null)
          return;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return;
        unsubPortal = usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubDerived();
          unsubPortal();
        }
      };
    }
  });
  const arrow2 = makeElement(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = makeElement(name$1("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick().then(() => {
          const triggerEl2 = document.getElementById(ids.trigger.get());
          if (!isHTMLElement(triggerEl2))
            return;
          activeTrigger.set(triggerEl2);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
      const triggerEl = $activeTrigger ?? document.getElementById(ids.trigger.get());
      handleFocus({ prop: openFocus.get(), defaultEl: triggerEl });
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close,
      overlay
    },
    states: {
      open
    },
    options
  };
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name } = createElHelpers("calendar");
const rangeCalendarIdParts = ["calendar", "accessibleHeading"];
function createRangeCalendar(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, disabled, readonly: readonly2, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(rangeCalendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder
  });
  const formatter = createFormatter(locale.get());
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  if (!value.get()) {
    value.set(withDefaults.defaultValue);
  }
  const startValue = withGet(writable(value.get().start ?? withDefaults.defaultValue?.start));
  const endValue = withGet(writable(value.get().end ?? withDefaults.defaultValue?.end));
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const focusedValue = withGet(writable(null));
  const lastPressedDateValue = withGet(writable(null));
  const months = withGet(writable(createMonths({
    dateObj: placeholder.get(),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  })));
  const visibleMonths = withGet(derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  }));
  const isOutsideVisibleMonths = withGet(derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  }));
  const isDateDisabled = withGet(derived([options.isDateDisabled, minValue, maxValue], ([$isDateDisabled, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled?.(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      return false;
    };
  }));
  const isDateUnavailable = withGet(derived([options.isDateUnavailable], ([$isDateUnavailable]) => {
    return (date) => {
      if ($isDateUnavailable?.(date))
        return true;
      return false;
    };
  }));
  const isStartInvalid = derived([startValue, isDateUnavailable, isDateDisabled], ([$startValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$startValue)
      return false;
    return $isDateUnavailable($startValue) || $isDateDisabled($startValue);
  });
  const isEndInvalid = derived([endValue, isDateUnavailable, isDateDisabled], ([$endValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$endValue)
      return false;
    return $isDateUnavailable($endValue) || $isDateDisabled($endValue);
  });
  const isInvalid = derived([startValue, endValue, isEndInvalid, isStartInvalid], ([$startValue, $endValue, $isEndInvalid, $isStartInvalid]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if ($endValue && $startValue && isBefore($endValue, $startValue)) {
      return true;
    }
    return false;
  });
  const isNextButtonDisabled = withGet.derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = withGet.derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  let announcer = getAnnouncer();
  const headingValue = withGet.derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = toDate($months[0].value);
      return `${formatter.fullMonthAndYear(month)}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = withGet.derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = makeElement(name(), {
    stores: [fullCalendarLabel, isInvalid, ids.calendar, disabled, readonly2],
    returned: ([$fullCalendarLabel, $isInvalid, $calendarId, $disabled, $readonly]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, fullCalendarLabel.get());
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = makeElement(name("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = makeElement(name("grid"), {
    stores: [readonly2, disabled],
    returned: ([$readonly, $disabled]) => ({
      tabindex: -1,
      role: "grid",
      "aria-readonly": $readonly ? "true" : void 0,
      "aria-disabled": $disabled ? "true" : void 0,
      "data-readonly": $readonly ? "" : void 0,
      "data-disabled": $disabled ? "" : void 0
    })
  });
  const prevButton = makeElement(name("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = makeElement(name("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isSelectionStart = derived([startValue], ([$startValue]) => {
    return (date) => {
      if (!$startValue)
        return false;
      return isSameDay($startValue, date);
    };
  });
  const isSelectionEnd = derived([endValue], ([$endValue]) => {
    return (date) => {
      if (!$endValue)
        return false;
      return isSameDay($endValue, date);
    };
  });
  const isSelected = derived([startValue, endValue], ([$startValue, $endValue]) => {
    return (date) => {
      if ($startValue && isSameDay($startValue, date))
        return true;
      if ($endValue && isSameDay($endValue, date))
        return true;
      if ($endValue && $startValue) {
        return isBetweenInclusive(date, $startValue, $endValue);
      }
      return false;
    };
  });
  const highlightedRange = withGet.derived([startValue, endValue, focusedValue, isDateDisabled, isDateUnavailable], ([$startValue, $endValue, $focusedValue, $isDateDisabled, $isDateUnavailable]) => {
    if ($startValue && $endValue)
      return null;
    if (!$startValue || !$focusedValue)
      return null;
    const isStartBeforeFocused = isBefore($startValue, $focusedValue);
    const start = isStartBeforeFocused ? $startValue : $focusedValue;
    const end = isStartBeforeFocused ? $focusedValue : $startValue;
    if (isSameDay(start.add({ days: 1 }), end)) {
      return {
        start,
        end
      };
    }
    const isValid = areAllDaysBetweenValid(start, end, $isDateUnavailable, $isDateDisabled);
    if (isValid) {
      return {
        start,
        end
      };
    }
    return null;
  });
  const cell = makeElement(name("cell"), {
    stores: [
      isSelected,
      isSelectionEnd,
      isSelectionStart,
      highlightedRange,
      isDateDisabled,
      isDateUnavailable,
      placeholder,
      isOutsideVisibleMonths
    ],
    returned: ([$isSelected, $isSelectionEnd, $isSelectionStart, $highlightedRange, $isDateDisabled, $isDateUnavailable, $placeholder, $isOutsideVisibleMonths]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled(cellValue);
        const isUnavailable = $isDateUnavailable(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isSelectedDate = $isSelected(cellValue);
        const isSelectionStart2 = $isSelectionStart(cellValue);
        const isSelectionEnd2 = $isSelectionEnd(cellValue);
        const isHighlighted = $highlightedRange ? isBetweenInclusive(cellValue, $highlightedRange.start, $highlightedRange.end) : false;
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-selection-start": isSelectionStart2 ? true : void 0,
          "data-selection-end": isSelectionEnd2 ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          "data-highlighted": isHighlighted ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(e, parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "mouseenter", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "focusin", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder], ([$placeholder]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = visibleMonths.get();
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const $weekStartsOn = weekStartsOn.get();
    const $locale = locale.get();
    const $fixedWeeks = fixedWeeks.get();
    const $numberOfMonths = numberOfMonths.get();
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    const $placeholder = placeholder.get();
    if (!isBrowser || !$placeholder)
      return;
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(ids.accessibleHeading.get());
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([startValue], ([$startValue]) => {
    if ($startValue && placeholder.get() !== $startValue) {
      placeholder.set($startValue);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = ids.accessibleHeading.get();
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    if (month < 0 || month > 11)
      throw new Error("Month must be between 0 and 11");
    placeholder.setDate({ month });
  }
  function handleCellClick(e, date) {
    const $isDateDisabled = isDateDisabled.get();
    const $isDateUnavailable = isDateUnavailable.get();
    if ($isDateDisabled(date) || $isDateUnavailable(date))
      return;
    const $lastPressedDate = lastPressedDateValue.get();
    lastPressedDateValue.set(date);
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    const $highlightedRange = highlightedRange.get();
    if ($startValue && $highlightedRange === null) {
      if (isSameDay($startValue, date) && !preventDeselect.get() && !$endValue) {
        startValue.set(void 0);
        placeholder.set(date);
        announcer.announce("Selected date is now empty.", "polite");
        return;
      } else if (!$endValue) {
        e.preventDefault();
        if ($lastPressedDate && isSameDay($lastPressedDate, date)) {
          startValue.set(date);
          announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        }
        return;
      }
    }
    if ($startValue && $endValue && isSameDay($endValue, date) && !preventDeselect.get()) {
      startValue.set(void 0);
      endValue.set(void 0);
      placeholder.set(date);
      announcer.announce("Selected date is now empty.", "polite");
      return;
    }
    if (!$startValue) {
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if (!$endValue) {
      endValue.update(() => {
        announcer.announce(`Selected Dates: ${formatter.selectedDate($startValue, false)} to ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if ($endValue && $startValue) {
      endValue.set(void 0);
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(e, parseStringToDateValue(cellValue, placeholder.get()));
    }
  }
  function shiftFocus(node, add) {
    const $calendarId = ids.calendar.get();
    const candidateCells = getSelectableCells($calendarId);
    if (!candidateCells.length) {
      return;
    }
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (isPrevButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (isNextButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue], ([$isDateDisabled, $placeholder, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  effect([value], ([$value]) => {
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = value.get();
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        if (isBefore($endValue, $startValue)) {
          return {
            start: $endValue,
            end: $startValue
          };
        } else {
          return {
            start: $startValue,
            end: $endValue
          };
        }
      });
    } else if ($value && $value.start && $value.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      weekdays,
      headingValue,
      value,
      startValue,
      endValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateUnavailable
    },
    options,
    ids
  };
}
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getPopoverData() {
  const NAME = "popover";
  const PARTS = ["arrow", "close", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getPopoverData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const popover = {
    ...createPopover({
      positioning: {
        placement: "bottom",
        gutter: 0
      },
      ...removeUndefined(props),
      forceVisible: true
    }),
    getAttrs
  };
  setContext(NAME, popover);
  return {
    ...popover,
    updateOption: getOptionUpdater(popover.options)
  };
}
function getCtx$1() {
  const { NAME } = getPopoverData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$1();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function Popover($$payload, $$props) {
  push();
  var $$store_subs;
  let disableFocusTrap = fallback($$props["disableFocusTrap"], () => void 0, true);
  let closeOnEscape = fallback($$props["closeOnEscape"], () => void 0, true);
  let closeOnOutsideClick = fallback($$props["closeOnOutsideClick"], () => void 0, true);
  let preventScroll = fallback($$props["preventScroll"], () => void 0, true);
  let portal = fallback($$props["portal"], () => void 0, true);
  let open = fallback($$props["open"], () => void 0, true);
  let onOpenChange = fallback($$props["onOpenChange"], () => void 0, true);
  let openFocus = fallback($$props["openFocus"], () => void 0, true);
  let closeFocus = fallback($$props["closeFocus"], () => void 0, true);
  let onOutsideClick = fallback($$props["onOutsideClick"], () => void 0, true);
  const {
    updateOption,
    states: { open: localOpen },
    ids
  } = setCtx$1({
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("disableFocusTrap", disableFocusTrap);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("preventScroll", preventScroll);
  updateOption("portal", portal);
  updateOption("openFocus", openFocus);
  updateOption("closeFocus", closeFocus);
  updateOption("onOutsideClick", onOutsideClick);
  $$payload.out += `<!---->`;
  slot(
    $$payload,
    $$props,
    "default",
    {
      ids: store_get($$store_subs ??= {}, "$idValues", idValues)
    },
    null
  );
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    open,
    onOpenChange,
    openFocus,
    closeFocus,
    onOutsideClick
  });
  pop();
}
function Popover_content$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = fallback($$props["transition"], () => void 0, true);
  let transitionConfig = fallback($$props["transitionConfig"], () => void 0, true);
  let inTransition = fallback($$props["inTransition"], () => void 0, true);
  let inTransitionConfig = fallback($$props["inTransitionConfig"], () => void 0, true);
  let outTransition = fallback($$props["outTransition"], () => void 0, true);
  let outTransitionConfig = fallback($$props["outTransitionConfig"], () => void 0, true);
  let asChild = fallback($$props["asChild"], false);
  let id = fallback($$props["id"], () => void 0, true);
  let side = fallback($$props["side"], "bottom");
  let align = fallback($$props["align"], "center");
  let sideOffset = fallback($$props["sideOffset"], 0);
  let alignOffset = fallback($$props["alignOffset"], 0);
  let collisionPadding = fallback($$props["collisionPadding"], 8);
  let avoidCollisions = fallback($$props["avoidCollisions"], true);
  let collisionBoundary = fallback($$props["collisionBoundary"], () => void 0, true);
  let sameWidth = fallback($$props["sameWidth"], false);
  let fitViewport = fallback($$props["fitViewport"], false);
  let strategy = fallback($$props["strategy"], "absolute");
  let overlap = fallback($$props["overlap"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs
  } = getCtx$1();
  const attrs = getAttrs("content");
  if (id) {
    ids.content.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$content", content);
  Object.assign(builder, attrs);
  if (store_get($$store_subs ??= {}, "$open", open)) {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  if (asChild && store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    if (transition && store_get($$store_subs ??= {}, "$open", open)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
      slot($$payload, $$props, "default", { builder }, null);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$open", open)) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
        slot($$payload, $$props, "default", { builder }, null);
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (inTransition && store_get($$store_subs ??= {}, "$open", open)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
          slot($$payload, $$props, "default", { builder }, null);
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (outTransition && store_get($$store_subs ??= {}, "$open", open)) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
            slot($$payload, $$props, "default", { builder }, null);
            $$payload.out += `<!----></div>`;
          } else {
            $$payload.out += "<!--[!-->";
            if (store_get($$store_subs ??= {}, "$open", open)) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
              slot($$payload, $$props, "default", { builder }, null);
              $$payload.out += `<!----></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    id,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    sameWidth,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Popover_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = fallback($$props["asChild"], false);
  let id = fallback($$props["id"], () => void 0, true);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { trigger },
    states: { open },
    ids,
    getAttrs
  } = getCtx$1();
  const bitsAttrs = getAttrs("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  attrs = {
    ...bitsAttrs,
    "aria-controls": store_get($$store_subs ??= {}, "$open", open) ? ids.content : void 0
  };
  builder = store_get($$store_subs ??= {}, "$trigger", trigger);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...builder, type: "button", ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, id, el });
  pop();
}
function getRangeCalendarData() {
  const NAME = "calendar";
  const PARTS = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME, PARTS };
}
function setCtx(props) {
  const { NAME, PARTS } = getRangeCalendarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const rangeCalendar = { ...createRangeCalendar(removeUndefined(props)), getAttrs };
  setContext(NAME, rangeCalendar);
  return {
    ...rangeCalendar,
    updateOption: getOptionUpdater(rangeCalendar.options)
  };
}
function getCtx() {
  const { NAME } = getRangeCalendarData();
  return getContext(NAME);
}
function Range_calendar$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "placeholder",
    "onPlaceholderChange",
    "value",
    "onValueChange",
    "preventDeselect",
    "minValue",
    "maxValue",
    "pagedNavigation",
    "weekStartsOn",
    "locale",
    "isDateUnavailable",
    "isDateDisabled",
    "disabled",
    "readonly",
    "fixedWeeks",
    "calendarLabel",
    "asChild",
    "id",
    "weekdayFormat",
    "initialFocus",
    "startValue",
    "numberOfMonths",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let placeholder = fallback($$props["placeholder"], () => void 0, true);
  let onPlaceholderChange = fallback($$props["onPlaceholderChange"], () => void 0, true);
  let value = fallback($$props["value"], () => void 0, true);
  let onValueChange = fallback($$props["onValueChange"], () => void 0, true);
  let preventDeselect = fallback($$props["preventDeselect"], () => void 0, true);
  let minValue = fallback($$props["minValue"], () => void 0, true);
  let maxValue = fallback($$props["maxValue"], () => void 0, true);
  let pagedNavigation = fallback($$props["pagedNavigation"], () => void 0, true);
  let weekStartsOn = fallback($$props["weekStartsOn"], () => void 0, true);
  let locale = fallback($$props["locale"], () => void 0, true);
  let isDateUnavailable = fallback($$props["isDateUnavailable"], () => void 0, true);
  let isDateDisabled = fallback($$props["isDateDisabled"], () => void 0, true);
  let disabled = fallback($$props["disabled"], () => void 0, true);
  let readonly2 = fallback($$props["readonly"], () => void 0, true);
  let fixedWeeks = fallback($$props["fixedWeeks"], () => void 0, true);
  let calendarLabel = fallback($$props["calendarLabel"], () => void 0, true);
  let asChild = fallback($$props["asChild"], false);
  let id = fallback($$props["id"], () => void 0, true);
  let weekdayFormat = fallback($$props["weekdayFormat"], () => void 0, true);
  let initialFocus = fallback($$props["initialFocus"], false);
  let startValue = fallback($$props["startValue"], () => void 0, true);
  let numberOfMonths = fallback($$props["numberOfMonths"], () => void 0, true);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { calendar },
    states: {
      value: localValue,
      placeholder: localPlaceholder,
      months: localMonths,
      weekdays,
      startValue: localStartValue,
      endValue
    },
    updateOption,
    ids,
    getAttrs
  } = setCtx({
    defaultPlaceholder: placeholder,
    defaultValue: value,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly: readonly2,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    numberOfMonths,
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    },
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  const attrs = getAttrs("root");
  let months = store_get($$store_subs ??= {}, "$localMonths", localMonths);
  if (id) {
    ids.calendar.set(id);
  }
  startValue = store_get($$store_subs ??= {}, "$localStartValue", localStartValue);
  value !== void 0 && localValue.set(value);
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  updateOption("preventDeselect", preventDeselect);
  updateOption("minValue", minValue);
  updateOption("maxValue", maxValue);
  updateOption("pagedNavigation", pagedNavigation);
  updateOption("weekStartsOn", weekStartsOn);
  updateOption("locale", locale);
  updateOption("isDateUnavailable", isDateUnavailable);
  updateOption("isDateDisabled", isDateDisabled);
  updateOption("disabled", disabled);
  updateOption("readonly", readonly2);
  updateOption("fixedWeeks", fixedWeeks);
  updateOption("calendarLabel", calendarLabel);
  updateOption("weekdayFormat", weekdayFormat);
  updateOption("numberOfMonths", numberOfMonths);
  builder = store_get($$store_subs ??= {}, "$calendar", calendar);
  Object.assign(builder, attrs);
  months = store_get($$store_subs ??= {}, "$localMonths", localMonths);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        builder,
        months,
        weekdays: store_get($$store_subs ??= {}, "$weekdays", weekdays),
        startValue: store_get($$store_subs ??= {}, "$localStartValue", localStartValue),
        endValue: store_get($$store_subs ??= {}, "$endValue", endValue)
      },
      null
    );
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        builder,
        months,
        weekdays: store_get($$store_subs ??= {}, "$weekdays", weekdays),
        startValue: store_get($$store_subs ??= {}, "$localStartValue", localStartValue),
        endValue: store_get($$store_subs ??= {}, "$endValue", endValue)
      },
      null
    );
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    placeholder,
    onPlaceholderChange,
    value,
    onValueChange,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly: readonly2,
    fixedWeeks,
    calendarLabel,
    asChild,
    id,
    weekdayFormat,
    initialFocus,
    startValue,
    numberOfMonths,
    el
  });
  pop();
}
function Range_calendar_day$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "asChild", "el"]);
  push();
  var $$store_subs;
  let builder, disabled, unavailable;
  let date = $$props["date"];
  let month = $$props["month"];
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { cell },
    helpers: { isDateDisabled, isDateUnavailable },
    getAttrs
  } = getCtx();
  const attrs = getAttrs("day");
  builder = store_get($$store_subs ??= {}, "$cell", cell)(date, month);
  Object.assign(builder, attrs);
  disabled = store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date);
  unavailable = store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder, disabled, unavailable }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder, disabled, unavailable }, () => {
      $$payload.out += `${escape_html(date.day)}`;
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { date, month, asChild, el });
  pop();
}
function Range_calendar_grid$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { grid }, getAttrs } = getCtx();
  const attrs = getAttrs("grid");
  builder = store_get($$store_subs ??= {}, "$grid", grid);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<table${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></table>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_grid_body$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getAttrs } = getCtx();
  const attrs = getAttrs("grid-body");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "asChild", "el"]);
  push();
  var $$store_subs;
  let attrs;
  let date = $$props["date"];
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    helpers: { isDateDisabled, isDateUnavailable },
    getAttrs
  } = getCtx();
  attrs = {
    ...getAttrs("cell"),
    "aria-disabled": store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date) || store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date),
    role: "gridcell"
  };
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { date, asChild, el });
  pop();
}
function Range_calendar_grid_head$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getAttrs } = getCtx();
  const attrs = {
    ...getAttrs("grid-head"),
    "aria-hidden": true
  };
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<thead${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_head_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getAttrs } = getCtx();
  const attrs = getAttrs("head-cell");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_grid_row$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getAttrs } = getCtx();
  const attrs = getAttrs("grid-row");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></tr>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_header$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getAttrs } = getCtx();
  const attrs = getAttrs("header");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<header${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_heading$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { heading },
    states: { headingValue },
    getAttrs
  } = getCtx();
  const attrs = getAttrs("heading");
  builder = store_get($$store_subs ??= {}, "$heading", heading);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        builder,
        headingValue: store_get($$store_subs ??= {}, "$headingValue", headingValue)
      },
      null
    );
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        builder,
        headingValue: store_get($$store_subs ??= {}, "$headingValue", headingValue)
      },
      () => {
        $$payload.out += `${escape_html(store_get($$store_subs ??= {}, "$headingValue", headingValue))}`;
      }
    );
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_next_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { nextButton }, getAttrs } = getCtx();
  const attrs = getAttrs("next-button");
  builder = store_get($$store_subs ??= {}, "$nextButton", nextButton);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...builder, type: "button", ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar_prev_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { prevButton }, getAttrs } = getCtx();
  const attrs = getAttrs("prev-button");
  builder = store_get($$store_subs ??= {}, "$prevButton", prevButton);
  Object.assign(builder, attrs);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...builder, type: "button", ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder }, null);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Range_calendar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "placeholder",
    "weekdayFormat",
    "startValue",
    "class"
  ]);
  push();
  let value = fallback($$props["value"], void 0);
  let placeholder = fallback($$props["placeholder"], void 0);
  let weekdayFormat = fallback($$props["weekdayFormat"], "short");
  let startValue = fallback($$props["startValue"], void 0);
  let className = fallback($$props["class"], void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Range_calendar$1($$payload2, spread_props([
      {
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        get placeholder() {
          return placeholder;
        },
        set placeholder($$value) {
          placeholder = $$value;
          $$settled = false;
        },
        get startValue() {
          return startValue;
        },
        set startValue($$value) {
          startValue = $$value;
          $$settled = false;
        },
        weekdayFormat,
        class: cn("p-3", className)
      },
      $$restProps,
      {
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, { months, weekdays }) => {
            Range_calendar_header($$payload3, {
              children: ($$payload4) => {
                Range_calendar_prev_button($$payload4, {});
                $$payload4.out += `<!----> `;
                Range_calendar_heading($$payload4, {});
                $$payload4.out += `<!----> `;
                Range_calendar_next_button($$payload4, {});
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Range_calendar_months($$payload3, {
              children: ($$payload4) => {
                const each_array = ensure_array_like(months);
                $$payload4.out += `<!--[-->`;
                for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
                  let month = each_array[$$index_3];
                  Range_calendar_grid($$payload4, {
                    children: ($$payload5) => {
                      Range_calendar_grid_head($$payload5, {
                        children: ($$payload6) => {
                          Range_calendar_grid_row($$payload6, {
                            class: "flex",
                            children: ($$payload7) => {
                              const each_array_1 = ensure_array_like(weekdays);
                              $$payload7.out += `<!--[-->`;
                              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                let weekday = each_array_1[$$index];
                                Range_calendar_head_cell($$payload7, {
                                  children: ($$payload8) => {
                                    $$payload8.out += `<!---->${escape_html(weekday.slice(0, 2))}`;
                                  },
                                  $$slots: { default: true }
                                });
                              }
                              $$payload7.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> `;
                      Range_calendar_grid_body($$payload5, {
                        children: ($$payload6) => {
                          const each_array_2 = ensure_array_like(month.weeks);
                          $$payload6.out += `<!--[-->`;
                          for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                            let weekDates = each_array_2[$$index_2];
                            Range_calendar_grid_row($$payload6, {
                              class: "mt-2 w-full",
                              children: ($$payload7) => {
                                const each_array_3 = ensure_array_like(weekDates);
                                $$payload7.out += `<!--[-->`;
                                for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                                  let date = each_array_3[$$index_1];
                                  Range_calendar_cell($$payload7, {
                                    date,
                                    children: ($$payload8) => {
                                      Range_calendar_day($$payload8, { date, month: month.value });
                                    },
                                    $$slots: { default: true }
                                  });
                                }
                                $$payload7.out += `<!--]-->`;
                              },
                              $$slots: { default: true }
                            });
                          }
                          $$payload6.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    value,
    placeholder,
    weekdayFormat,
    startValue,
    class: className
  });
  pop();
}
function Range_calendar_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "class"]);
  push();
  let date = $$props["date"];
  let className = fallback($$props["class"], void 0);
  Range_calendar_cell$1($$payload, spread_props([
    {
      date,
      class: cn("[&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50 relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { date, class: className });
  pop();
}
function Range_calendar_day($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "class"]);
  push();
  let date = $$props["date"];
  let month = $$props["month"];
  let className = fallback($$props["class"], void 0);
  Range_calendar_day$1($$payload, spread_props([
    {
      date,
      month,
      class: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal data-[selected]:opacity-100",
        "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
        // Selection Start
        "data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground",
        // Selection End
        "data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground",
        // Outside months
        "data-[outside-month]:text-muted-foreground [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30",
        // Disabled
        "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
        // Unavailable
        "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
        className
      )
    },
    $$restProps,
    {
      children: invalid_default_snippet,
      $$slots: {
        default: ($$payload2, { disabled, unavailable, builder }) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { disabled, unavailable, builder }, () => {
            $$payload2.out += `${escape_html(date.day)}`;
          });
          $$payload2.out += `<!---->`;
        }
      }
    }
  ]));
  bind_props($$props, { date, month, class: className });
  pop();
}
function Range_calendar_grid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_grid$1($$payload, spread_props([
    {
      class: cn("w-full border-collapse space-y-1", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_header$1($$payload, spread_props([
    {
      class: cn("relative flex w-full items-center justify-between pt-1", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_months($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes({
    class: cn("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className),
    ...$$restProps
  })}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_grid_row($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_grid_row$1($$payload, spread_props([
    { class: cn("flex", className) },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_heading($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_heading$1($$payload, spread_props([
    {
      class: cn("text-sm font-medium", className)
    },
    $$restProps,
    {
      children: invalid_default_snippet,
      $$slots: {
        default: ($$payload2, { headingValue }) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { headingValue }, () => {
            $$payload2.out += `${escape_html(headingValue)}`;
          });
          $$payload2.out += `<!---->`;
        }
      }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_grid_body($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_grid_body$1($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_grid_head($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_grid_head$1($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_head_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_head_cell$1($$payload, spread_props([
    {
      class: cn("text-muted-foreground w-9 rounded-md text-[0.8rem] font-normal", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_next_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_next_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
    $$restProps,
    {
      children: invalid_default_snippet,
      $$slots: {
        default: ($$payload2, { builder }) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { builder }, () => {
            Chevron_right($$payload2, { class: "h-4 w-4" });
          });
          $$payload2.out += `<!---->`;
        }
      }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Range_calendar_prev_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Range_calendar_prev_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
    $$restProps,
    {
      children: invalid_default_snippet,
      $$slots: {
        default: ($$payload2, { builder }) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { builder }, () => {
            Chevron_left($$payload2, { class: "h-4 w-4" });
          });
          $$payload2.out += `<!---->`;
        }
      }
    }
  ]));
  bind_props($$props, { class: className });
  pop();
}
function Popover_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "transition", "transitionConfig"]);
  push();
  let className = fallback($$props["class"], void 0);
  let transition = fallback($$props["transition"], flyAndScale);
  let transitionConfig = fallback($$props["transitionConfig"], void 0);
  Popover_content$1($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none", className)
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
const Root = Popover;
const Trigger = Popover_trigger;
function _page($$payload, $$props) {
  push();
  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });
  let dateRanges = [];
  let value = { start, end };
  console.log("value", value);
  moment().format("MMMM Do YYYY, h:mm:ss a");
  let localproduct = [];
  products.subscribe((item) => {
    console.log(item);
    localproduct = item;
  });
  const getBadgeType = (type) => {
    switch (type) {
      case "Occasion":
        return "outline";
      case "Regular":
        return "default";
      case "Exclusive":
        return "destructive";
      default:
        return "";
    }
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array_1 = ensure_array_like(dateRanges);
    $$payload2.out += `<div class="m-20"><div>`;
    Label($$payload2, {
      for: "email",
      class: "text-lg font-bold mb-20",
      children: ($$payload3) => {
        $$payload3.out += `<!---->CONFIGURATION`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="mt-20">`;
    Label($$payload2, {
      for: "email",
      children: ($$payload3) => {
        $$payload3.out += `<!---->${escape_html(moment(value.start).to(value.end))}`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div${attr("class", `flex items-center space-x-4 ${localproduct.length != 0 ? "hidden" : ""}`)}>`;
    Skeleton($$payload2, { class: "h-12 w-12 rounded-full" });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Skeleton($$payload2, { class: "h-4 w-[250px]" });
    $$payload2.out += `<!----> `;
    Skeleton($$payload2, { class: "h-4 w-[200px]" });
    $$payload2.out += `<!----></div></div> `;
    Table($$payload2, {
      children: ($$payload3) => {
        Table_caption($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->A list of your recent invoices.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Table_header($$payload3, {
          children: ($$payload4) => {
            Table_row($$payload4, {
              children: ($$payload5) => {
                Table_head($$payload5, {
                  class: "w-[100px]",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Invoice`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Status`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Method`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Table_head($$payload5, {
                  class: "text-right",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Amount`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Table_body($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(localproduct);
            $$payload4.out += `<!--[-->`;
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let product = each_array[i];
              Table_row($$payload4, {
                children: ($$payload5) => {
                  Table_cell($$payload5, {
                    class: "font-light",
                    children: ($$payload6) => {
                      $$payload6.out += `<img alt="xx" class="hover:shadow-lg rounded-md"${attr("src", product.imgUrl)} height="100" width="100">`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    class: "text-xs",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(product.title)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    class: "text-xs",
                    children: ($$payload6) => {
                      Badge($$payload6, {
                        variant: getBadgeType(product.displayType),
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(product.displayType)}`;
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_cell($$payload5, {
                    class: "text-right text-xs",
                    children: ($$payload6) => {
                      $$payload6.out += `<div class="gap-4 col">`;
                      Button($$payload6, {
                        variant: "outline",
                        class: "text-xs",
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Hide`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Root($$payload6, {
                        children: ($$payload7) => {
                          Trigger($$payload7, {
                            children: ($$payload8) => {
                              Button($$payload8, {
                                variant: "destructive",
                                class: "text-xs",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Set Exclusive`;
                                },
                                $$slots: { default: true }
                              });
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Popover_content($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="w-full">`;
                              Range_calendar($$payload8, {
                                get value() {
                                  return value;
                                },
                                set value($$value) {
                                  value = $$value;
                                  $$settled = false;
                                },
                                class: "rounded-md  w-full"
                              });
                              $$payload8.out += `<!----></div> <div>`;
                              Label($$payload8, {
                                for: "email",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Start date: ${escape_html(value.start)}`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----></div> <div>`;
                              Label($$payload8, {
                                for: "email",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->End date: ${escape_html(value.end)}`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----></div> `;
                              Button($$payload8, {
                                variant: "default",
                                class: "text-xs w-full",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Save configuration`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Button($$payload6, {
                        class: "text-xs",
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Reset`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----></div>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="col-end-1"><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let dates = each_array_1[i];
      Label($$payload2, {
        for: "email",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(dates)}`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]--></div></div> `;
    Toaster($$payload2, {});
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
