import { R as setContext, T as getContext, $ as rest_props, Q as push, Y as fallback, W as store_get, Z as slot, a0 as spread_attributes, X as unsubscribe_stores, _ as bind_props, S as pop, a1 as sanitize_props, V as escape_html, a2 as copy_payload, a3 as assign_payload, a4 as spread_props, a5 as invalid_default_snippet, a6 as ensure_array_like, a7 as attr } from "../../../chunks/index.js";
import { M as createBitAttrs, a5 as createCalendar, N as removeUndefined, O as getOptionUpdater, P as cn, Q as buttonVariants, R as Chevron_right, S as Chevron_left, U as products, W as Skeleton, X as Table, Y as Table_caption, Z as Table_header, _ as Table_row, $ as Table_head, a0 as Table_body, a1 as Table_cell, a2 as Badge, V as Label, a3 as Button, a4 as Toaster, a6 as fetchProducts } from "../../../chunks/Toaster.js";
import { today, getLocalTimeZone } from "@internationalized/date";
import "dequal";
import "clsx";
import moment from "moment";
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function getCalendarData() {
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
  const { NAME, PARTS } = getCalendarData();
  const getCalendarAttrs = createBitAttrs(NAME, PARTS);
  const calendar = { ...createCalendar(removeUndefined(props)), getCalendarAttrs };
  setContext(NAME, calendar);
  return {
    ...calendar,
    updateOption: getOptionUpdater(calendar.options)
  };
}
function getCtx() {
  const { NAME } = getCalendarData();
  const ctx = getContext(NAME);
  return ctx;
}
function Calendar($$payload, $$props) {
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
    "weekdayFormat",
    "multiple",
    "asChild",
    "id",
    "numberOfMonths",
    "initialFocus",
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
  let readonly = fallback($$props["readonly"], () => void 0, true);
  let fixedWeeks = fallback($$props["fixedWeeks"], () => void 0, true);
  let calendarLabel = fallback($$props["calendarLabel"], () => void 0, true);
  let weekdayFormat = fallback($$props["weekdayFormat"], () => void 0, true);
  let multiple = fallback($$props["multiple"], false);
  let asChild = fallback($$props["asChild"], false);
  let id = fallback($$props["id"], () => void 0, true);
  let numberOfMonths = fallback($$props["numberOfMonths"], () => void 0, true);
  let initialFocus = fallback($$props["initialFocus"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { calendar },
    states: {
      value: localValue,
      placeholder: localPlaceholder,
      months: localMonths,
      weekdays
    },
    updateOption,
    ids,
    getCalendarAttrs
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
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    numberOfMonths,
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    },
    onValueChange: ({ next }) => {
      if (Array.isArray(next)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next)) {
          onValueChange?.(next);
          value = next;
          return next;
        }
        return next;
      }
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  const attrs = getCalendarAttrs("root");
  let months = store_get($$store_subs ??= {}, "$localMonths", localMonths);
  if (id) {
    ids.calendar.set(id);
  }
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
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
  updateOption("readonly", readonly);
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
        months,
        weekdays: store_get($$store_subs ??= {}, "$weekdays", weekdays),
        builder
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
        months,
        weekdays: store_get($$store_subs ??= {}, "$weekdays", weekdays),
        builder
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
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    asChild,
    id,
    numberOfMonths,
    initialFocus,
    el
  });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "asChild", "el"]);
  push();
  var $$store_subs;
  let builder, disabled, unavailable, selected;
  let date = $$props["date"];
  let month = $$props["month"];
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const {
    elements: { cell },
    helpers: {
      isDateDisabled,
      isDateUnavailable,
      isDateSelected
    },
    getCalendarAttrs
  } = getCtx();
  const attrs = getCalendarAttrs("day");
  builder = store_get($$store_subs ??= {}, "$cell", cell)(date, month);
  Object.assign(builder, attrs);
  disabled = store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date);
  unavailable = store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date);
  selected = store_get($$store_subs ??= {}, "$isDateSelected", isDateSelected)(date);
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { builder, disabled, unavailable, selected }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!---->`;
    slot($$payload, $$props, "default", { builder, disabled, unavailable, selected }, () => {
      $$payload.out += `${escape_html(date.day)}`;
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { date, month, asChild, el });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { grid }, getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("grid");
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
function Calendar_grid_body$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("grid-body");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
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
    getCalendarAttrs
  } = getCtx();
  attrs = {
    ...getCalendarAttrs("cell"),
    "aria-disabled": store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date) || store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date),
    "data-disabled": store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date) ? "" : void 0,
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
function Calendar_grid_head$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getCalendarAttrs } = getCtx();
  const attrs = {
    ...getCalendarAttrs("grid-head"),
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
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("head-cell");
  if (asChild) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...$$restProps, ...attrs })}><!---->`;
    slot($$payload, $$props, "default", { attrs }, null);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("grid-row");
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
function Calendar_header$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("header");
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
function Calendar_heading$1($$payload, $$props) {
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
    getCalendarAttrs
  } = getCtx();
  const attrs = getCalendarAttrs("heading");
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
function Calendar_next_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { nextButton }, getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("next-button");
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
function Calendar_prev_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = fallback($$props["asChild"], false);
  let el = fallback($$props["el"], () => void 0, true);
  const { elements: { prevButton }, getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("prev-button");
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
function Calendar_1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "placeholder",
    "weekdayFormat",
    "class"
  ]);
  push();
  let value = fallback($$props["value"], void 0);
  let placeholder = fallback($$props["placeholder"], void 0);
  let weekdayFormat = fallback($$props["weekdayFormat"], "short");
  let className = fallback($$props["class"], void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Calendar($$payload2, spread_props([
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
        weekdayFormat,
        class: cn("p-3", className)
      },
      $$restProps,
      {
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, { months, weekdays }) => {
            Calendar_header($$payload3, {
              children: ($$payload4) => {
                Calendar_prev_button($$payload4, {});
                $$payload4.out += `<!----> `;
                Calendar_heading($$payload4, {});
                $$payload4.out += `<!----> `;
                Calendar_next_button($$payload4, {});
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Calendar_months($$payload3, {
              children: ($$payload4) => {
                const each_array = ensure_array_like(months);
                $$payload4.out += `<!--[-->`;
                for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
                  let month = each_array[$$index_3];
                  Calendar_grid($$payload4, {
                    children: ($$payload5) => {
                      Calendar_grid_head($$payload5, {
                        children: ($$payload6) => {
                          Calendar_grid_row($$payload6, {
                            class: "flex",
                            children: ($$payload7) => {
                              const each_array_1 = ensure_array_like(weekdays);
                              $$payload7.out += `<!--[-->`;
                              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                let weekday = each_array_1[$$index];
                                Calendar_head_cell($$payload7, {
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
                      Calendar_grid_body($$payload5, {
                        children: ($$payload6) => {
                          const each_array_2 = ensure_array_like(month.weeks);
                          $$payload6.out += `<!--[-->`;
                          for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                            let weekDates = each_array_2[$$index_2];
                            Calendar_grid_row($$payload6, {
                              class: "mt-2 w-full",
                              children: ($$payload7) => {
                                const each_array_3 = ensure_array_like(weekDates);
                                $$payload7.out += `<!--[-->`;
                                for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                                  let date = each_array_3[$$index_1];
                                  Calendar_cell($$payload7, {
                                    date,
                                    children: ($$payload8) => {
                                      Calendar_day($$payload8, { date, month: month.value });
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
    class: className
  });
  pop();
}
function Calendar_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "class"]);
  push();
  let date = $$props["date"];
  let className = fallback($$props["class"], void 0);
  Calendar_cell$1($$payload, spread_props([
    {
      date,
      class: cn("[&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50 relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md", className)
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
function Calendar_day($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "class"]);
  push();
  let date = $$props["date"];
  let month = $$props["month"];
  let className = fallback($$props["class"], void 0);
  Calendar_day$1($$payload, spread_props([
    {
      date,
      month,
      class: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal ",
        "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
        // Selected
        "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground data-[selected]:opacity-100",
        // Disabled
        "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
        // Unavailable
        "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
        // Outside months
        "data-[outside-month]:text-muted-foreground [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30",
        className
      )
    },
    $$restProps,
    {
      children: invalid_default_snippet,
      $$slots: {
        default: ($$payload2, { selected, disabled, unavailable, builder }) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { selected, disabled, unavailable, builder }, () => {
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
function Calendar_grid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_grid$1($$payload, spread_props([
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
function Calendar_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_header$1($$payload, spread_props([
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
function Calendar_months($$payload, $$props) {
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
function Calendar_grid_row($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_grid_row$1($$payload, spread_props([
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
function Calendar_heading($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_heading$1($$payload, spread_props([
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
function Calendar_grid_body($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_grid_body$1($$payload, spread_props([
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
function Calendar_grid_head($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_grid_head$1($$payload, spread_props([
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
function Calendar_head_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_head_cell$1($$payload, spread_props([
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
function Calendar_next_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_next_button$1($$payload, spread_props([
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
function Calendar_prev_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  Calendar_prev_button$1($$payload, spread_props([
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
function _page($$payload, $$props) {
  push();
  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });
  let dateRanges = [];
  let value = { start, end };
  let selectedDate = "";
  console.log("value", value);
  moment().format("MMMM Do YYYY, h:mm:ss a");
  let localproduct = [];
  products.subscribe((item) => {
    console.log(item);
    localproduct = item;
  });
  const handleDateChange = (dateObject) => {
    console.log("Selected date:", `${dateObject.year}-${dateObject.day}-${dateObject.month}`);
    selectedDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    localproduct = [];
    fetchProducts("Product", selectedDate);
  };
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
    $$payload2.out += `<div class="m-20"><div class="lg:w-1/4 w-72">`;
    Calendar_1($$payload2, {
      get selectedDate() {
        return selectedDate;
      },
      set selectedDate($$value) {
        selectedDate = $$value;
        $$settled = false;
      },
      class: "rounded-md border",
      onValueChange: (e) => handleDateChange(e)
    });
    $$payload2.out += `<!----></div> <div${attr("class", `flex items-center space-x-4 mt-20 ${localproduct.length != 0 ? "hidden" : ""}`)}>`;
    Skeleton($$payload2, { class: "h-12 w-12 rounded-full" });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Skeleton($$payload2, { class: "h-4 w-[250px]" });
    $$payload2.out += `<!----> `;
    Skeleton($$payload2, { class: "h-4 w-[200px]" });
    $$payload2.out += `<!----></div></div> `;
    Table($$payload2, {
      class: " mt-20",
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
                      $$payload6.out += `<!---->${escape_html(product.price)}`;
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
    $$payload2.out += `<!---->c <div class="col-end-1"><!--[-->`;
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
    $$payload2.out += `<!--]--></div> <div class="bottom-16 left-0 fixed w-full justify-center align-middle items-center flex gap-4">`;
    Button($$payload2, {
      class: "text-xs hidden",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Save Configuration`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div> `;
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
