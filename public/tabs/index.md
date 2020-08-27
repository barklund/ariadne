# A tab widget

The tab widget is a very common pattern.

## Levers

When implementing a tab widget, these are the things you will want to consider whether you need/want or not:

### Focus management inside tab list

Do you want to control focus on the current tab using [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex) or [active descendant](https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant)?

### Focus vs selection

Do you want to [automatically select a tab when it is focused](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus) or do you want users to actively enable the tab?


### Multiple/zero open tabs

Do you want each tab to have its own open state regardless of the other tabs? This means that you can have multiple or even zero open tabs at any time.

### Tab deletion

Do you want users to be able to delete a tab?

### Long tab lists

Do you have so many tabs, that you want users to be able to move quickly to the first or last tab using _Home_ and _End_ keys?

### Tab direction

Do you want your tabs displayed in horizontal or vertical direction?

## Variants
