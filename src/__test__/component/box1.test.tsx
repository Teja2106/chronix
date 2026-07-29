import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Box1 from '@/app/(protected pages)/playground/components/box1';

describe('Box1', () => {
    test('changes Play state to Pause when clicked', async () => {
        const user = userEvent.setup();

        render(<Box1 />);

        const playButton = screen.getByRole('button', { name: /start session/i });
        
        // Check if the button exists
        expect(playButton).toBeInTheDocument();

        // Click play
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
});