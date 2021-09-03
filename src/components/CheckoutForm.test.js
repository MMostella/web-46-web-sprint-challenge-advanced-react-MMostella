import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    console.log('Checkout Form Rendering');
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const lastNameInput = screen.getByLabelText(/last name:/i);
    userEvent.type(lastNameInput, 'Mostella');
    const addressInput = screen.getByLabelText(/address:/i);
    userEvent.type(addressInput, '123 address rd');
    const cityInput = screen.getByLabelText(/city:/i);
    userEvent.type(cityInput, 'Boaz');
    const stateInput = screen.getByLabelText(/state:/i);
    userEvent.type(stateInput, 'Alabama');
    const zipInput = screen.getByLabelText(/zip:/i);
    userEvent.type(zipInput, 35951);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const submitWorked = screen.queryByText('You have ordered some plants! Woo-hoo! 🎉 Your new green friends will be shipped to:');
    expect(submitWorked).toBeInTheDocument();
    const nameSubmit = screen.getByText('Mason Mostella');
    expect(nameSubmit).toBeInTheDocument();
    const partOneAddressSubmit = screen.getByText('123 address rd');
    expect(partOneAddressSubmit).toBeInTheDocument();
    const partTwoAddressSubmit = screen.getByText('Boaz, Alabama 35951');
    expect(partTwoAddressSubmit).toBeInTheDocument();
});
