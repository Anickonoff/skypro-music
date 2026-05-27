import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import { formatTime } from '@/utils/helper';
import { TrackContent } from './TrackContent';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = mockTracks[0];

describe('Track component', () => {
  it('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <TrackContent track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
