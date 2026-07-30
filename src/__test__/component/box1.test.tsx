import { beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Box1 from '@/app/(protected pages)/playground/components/box1';

describe('Box1', () => {
    beforeEach(() => {
        cleanup();
    });

    test('changes Play state to Pause when clicked', async () => {
        const user = userEvent.setup();

        render(<Box1 />);

        const playButton = screen.getByRole('button', { name: /start session/i });

        // Check if the button exists
        expect(playButton).toBeInTheDocument();

        await user.click(playButton);

        // Button should now display Pause
        const pauseButton = screen.getByRole('button', { name: /pause session/i });
        expect(pauseButton).toBeInTheDocument();
    });

    test('changes Play icon to Pause when clicked', async () => {
        const user = userEvent.setup();

        render(<Box1 />);

        const playButton = screen.getByRole('button', { name: /start session/i });
        const playIcon = screen.queryByTestId('start-icon');

        // Check if the button exists along with icon
        expect(playButton).toBeInTheDocument();
        expect(playIcon).toBeInTheDocument();

        // Click play
        await user.click(playButton);

        // Button should now display Pause along with the Pause icon
        const pauseButton = screen.getByRole('button', { name: /pause session/i });
        const pauseIcon = screen.queryByTestId('pause-icon');

        // Check if the button exists along with the icon
        expect(pauseButton).toBeInTheDocument();
        expect(pauseIcon).toBeInTheDocument();
    });

    test('stop button - initally disabled and reset to 00:00:00.00 when clicked', async () => {
        const user = userEvent.setup();

        render(<Box1 />);

        const startButton = screen.getByRole('button', { name: /start session/i });
        const stopButton = screen.getByRole('button', { name: /stop session/i });
        const stopIcon = screen.queryByTestId('stop-icon');
        const sessionTimer = screen.getByTestId('session-timer');

        // Check if button exists along with the icon being disabled initially
        expect(sessionTimer).toHaveTextContent('00:00:00.00');
        expect(stopButton).toBeDisabled();
        expect(stopIcon).toBeInTheDocument();

        await user.click(startButton);

        // Check if the stop button is enabled after clicking start
        expect(stopButton).not.toBeDisabled();

        await user.click(stopButton);

        // Check if the timer is reset to 00:00:00.00 and stop button is disabled
        expect(sessionTimer).toHaveTextContent(/00:00:00.00/);
        expect(stopButton).toBeDisabled();
    });
});