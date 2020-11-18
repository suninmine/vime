import { h, Component, Prop } from '@stencil/core';
import { isNull } from '../../../../utils/unit';
import { withComponentRegistry } from '../../../core/player/withComponentRegistry';

let idCount = 0;

/**
 * @slot - Used to pass in the body of the submenu which is usually a set of choices in the form
 * of a radio group (`vm-menu-radio-group`).
 */
@Component({
  tag: 'vm-submenu',
  shadow: true,
})
export class Submenu {
  private id!: string;

  /**
   * The title of the submenu.
   */
  @Prop() label!: string;

  /**
   * Whether the submenu should be displayed or not.
   */
  @Prop() hidden = false;

  /**
   * This can provide additional context about the current state of the submenu. For example, the
   * hint could be the currently selected option if the submenu contains a radio group.
   */
  @Prop() hint?: string;

  /**
   * Whether the submenu is open/closed.
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  constructor() {
    withComponentRegistry(this);
  }

  connectedCallback() {
    this.genId();
  }

  private invalidEventTarget(event: CustomEvent<void>) {
    return isNull(event.target) || (event.target! as HTMLElement).id !== this.id;
  }

  private onOpen(event: CustomEvent<void>) {
    if (this.invalidEventTarget(event)) return;
    this.active = true;
  }

  private onClose(event: CustomEvent<void>) {
    if (this.invalidEventTarget(event)) return;
    this.active = false;
  }

  private genId() {
    idCount += 1;
    this.id = `vm-submenu-${idCount}`;
  }

  private getControllerId() {
    return `${this.id}-controller`;
  }

  render() {
    return (
      <div>
        <vm-menu-item
          identifier={this.getControllerId()}
          hidden={this.hidden}
          menu={this.id}
          label={this.label}
          hint={this.hint}
          expanded={this.active}
        />
        <vm-menu
          identifier={this.id}
          controller={this.getControllerId()}
          active={this.active}
          onVmOpen={this.onOpen.bind(this)}
          onVmClose={this.onClose.bind(this)}
        >
          <slot />
        </vm-menu>
      </div>
    );
  }
}
