import TooltipViaDataTooltip from '../index.js';
import React, { useState, Fragment } from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import 'mutationobserver-shim';
import 'jest-styled-components';

global.MutationObserver = window.MutationObserver;

function TestComponent() {
  const [singleTarget, setSingleTarget] = useState(true);
  const [multipleTargets, setMultipleTargets] = useState(true);
  const [attributeTarget, setAttributeTarget] = useState(true);
  return (
    <Fragment>
      <div data-tooltip={attributeTarget ? 'attribute-target-tooltip' : undefined}>attribute-target</div>
      {singleTarget ? (
        <div onClick={() => setSingleTarget(false)} data-tooltip="single-target-tooltip">
          single-target
        </div>
      ) : null}
      {multipleTargets ? (
        <div>
          <div data-tooltip="favorite">fav1</div>
          <div data-tooltip="favorite">fav2</div>
          <div data-tooltip="favorite">fav3</div>
          <div data-tooltip="favorite">fav4</div>
          <div data-tooltip="favorite">fav5</div>
        </div>
      ) : null}
      <button
        onClick={() => {
          setAttributeTarget(false);
        }}
      >
        remove-attribute
      </button>
      <button
        onClick={() => {
          setSingleTarget(false);
        }}
      >
        remove-single
      </button>
      <button
        onClick={() => {
          setMultipleTargets(false);
        }}
      >
        remove-multiple
      </button>
      <TooltipViaDataTooltip data-testid="tooltip-manager" />
    </Fragment>
  );
}

describe('TooltipViaDataTooltip', () => {
  afterEach(cleanup);
  describe('when mouse enter unrecognized target with non-empty data-tooltip', () => {
    let renderResult;
    let singleTarget;
    beforeEach(() => {
      renderResult = render(<TestComponent />);
      singleTarget = renderResult.getByText('single-target');
      singleTarget.dispatchEvent(
        new Event('mouseenter', {
          singleTarget
        })
      );
    });

    it('creates a tooltip component', () => {
      const { getByText } = renderResult;
      expect(getByText('single-target-tooltip')).toBeTruthy();
    });

    it('binds the unique ID to the target element as data-tooltip-id', () => {
      expect(singleTarget.dataset.tooltipId).toBeTruthy();
    });

    it('shows the tooltip if data-tooltip is not empty', () => {
      const { getByText } = renderResult;
      expect(getByText('single-target-tooltip')).toHaveStyleRule('visibility', 'visible');
      expect(getByText('single-target-tooltip')).toHaveStyleRule('opacity', '1');
    });

    describe('when mouse leave', () => {
      it('hides the tooltip', () => {
        const { getByText } = renderResult;
        singleTarget.dispatchEvent(
          new Event('mouseleave', {
            singleTarget
          })
        );
        expect(getByText('single-target-tooltip')).toHaveStyleRule('visibility', 'hidden');
        expect(getByText('single-target-tooltip')).toHaveStyleRule('opacity', '0');
      });
    });

    describe('when target is removed from dom', () => {
      it('removes the tooltip', async () => {
        const { queryByText, getByText } = renderResult;
        const removeSingleButton = getByText('remove-single');

        fireEvent.click(removeSingleButton);
        await wait(() => expect(queryByText('single-target-tooltip')).toBeFalsy());
      });
    });

    describe("when target's data-tooltip attribute is deleted", () => {
      test('removes the tooltip', async () => {
        const { getByText, queryByText } = renderResult;
        const attributeTarget = getByText('attribute-target');
        attributeTarget.dispatchEvent(
          new Event('mouseenter', {
            target: attributeTarget
          })
        );
        attributeTarget.dispatchEvent(
          new Event('mouseleave', {
            target: attributeTarget
          })
        );
        const removeAttributeButton = getByText('remove-attribute');

        fireEvent.click(removeAttributeButton);
        await wait(() => expect(queryByText('attribute-target-tooltip')).toBeFalsy());
      });
    });

    describe('when multiple targets are removed from dom at the same time', () => {
      test('removes the tooltip', async () => {
        const { queryByText } = renderResult;
        const hideMultipTargetButton = queryByText('remove-multiple');
        const fav1 = queryByText('fav1');
        const fav2 = queryByText('fav2');
        fav1.dispatchEvent(
          new Event('mouseenter', {
            target: fav1
          })
        );
        fav1.dispatchEvent(
          new Event('mouseleave', {
            target: fav1
          })
        );
        fav2.dispatchEvent(
          new Event('mouseenter', {
            target: fav2
          })
        );
        fav2.dispatchEvent(
          new Event('mouseleave', {
            target: fav2
          })
        );

        fireEvent.click(hideMultipTargetButton);
        await wait(() => expect(queryByText('favorite')).toBeFalsy());
      });
    });
  });
});
