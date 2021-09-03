import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    console.log('Checkout Form Rendering');
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm/>);
    const firstNameInput = screen.getByLabelText(/first name:/i);
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
    userEvent.type(zipInput, '35951');
    const button = screen.getByRole('button');
    userEvent.click(button);

    const successfulSubmit = screen.getByTestId('successMessage');
    expect(successfulSubmit).toBeInTheDocument();
    const nameSubmit = screen.queryByText('Mason Mostella');
    expect(nameSubmit).toBeInTheDocument();
    const streetSubmit = screen.queryByText('123 address rd');
    expect(streetSubmit).toBeInTheDocument();
    const cityStateSubmit = screen.queryByText('Boaz, Alabama 35951');
    expect(cityStateSubmit).toBeInTheDocument();
});
