import Button from '@mui/material/Button';
import React from 'react';
import { isMobile } from '../../Constant/Constant';

export default function ButtonSave({ handleClick }: { handleClick: () => Promise<void> }) {
  const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await handleClick()
      .then(() => {
        console.log('Profile data saved');
        // Simulate a save operation
        setTimeout(() => {
            setLoading(false);
            // Handle success or error here
            // setError('An error occurred'); // Uncomment to simulate an error
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

    
  return (
    <div>
      <Button
        size="small"
        // endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        sx={{
          color: '#59E5A9',
          bgcolor: 'rgba(89, 229, 169, 0.1)',
          fontWeight: 'medium',
          textTransform: 'none',
          fontSize: '15px',
          fontFamily: 'Montserrat',
          borderRadius: '5px',
          '&:hover': {
            bgcolor: 'rgba(89, 229, 169, 0.4)', // survol
          },
          '&.Mui-disabled': {
            color: '#59E5A9',
            bgcolor: 'rgba(89, 229, 169, 0.1)',
            opacity: 1,
          },
        }}
        onClick={handleSave}
        className="sm:w-[180px] "
        disabled={loading}
      >
        Save{!isMobile && ' changes'}
      </Button>
      {/* <Button
        size="small"
        color="secondary"
        onClick={handleSave}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </Button> */}
    </div>
  );
}
