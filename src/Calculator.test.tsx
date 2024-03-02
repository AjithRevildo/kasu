// Calculator.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './App';

describe('Calculator Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Calculator />);
    const calculatorElement = getByText(/calculator/i);
    expect(calculatorElement).toBeInTheDocument();
  });

  it('displays numbers on button click', () => {
    const { getByText, getByDisplayValue } = render(<Calculator />);
    
    // Click on number buttons
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));

    // Check if the displayed value is as expected
    const inputElement = getByDisplayValue('123');
    expect(inputElement).toBeInTheDocument();
  });

  it('handles basic arithmetic operations', () => {
    const { getByText, getByDisplayValue } = render(<Calculator />);
    
    // Perform a basic calculation
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    
    // Check if the result is displayed correctly
    const resultElement = getByDisplayValue('3');
    expect(resultElement).toBeInTheDocument();
  });

  it('truncates extra digits after the second decimal place', () => {
    const { getByText, getByDisplayValue } = render(<Calculator />);
    
    // Perform a calculation with more than two decimal places
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    
    // Check if the result is displayed with only two decimal places
    const resultElement = getByDisplayValue('1.67');
    expect(resultElement).toBeInTheDocument();
  });

  it('throws an error for out-of-range results', () => {
    const { getByText: getByTextError, getByDisplayValue: getByDisplayValueError } = render(<Calculator />);
    
    // Perform a calculation that exceeds the range
    fireEvent.click(getByTextError('99999.99'));
    fireEvent.click(getByTextError('+'));
    fireEvent.click(getByTextError('1'));

    // Check if the error message is displayed
    const errorElement = getByTextError(/out of range/i);
    expect(errorElement).toBeInTheDocument();
    
    // Check if the result is null
    const resultElement = getByDisplayValueError('');
    expect(resultElement).toBeInTheDocument();
  });

  // Add more test cases for other functionalities...
});
