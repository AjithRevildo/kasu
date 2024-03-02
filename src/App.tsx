import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const Calculator: React.FC = () => {
  // State variables to manage input, result, and error messages
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to check if a number is within the specified range
  const isNumberWithinRange = (num: number): boolean => {
    return num >= -9999.99 && num <= 9999.99;
  };

  // Function to truncate extra digits after the second decimal digit
  const truncateDecimals = (num: number, decimals: number): number => {
    const multiplier = Math.pow(10, decimals);
    return Math.trunc(num * multiplier) / multiplier;
  };

  // Function to handle button clicks
  const handleButtonClick = (value: string) => {
    // Point 5: Clear the display
    if (value === 'C') {
      setInput('');
      setResult(null);
      setError(null);
    } else {
      try {
        let evalResult: number = eval(input);

        // Point 3: Throw an error for out-of-range results
        if (evalResult !== undefined && !isNumberWithinRange(evalResult)) {
          throw new Error('Out of range');
        }

        // Point 2: Truncate extra digits after the second decimal digit
        evalResult = truncateDecimals(evalResult, 2);

        // Point 4: Change the sign of the displayed number
        if (value === '+/-') {
          evalResult *= -1;
        }

        // Point 6: Allow consecutive calculations before clearing the display
        const newInput = input + value;

        // Update state
        setInput(newInput);
        setResult(evalResult);
        setError(null);
      } catch (error) {
        // Point 3: Display error for out-of-range or invalid input
        setResult(null);
        setError('Invalid input or out of range');
      }
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {/* Display section */}
      <Grid item>
        <TextField
          type="text"
          value={input}
          variant="outlined"
          InputProps={{ readOnly: true }} // Use InputProps to set readOnly
        />
      </Grid>
      <Grid item>
        <div>{result !== null ? `Result: ${result}` : ''}</div>
        <div>{error !== null ? `Error: ${error}` : ''}</div>
      </Grid>

      {/* Buttons section */}
      <Grid item container spacing={1}>
        {[7, 8, 9, '/'].map((value) => (
          <Grid item key={value}>
            <Button onClick={() => handleButtonClick(value.toString())} variant="outlined">
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item container spacing={1}>
        {[4, 5, 6, '*'].map((value) => (
          <Grid item key={value}>
            <Button onClick={() => handleButtonClick(value.toString())} variant="outlined">
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item container spacing={1}>
        {[1, 2, 3, '-'].map((value) => (
          <Grid item key={value}>
            <Button onClick={() => handleButtonClick(value.toString())} variant="outlined">
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item container spacing={1}>
        {[0, '.', '+/-', '=', '+'].map((value) => (
          <Grid item key={value}>
            <Button onClick={() => handleButtonClick(value.toString())} variant="outlined">
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item>
        <Button onClick={() => handleButtonClick('C')} variant="outlined">
          C
        </Button>
      </Grid>
    </Grid>
  );
};

export default Calculator;
