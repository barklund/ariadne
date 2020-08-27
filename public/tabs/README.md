# A tab widget

The tab widget is a very common pattern.

## Optional considerations

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

### Focusable content in panels

Do you have focusable content in your panels?

## Mandatory considerations

### Use correct roles

### Connect tabs and panels

### Keep panels in DOM

### Respect document reading direction

## Variants

The following variants are implemented with optional considerations as per above list:

| Variant | Focus management | Focus vs selection | Multiple tabs | Deletion | Home/End | Direction | Focusable panels |
|-|-|-|-|-|-|-|-|
| ✅ [Minimal](minimal/) | _Roving tabindex_ | _Focus follows selection_ | _No_ | _No_ | _No_ | _Horizontal_ | _Focusable content_ |
| ❌ Active descendant  | _Active descendant_ | _Focus follows selection_ | _No_ | _No_ | _No_ | _Horizontal_ | _Focusable content_ |
| ❌ Focus is separate from selection | _Roving tabindex_ | _Focus is separete from selection_ | _No_ | _No_ | _No_ | _Horizontal_ | _Focusable content_ |
| ❌ Multiple tabs | _Roving tabindex_ | _Focus follows selection_ | _Yes_ | _No_ | _No_ | _Horizontal_ | _Focusable content_ |
| ❌ Deletable tabs | _Roving tabindex_ | _Focus follows selection_ | _No_ | _Yes_ | _No_ | _Horizontal_ | _Focusable content_ |
| ❌ Long tab list | _Roving tabindex_ | _Focus follows selection_ | _No_ | _No_ | _Yes_ | _Horizontal_ | _Focusable content_ |
| ❌ Vertical tab list | _Roving tabindex_ | _Focus follows selection_ | _No_ | _No_ | _No_ | _Vertical_ | _Focusable content_ |
| ❌ No focusable content | _Roving tabindex_ | _Focus follows selection_ | _No_ | _No_ | _No_ | _Horizontal_ | _No focusable content_ |
| ❌ All | _Active descendant_ | _Focus is separete from selection_ | _Yes_ | _Yes_ | _Yes_ | _Vertical_ | _No focusable content_ |

And here's some other relevant variants:

* ❌ Minimal RTL - minimal implementation showing how RTL reading direction is fully supported (e.g. by left-right arrows).

