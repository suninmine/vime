import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { buildNoAncestorSelector, isColliding, listen } from './dom';

describe('listen', () => {
  it('should attach event listener', async () => {
    const button = await fixture<HTMLButtonElement>(html`<button>Click</button>`);
    const handler = spy();
    const off = listen(button, 'click', handler);
    button.click();
    expect(handler).to.have.been.called;
    off();
    button.click();
    expect(handler).to.have.been.calledOnce;
  });
});

describe('isColliding', () => {
  function position(el: HTMLElement, x: number, y: number) {
    el.style.position = 'absolute';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  it('should collide', async () => {
    const el = await fixture(html`<div><div id="a"></div><div id="b"></div></div>`);
    const elA = el.querySelector<HTMLDivElement>('#a')!;
    const elB = el.querySelector<HTMLDivElement>('#b')!;
    position(elA, 0, 0);
    position(elB, 0, 0);
    // Same position
    expect(isColliding(elA, elB)).to.be.true;
    // B to right of A
    position(elB, 51, 0);
    expect(isColliding(elA, elB)).to.be.false;
    // B touching A on right
    position(elB, 49, 0);
    expect(isColliding(elA, elB)).to.be.true;
    // B touching A on bottom
    position(elB, 0, 49);
    expect(isColliding(elA, elB)).to.be.true;
    // B below A
    position(elB, 0, 51);
    expect(isColliding(elA, elB)).to.be.false;
    // B above A
    position(elA, 0, -50);
    position(elB, 0, 0);
    expect(isColliding(elA, elB)).to.be.false;
    // B touching A on top
    position(elA, 0, -49);
    position(elB, 0, 0);
    expect(isColliding(elA, elB)).to.be.true;
  });
});

describe('buildNoAncestorSelector', () => {
  it('should build correct selector', () => {
    const selector = buildNoAncestorSelector('a', 'b', 'c', 1);
    expect(selector).to.equal('a > :not(b) > c');
    const selectorTwo = buildNoAncestorSelector('a', 'b', 'c', 2);
    expect(selectorTwo).to.equal('a > :not(b) > c, a > :not(b) > :not(b) > c');
  });
});
