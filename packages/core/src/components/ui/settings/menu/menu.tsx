import {
  h, Component, Prop, Listen, Event, EventEmitter, Element, State, Watch, Method, writeTask,
} from '@stencil/core';
import { buildNoAncestorSelector } from '../../../../utils/dom';
import { isUndefined, isNull } from '../../../../utils/unit';
import { withComponentRegistry } from '../../../core/player/withComponentRegistry';

/**
 * @slot - Used to pass in the body of the menu which usually contains menu items, radio groups
 * and/or submenus.
 */
@Component({
  tag: 'vm-menu',
  styleUrl: 'menu.css',
  shadow: true,
})
export class Menu {
  private shouldFocusOnOpen = false;

  private submenus!: NodeListOf<HTMLVmMenuElement>;

  @Element() el!: HTMLVmMenuElement;

  @State() menuItems!: NodeListOf<HTMLVmMenuItemElement>;

  @Watch('menuItems')
  onMenuItemsChange() {
    this.vmMenuItemsChange.emit(this.menuItems);
  }

  @State() currFocusedMenuItem = 0;

  @Watch('currFocusedMenuItem')
  async onFocusedMenuItemChange() {
    const menuItem = await this.getFocusedMenuItem();
    this.vmFocusMenuItemChange.emit(menuItem);
  }

  /**
   * Whether the menu is open/visible.
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch('active')
  onActiveChange() {
    if (this.active) {
      this.findMenuItems();
      this.findSubmenus();
    }

    this.active ? this.vmOpen.emit() : this.vmClose.emit();
  }

  /**
   * The `id` attribute of the menu.
   */
  @Prop() identifier!: string;

  /**
   * The `id` attribute value of the control responsible for opening/closing this menu.
   */
  @Prop() controller!: string;

  /**
   * Emitted when the menu is open/active.
   */
  @Event() vmOpen!: EventEmitter<void>;

  /**
   * Emitted when the menu has closed/is not active.
   */
  @Event() vmClose!: EventEmitter<void>;

  /**
   * Emitted when the menu items present changes.
   */
  @Event() vmMenuItemsChange!: EventEmitter<NodeListOf<HTMLVmMenuItemElement> | undefined>;

  /**
   * Emitted when the currently focused menu item changes.
   */
  @Event() vmFocusMenuItemChange!: EventEmitter<HTMLVmMenuItemElement | undefined>;

  constructor() {
    withComponentRegistry(this);
  }

  connectedCallback() {
    this.findMenuItems();
  }

  componentDidRender() {
    if (this.active && this.shouldFocusOnOpen) {
      writeTask(() => {
        this.el.focus();
        this.shouldFocusOnOpen = false;
      });
    }
  }

  /**
   * Returns the controller responsible for opening/closing this menu.
   */
  @Method()
  async getController() {
    return document.querySelector(`#${this.controller}`) as HTMLElement;
  }

  /**
   * Returns the currently focused menu item.
   */
  @Method()
  async getFocusedMenuItem() {
    return this.menuItems[this.currFocusedMenuItem];
  }

  /**
   * This should be called directly before opening the menu to set the keyboard focus on it. This
   * is a one-time operation and needs to be called everytime prior to opening the menu.
   */
  @Method()
  async focusOnOpen() {
    this.shouldFocusOnOpen = true;
  }

  private findMenuItems() {
    this.menuItems = document.querySelectorAll(
      buildNoAncestorSelector(`#${this.identifier}`, 'vm-menu', 'vm-menu-item', 5),
    );
  }

  private async focusController() {
    const controller = await this.getController();
    controller?.focus();
  }

  private focusMenuItem(index: number) {
    let boundIndex = (index >= 0) ? index : (this.menuItems.length - 1);
    if (boundIndex >= this.menuItems.length) boundIndex = 0;
    this.currFocusedMenuItem = boundIndex;
    this.menuItems[boundIndex]?.focus();
  }

  private openSubmenu() {
    const menuItem = this.menuItems[this.currFocusedMenuItem];
    if (isUndefined(menuItem)) return;
    menuItem!.click();
    writeTask(() => {
      const submenu = document.querySelector(`#${menuItem!.menu}`) as HTMLVmMenuElement;
      submenu?.focus();
    });
  }

  private onOpen(event: Event) {
    event.stopPropagation();
    this.findMenuItems();
    this.currFocusedMenuItem = 0;
    // Prevents forwarding click event that opened the menu to menu item.
    setTimeout(() => { this.menuItems[this.currFocusedMenuItem]?.focus(); }, 10);
    this.active = true;
  }

  private onClose() {
    this.currFocusedMenuItem = -1;
    this.active = false;
    this.focusController();
  }

  private onClick(event: Event) {
    event.stopPropagation();
  }

  private onKeyDown(event: KeyboardEvent) {
    if (!this.active || this.menuItems.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    switch (event.key) {
      case 'Escape':
        this.onClose();
        break;
      case 'ArrowDown':
      case 'Tab':
        this.focusMenuItem(this.currFocusedMenuItem + 1);
        break;
      case 'ArrowUp':
        this.focusMenuItem(this.currFocusedMenuItem - 1);
        break;
      case 'ArrowLeft':
        this.onClose();
        break;
      case 'ArrowRight':
      case 'Enter':
      case ' ':
        this.openSubmenu();
        break;
      case 'Home':
      case 'PageUp':
        this.focusMenuItem(0);
        break;
      case 'End':
      case 'PageDown':
        this.focusMenuItem(this.menuItems!.length - 1);
        break;
    }
  }

  private findSubmenus() {
    this.submenus = document.querySelectorAll(
      buildNoAncestorSelector(`#${this.identifier}`, 'vm-menu', 'vm-menu', 4),
    );
  }

  private isValidSubmenu(submenu: HTMLElement | null) {
    if (isNull(submenu)) return false;
    return !isUndefined(Array.from(this.submenus).find((menu) => menu.id === submenu!.id));
  }

  private toggleSubmenu(submenu: HTMLVmMenuElement, isActive: boolean) {
    if (!this.isValidSubmenu(submenu)) return;

    Array.from(this.menuItems)
      .filter((menuItem) => menuItem.identifier !== submenu.controller)
      .forEach((menuItem) => { menuItem.hidden = isActive; });

    submenu.active = isActive;
  }

  @Listen('vmOpen')
  onSubmenuOpen(event: CustomEvent<void>) {
    const submenu = event.target as HTMLVmMenuElement;
    this.toggleSubmenu(submenu, true);
  }

  @Listen('vmClose')
  onSubmenuClose(event: CustomEvent<void>) {
    const submenu = event.target as HTMLVmMenuElement;
    this.toggleSubmenu(submenu, false);
  }

  @Listen('click', { target: 'window' })
  onWindowClick() {
    if (this.active) this.active = false;
  }

  @Listen('keydown', { target: 'window' })
  onWindowKeyDown(event: KeyboardEvent) {
    if (this.active && (event.key === 'Escape')) this.onClose();
  }

  render() {
    return (
      <div
        id={this.identifier}
        class="menu"
        role="menu"
        tabindex="-1"
        aria-labelledby={this.controller}
        aria-hidden={!this.active ? 'true' : 'false'}
        onFocus={this.onOpen.bind(this)}
        onClick={this.onClick.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      >
        {/* Seems like without this div unnecessary re-renders keep happening. */}
        <div>
          <slot />
        </div>
      </div>
    );
  }
}
