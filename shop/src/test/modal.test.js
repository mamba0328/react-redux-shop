import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Modal from "../components/Modal";


describe('Modal', () => {
    it('Modal matches snapshot', () => {
        render(<Modal />);
        expect(<Modal />).toMatchSnapshot();
    })

    it('Modal should be visible', () => {
        render(<Modal />);
        const modalContent = screen.getByText('Modal text');
        expect(modalContent).toBeInTheDocument();
    })

    it('Modal close button works', async () => {
        const user = userEvent.setup();
        const mockCallback = jest.fn();
        render(<Modal onClick={() => mockCallback()} />);
        const closeButton = screen.getByTestId('closeBtn');
        await user.click(closeButton);
        expect(mockCallback).toHaveBeenCalled();
    })

    it('Modal close button is hidden', () => {
        render(<Modal closeButton={false} />);
        expect(screen.queryByTestId('closeBtn')).not.toBeInTheDocument();
    })
})




