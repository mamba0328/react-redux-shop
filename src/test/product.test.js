import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Product from "../components/Product";

const product = {
    name: 'GIBSON LES PAUL TRIBUTE SATIN',
    price: '44 400',
    img: 'https://muztorg.ua/image/cache/catalog/99992/229497/229497_GIBSON%20LES%20PAUL%20TRIBUTE%20SATIN%20HONEYBURST_1-250x200.jpg',
    code: '228627',
    color: 'honey',
}

describe('Product', () => {
    it('Product matches snapshot', () => {
        render(<Product product={product} />);
        expect(<Product product={product} />).toMatchSnapshot();
    })

    it('Product should be visible', () => {
        render(<Product product={product} />);
        const productContent = screen.getByText('GIBSON LES PAUL TRIBUTE SATIN');
        expect(productContent).toBeInTheDocument();
    })

    it('Modal IN CART button toggles', () => {
        render(<Product product={product} inCart={true} />);
        const inCartButtom = screen.getByText('In cart');
        expect(inCartButtom).toBeInTheDocument();
    })

    it('Button triggers event', async () => {
        const user = userEvent.setup();
        const mockFunction = jest.fn(code => code);
        render(<Product product={product} addToCart={mockFunction} />);

        const addToCart = screen.getByText('Add to cart');
        await user.click(addToCart)
        expect(mockFunction).toHaveBeenCalled();
    })
})


