import type { Placement } from '@floating-ui/react-dom';

export type SelectPosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'right top'
  | 'right middle'
  | 'right bottom'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom';

const MAP: Record<SelectPosition, Placement> = {
  'top left': 'top-start',
  'top center': 'top',
  'top right': 'top-end',
  'right top': 'right-start',
  'right middle': 'right',
  'right bottom': 'right-end',
  'bottom left': 'bottom-start',
  'bottom center': 'bottom',
  'bottom right': 'bottom-end',
  'left top': 'left-start',
  'left middle': 'left',
  'left bottom': 'left-end',
};

export function toPlacementList(positions: SelectPosition | SelectPosition[] | undefined): Placement[] {
  const raw = positions == null ? (['bottom left'] as const) : Array.isArray(positions) ? positions : [positions];
  return raw.map((p) => MAP[p]);
}
